<?php

namespace App\Support;

use App\Models\Project;

class ProjectMediaResolver
{
    /**
     * Any place that lets an admin pick "this project's image" for a card
     * (Featured Works, Display Info, Solutions' "What We Offer", ...) was
     * quietly assuming that field always holds an image — but a project's
     * media slot can just as well be a video (`AppMedia::media_type`), in
     * which case its poster lives in a second row tagged `{field}_poster`
     * (see `ProjectController@update`). Resolving through here instead of
     * a bare `->path` lookup keeps every one of those pickers honest about
     * what it's actually showing.
     *
     * @param  \App\Models\Project  $project
     * @param  string  $field
     * @param  string  $locale
     * @return array{type: string, file: ?string, poster: ?string, alt: ?string}
     */
    public static function resolve(Project $project, string $field, string $locale): array
    {
        $media = $project->media->firstWhere('option', $field);

        if (!$media) {
            return ['type' => 'image', 'file' => null, 'poster' => null, 'alt' => null];
        }

        $isVideo = $media->media_type === 'video';

        return [
            'type' => $isVideo ? 'video' : 'image',
            'file' => $media->path,
            'poster' => $isVideo
                ? $project->media->firstWhere('option', $field . '_poster')?->path
                : null,
            'alt' => $media->translate($locale)?->alt,
        ];
    }
}
