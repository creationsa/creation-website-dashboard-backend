<?php
namespace App\Http\Controllers\Api\Website\Templates;

use App\Models\Template;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Website\Template\TemplateRequest;
use App\Http\Resources\Api\Dashboard\Admin\Template\TemplateResource;

class TemplateController extends Controller
{

    public function index(Request $request)
    {

        $templates = Template::with(['category', 'subcategory', 'templateType'])
            ->whereHas('category', function ($q) use ($request) {
                $q->where('type', '!=', 'private');
            })
            ->whereNull('parent_id')
            ->when($request->query('keyword'), function ($q) use ($request) {
                $q->whereTranslationLike('name', '%' . $request->query('keyword') . '%');
            })
            ->when($request->query('category_id') && $request->query('template_type_id') && !$request->query('subcategory_id'), function ($q) use ($request) {
                $q->where('category_id', $request->query('category_id'))
                    ->where('template_type_id', $request->query('template_type_id'));
            })
            ->when($request->query('category_id') && $request->query('subcategory_id') && $request->query('template_type_id'), function ($q) use ($request) {
                $q->where('category_id', $request->query('category_id'))
                    ->where('subcategory_id', $request->query('subcategory_id'))
                    ->where('template_type_id', $request->query('template_type_id'));
            })
            ->orderBy('ordering','asc')->paginate(25);

        return TemplateResource::collection($templates)->additional(['status' => 'success', 'message' => '']);
    }

    public function indexWithoutPagination(Request $request)
    {
        $templates = Template::with(['category', 'subcategory', 'templateType'])
            ->whereHas('category', function ($q) use ($request) {
                $q->where('type', '!=', 'private');
            })
        ->when($request->query('keyword'), function ($q) use ($request) {
            $q->whereTranslationLike('name', '%' . $request->query('keyword') . '%');
        })
        ->when($request->query('category_id') && $request->query('template_type_id') && !$request->query('subcategory_id'), function ($q) use ($request) {
            $q->where('category_id', $request->query('category_id'))
                ->where('template_type_id', $request->query('template_type_id'));
        })
        ->when($request->query('category_id') && $request->query('subcategory_id') && $request->query('template_type_id'), function ($q) use ($request) {
            $q->where('category_id', $request->query('category_id'))
                ->where('subcategory_id', $request->query('subcategory_id'))
                ->where('template_type_id', $request->query('template_type_id'));
        })
        ->orderBy('ordering','asc')->get();
        return TemplateResource::collection($templates);
    }

    public function show($id)
    {
        $template = Template::whereHas('category', function ($q) {
            $q->where('type', '!=', 'private');
        })->findOrFail($id);
        return TemplateResource::make($template);
    }

    public function store(TemplateRequest $request)
    {
        $template = Template::findOrFail($request->template_id);
        return TemplateResource::make($template);
    }

    public function toggleFavorite($template_id)
    {
        $template = Template::findOrFail($template_id);
        $user    = auth('api')->user();

        if ($template->is_favorite) {
            $user->favoritesModel()->where(['template_id' => $template->id])->delete();
        } else {
            $user->favoritesModel()->create(['template_id' => $template->id]);
        }

        return response()->json(['status' => 'success', 'data' => null, 'message' => trans('app/client.messages.success_update')]);
    }

    public function getFavorite()
    {
        $templates = Template::whereHas('favorites', function ($query) {
            $query->where('user_id', auth('api')->id());
        })->latest()->paginate(10);

        return TemplateResource::collection($templates)->additional(['status' => 'success', 'message' => '']);
    }

}
