<?php

namespace App\Http\Controllers\Api\Dashboard\Admin\Metadata;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Dashboard\Admin\Metadata\MetadataRequest;
use App\Http\Resources\Api\Dashboard\Admin\Metadata\{MetadataResource, MetadataShowResource};
use App\Models\BuilderPage;
use App\Models\Metadata;
use App\Models\Project;
use App\Models\Solution;
use Illuminate\Http\Request;

class MetadataController extends Controller
{
    /**
     * Short, client-facing keys mapped to the model each is allowed to link
     * metadata to via `metadataable_id` — keeps raw class strings out of
     * the request payload.
     */
    private const METADATAABLE_TYPES = [
        'page' => BuilderPage::class,
        'project' => Project::class,
        'solution' => Solution::class,
    ];

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $metadata = Metadata::when(request()->keyword, function ($query) {
            $query->where(function ($query) {
                $query->whereTranslationLike('title', '%' . request()->keyword . '%')
                ->orWhereTranslationLike('canonical_tags', '%' . request()->keyword . '%')
                ->orWhereTranslationLike('type', '%' . request()->keyword . '%')
                ->orWhereTranslationLike('description', '%' . request()->keyword . '%')
                ->orWhere('keywords', 'like', '%' . request()->keyword . '%');
            });
        })
        ->when(request()->for, function ($query) {
            $query->where('for', request()->for);
        })->latest()->paginate(20);

        return MetadataShowResource::collection($metadata)->additional(['status' => 'success', 'message' => '']);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(MetadataRequest $request)
    {
        $data = $request->validated();

        if (!empty($data['metadataable_id'])) {
            $data['metadataable_type'] = self::METADATAABLE_TYPES[$data['metadataable_type'] ?? ''] ?? null;
        }

        $metadata = Metadata::create($data);
        return MetadataShowResource::make($metadata)->additional(['status' => 'success', 'message' => trans('Created successfully')]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $metadata = Metadata::findOrFail($id);
        return MetadataShowResource::make($metadata)->additional(['status' => 'success', 'message' => '']);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(MetadataRequest $request, $id)
    {
        $metadata = Metadata::findOrFail($id);
        $data = $request->validated();

        if (!empty($data['metadataable_id'])) {
            $data['metadataable_type'] = self::METADATAABLE_TYPES[$data['metadataable_type'] ?? ''] ?? null;
        }

        $metadata->update($data);
        return MetadataShowResource::make($metadata)->additional(['status' => 'success', 'message' => trans('Updated successfully')]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $metadata = Metadata::findOrFail($id);
        $metadata->delete();
        return response()->json(['status' => 'success', 'data' => null, 'message' => trans('Deleted successfully')]);
    }
}
