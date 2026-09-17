<?php

namespace App\Http\Controllers\Api\Dashboard\Admin\Project;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Dashboard\Admin\Project\ProjectRequest;
use App\Http\Resources\Api\Dashboard\Admin\Project\{ProjectPickerResource, ProjectResource, ProjectShowResource};
use App\Models\AppMedia;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    private const RELATIONS = ['media', 'media.translations', 'tickerItems', 'tickerItems.translations', 'metadata'];

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $perPage = min(max((int) $request->input('per_page', 10), 1), 100);
        $sortDirection = $request->input('sort') === 'asc' ? 'asc' : 'desc';

        $projects = Project::with(['media', 'media.translations'])
            ->when($request->keyword, function ($query) use ($request) {
                $query->whereTranslationLike('title', '%' . $request->keyword . '%');
            })
            ->orderBy('created_at', $sortDirection)
            ->paginate($perPage);

        return ProjectResource::collection($projects)->additional(['status' => 'success', 'message' => '']);
    }

    /**
     * Lightweight, unpaginated listing used by other dashboard features
     * (e.g. the Display Info / Featured Works "pick an existing project"
     * fields) to let the admin pick a project and one of its images.
     *
     * @return \Illuminate\Http\Response
     */
    public function picker()
    {
        $projects = Project::with(['media', 'media.translations'])->latest()->get();

        return ProjectPickerResource::collection($projects)->additional(['status' => 'success', 'message' => '']);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\Api\Dashboard\Admin\Project\ProjectRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProjectRequest $request)
    {
        $data = $request->validated();

        $project = Project::create($this->projectData($data));
        $this->syncTickerItems($project, $data['ticker_items']);
        $this->syncAllMedia($project, $data);

        return ProjectShowResource::make($project->fresh(self::RELATIONS))
            ->additional(['status' => 'success', 'message' => trans('Created successfully')]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $project = Project::with(self::RELATIONS)->findOrFail($id);

        return ProjectShowResource::make($project)->additional(['status' => 'success', 'message' => '']);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\Api\Dashboard\Admin\Project\ProjectRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ProjectRequest $request, $id)
    {
        $project = Project::findOrFail($id);
        $data = $request->validated();

        $project->update($this->projectData($data));
        $this->syncTickerItems($project, $data['ticker_items']);
        $this->syncAllMedia($project, $data);

        return ProjectShowResource::make($project->fresh(self::RELATIONS))
            ->additional(['status' => 'success', 'message' => trans('Updated successfully')]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $project = Project::with(['media', 'metadata'])->findOrFail($id);

        foreach ($project->media as $media) {
            $media->delete();
        }
        $project->metadata?->delete();
        $project->delete();

        return $this->successResponse(trans('Deleted successfully'));
    }

    /**
     * Map the flat `_en`/`_ar` request fields into the nested locale arrays
     * the translatable package expects, excluding media/ticker fields which
     * are synced separately.
     */
    private function projectData(array $data): array
    {
        return [
            'stat_one_value' => $data['stat_one_value'],
            'stat_two_value' => $data['stat_two_value'],
            'stat_three_value' => $data['stat_three_value'],
            'cover_media_field' => $data['cover_media_field'] ?? null,
            'feature_media_field' => $data['feature_media_field'] ?? null,
            'en' => [
                'title' => $data['title_en'],
                'slug' => $data['slug_en'],
                'first_title' => $data['first_title_en'],
                'second_title' => $data['second_title_en'],
                'third_title' => $data['third_title_en'],
                'overview_description' => $data['overview_description_en'],
                'stats_title' => $data['stats_title_en'],
                'stat_one_label' => $data['stat_one_label_en'],
                'stat_two_label' => $data['stat_two_label_en'],
                'stat_three_label' => $data['stat_three_label_en'],
            ],
            'ar' => [
                'title' => $data['title_ar'],
                // The dashboard only collects one (English) slug — mirror it
                // to the Arabic translation row like the blogs feature does.
                'slug' => strtolower(str_replace(' ', '-', $data['slug_en'])),
                'first_title' => $data['first_title_ar'],
                'second_title' => $data['second_title_ar'],
                'third_title' => $data['third_title_ar'],
                'overview_description' => $data['overview_description_ar'],
                'stats_title' => $data['stats_title_ar'],
                'stat_one_label' => $data['stat_one_label_ar'],
                'stat_two_label' => $data['stat_two_label_ar'],
                'stat_three_label' => $data['stat_three_label_ar'],
            ],
        ];
    }

    /**
     * The dashboard sends the full ticker items list on every save without
     * ids, so the simplest correct sync is to replace them wholesale.
     */
    private function syncTickerItems(Project $project, array $items): void
    {
        $project->tickerItems()->delete();

        foreach ($items as $item) {
            $project->tickerItems()->create([
                'en' => ['text' => $item['text_en']],
                'ar' => ['text' => $item['text_ar']],
            ]);
        }
    }

    private function syncAllMedia(Project $project, array $data): void
    {
        foreach (Project::MEDIA_FIELDS as $field) {
            $this->syncMediaField($project, $field, $data[$field] ?? null);
        }
    }

    /**
     * `file`/`poster` are only present in the payload when the admin
     * actually picked a new file, so an existing one must not be wiped out
     * when it's absent. The poster (video only) is stored as a second
     * AppMedia row tagged "{field}_poster".
     */
    private function syncMediaField(Project $project, string $field, ?array $data): void
    {
        if (!$data) {
            return;
        }

        $media = $project->media()->where('option', $field)->first();
        if (!$media) {
            $media = new AppMedia();
            $media->app_mediaable_id = $project->id;
            $media->app_mediaable_type = Project::class;
            $media->option = $field;
        }
        $media->media_type = ($data['type'] ?? 'image') === 'video' ? 'video' : 'image';
        if ($this->isNewUpload($data['file'] ?? null)) {
            $media->media = $data['file'];
        }
        $media->save();
        $media->update([
            'en' => ['alt' => $data['alt_en'] ?? ''],
            'ar' => ['alt' => $data['alt_ar'] ?? ''],
        ]);

        if ($this->isNewUpload($data['poster'] ?? null)) {
            $posterOption = $field . '_poster';
            $poster = $project->media()->where('option', $posterOption)->first();
            if (!$poster) {
                $poster = new AppMedia();
                $poster->app_mediaable_id = $project->id;
                $poster->app_mediaable_type = Project::class;
                $poster->option = $posterOption;
                $poster->media_type = 'image';
            }
            $poster->media = $data['poster'];
            $poster->save();
        }
    }

    /**
     * The dashboard always resubmits every media field on save, including
     * untouched ones, whose `file`/`poster` value is the previously
     * resolved full URL (not a bare filename) since that's what the show
     * endpoint returned into the form. Only a genuinely new upload (a bare
     * filename) should overwrite the stored value.
     */
    private function isNewUpload(?string $value): bool
    {
        return !empty($value) && !str_starts_with($value, 'http');
    }
}
