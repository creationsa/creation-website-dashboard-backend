<?php

namespace App\Http\Controllers\Api\Dashboard\Admin\Template;

use Carbon\Carbon;

use Illuminate\Support\Arr;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Jobs\RemindAttendedGuestJob;
use App\Jobs\RemindNotAttendedGuestJob;
use App\Models\{Answer, Question, Template, UserTemplate};
use App\Http\Requests\Api\Dashboard\Admin\Template\OrderingRequest;
use App\Http\Requests\Api\Dashboard\Admin\Template\TemplateRequest;
use App\Http\Resources\Api\Dashboard\Admin\Template\{TemplateResource, SimpleTemplateResource};

class TemplateController extends Controller
{

    public function index(Request $request)
    {

        $templates = Template::with(['category', 'subcategory', 'templateType', 'children', 'parent'])
            ->whereNull('parent_id')
            ->when($request->keyword, function ($q) use ($request) {
                $q->whereTranslationLike('name', '%' . $request->keyword . '%');
            })->when($request->category_id, function ($q) use ($request) {
                $q->where('category_id', $request->category_id);
            })->when($request->subcategory_id, function ($q) use ($request) {
                $q->where('subcategory_id', $request->subcategory_id);
            })->orderBy('ordering', 'asc')->paginate(25);

        return TemplateResource::collection($templates)->additional(['status' => 'success', 'message' => '']);
    }

    public function parentTemplates(Request $request)
    {
        $templates = Template::with(['category', 'subcategory', 'templateType', 'children', 'parent'])
            ->whereNull('parent_id')
            ->when($request->keyword, function ($q) use ($request) {
            $q->whereTranslationLike('name', '%' . $request->keyword . '%');
            })
            ->when($request->category_id, function ($q) use ($request) {
            $q->where('category_id', $request->category_id);
            })
            ->when($request->subcategory_id, function ($q) use ($request) {
            $q->where('subcategory_id', $request->subcategory_id);
            })
            ->select('templates.*')
            ->orderBy('ordering', 'asc')
            ->get();
        return SimpleTemplateResource::collection($templates)->additional(['status' => 'success', 'message' => '']);
    }

    public function store(TemplateRequest $request)
    {
        // dd($request->validated());
        $template = Template::create(array_except($request->validated(), ['user_template_data']));
        if ($request->category_type == 'private') {
            $location = isset($request->address) && $request->address != null ? true : false;
            $user_template = UserTemplate::create(array_except($request->user_template_data, ['user_design']) + [
                'template_id' => $template->id,
                'code' => generate_unique_code(8, '\\App\\Models\\UserTemplate', 'code', 'letters'),
                'checker_token' => generate_unique_code(7, '\\App\\Models\\UserTemplate', 'code', 'letters'),
                'user_design' => $request->user_design,
                'location' => $location,
            ]);
            if ($request->questions) {
                foreach ($request->questions as $q) {
                    $question = Question::create(array_except(
                        [
                            'title' => $q['title'],
                            'type' => $q['type'],
                            'user_template_id' => $user_template->id
                        ],
                        'answers'
                    ));
                    if ($q['type'] != 'short') {
                        foreach ($q['answers'] as $answer) {
                            Answer::create(['title' => $answer, 'question_id' => $question->id]);
                        }
                    }
                }
            }
            if ($request->date) {
                $reminder_attended_duration = isset($request->reminder_attended_duration) ? (int) $request->reminder_attended_duration : 1;
                $reminder_not_attended_duration = isset($request->reminder_not_attended_duration) ? (int) $request->reminder_not_attended_duration : 5;

                $template_setting = $user_template->templateSetting()->create([
                    'reminder_attended_duration' => $reminder_attended_duration,
                    'reminder_not_attended_duration' => $reminder_not_attended_duration,
                ]);

                RemindAttendedGuestJob::dispatch($user_template)
                    ->delay(Carbon::parse($user_template->date)->subDays($reminder_attended_duration))->onQueue('schedule_event');

                // RemindNotAttendedGuestJob::dispatch($user_template)
                //     ->delay(Carbon::parse($user_template->date)->subDays(5))->onQueue('schedule_event');
            }
        }
        return TemplateResource::make($template)->additional(['status' => 'success', 'message' => trans('dashboard/admin.actions.created_successfully')]);
    }

    public function update(TemplateRequest $request, $id)
    {
        $template = Template::findOrFail($id);
        try {
            $template->update(Arr::except($request->validated(), ['user_template_data']));
            if ($request->category_type == 'private') {
                $location = isset($request->address) && $request->address != null ? true : false;
                $user_template_data = array_except($request->user_template_data, ['user_design']) + [
                    'user_design' => $request->user_design,
                    'location' => $location,
                ];
    
                $old_user_template = UserTemplate::where('template_id', $template->id)->first();
    
                if (!$old_user_template) {
                    $user_template_data += [
                        'code' => generate_unique_code(8, '\\App\\Models\\UserTemplate', 'code', 'letters'),
                        'checker_token' => generate_unique_code(7, '\\App\\Models\\UserTemplate', 'code', 'letters'),
                    ];
                }
    
                $user_template = UserTemplate::updateOrCreate(
                    ['template_id' => $template->id],
                    $user_template_data
                );
                if ($request->questions) {
                    Question::where('user_template_id', $user_template->id)->delete();
                    foreach ($request->questions as $q) {
                        $question = Question::create(array_except(
                            [
                                'title' => $q['title'],
                                'type' => $q['type'],
                                'user_template_id' => $user_template->id
                            ],
                            'answers'
                        ));
                        if ($q['type'] != 'short') {
                            foreach ($q['answers'] as $answer) {
                                Answer::create(['title' => $answer, 'question_id' => $question->id]);
                            }
                        }
                    }
                }
            }
            return TemplateResource::make($template)->additional(['status' => 'success', 'message' => trans('dashboard/admin.actions.edited_successfully')]);
        } catch (\Exception $e) {
            Log::error($e);
            return response()->json(['status' => 'fail', 'data' => null, 'message' => 'failed'], 422);
        }
    }

    public function show($id)
    {
        $template = Template::findOrFail($id);
        return TemplateResource::make($template);
    }

    public function destroy($id)
    {
        $template = Template::findOrFail($id);
        if ($template->delete()) {
            return response()->json(['status' => 'success', 'data' => null, 'message' => trans('dashboard/admin.actions.deleted_successfully')]);
        }

        return response()->json(['status' => 'fail', 'data' => null, 'message' => trans('dashboard.api.delete_fail')], 422);
    }

    public function editOrdering(OrderingRequest $request)
    {
        foreach ($request->templates as $template) {
            $templateModel = Template::findOrFail($template['id']);
            $templateModel->update(['ordering' => $template['ordering']]);
        }
        return response()->json(['status' => 'success', 'data' => null, 'message' => trans('dashboard/admin.actions.updated_successfully')]);
    }
}
