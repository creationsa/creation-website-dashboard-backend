<?php

namespace App\Http\Resources\Api\Dashboard\Admin\PageBuilder;

use Illuminate\Http\Resources\Json\JsonResource;

class BuilderPageShowResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => (int) $this->id,
            'page_title_en' => (string) $this->translate('en')?->title,
            'page_title_ar' => (string) $this->translate('ar')?->title,
            'page_slug_en' => (string) $this->slug,
            'is_home' => (bool) $this->is_home,
            'metadata_id' => $this->metadata?->id,
            'sections' => self::resolveSections($this->sections ?? []),
        ];
    }

    /**
     * PHP has no way to tell an empty associative array apart from an
     * empty list — `json_decode('{}', true)` and `json_decode('[]', true)`
     * both produce `[]` — so a section like `logos_section`/`contact_section`
     * (whose dashboard schema is `z.object({})`) silently turns into a JSON
     * array on the way back out, which the frontend then rejects as
     * invalid, keeping the whole form stuck (and the Update button
     * permanently disabled) no matter what else gets edited or reordered.
     * Casting an empty `content` back to `stdClass` forces it to encode as
     * `{}` again.
     *
     * @param  array  $sections
     * @return array
     */
    protected static function resolveSections(array $sections): array
    {
        return array_map(function ($section) {
            $content = self::resolveMediaUrls($section['content'] ?? []);

            return [
                'type' => $section['type'] ?? null,
                'content' => (is_array($content) && empty($content)) ? (object) [] : $content,
            ];
        }, $sections);
    }

    /**
     * The upload endpoint only stores bare filenames (e.g. "abc123.png"),
     * matching this app's convention of building the public URL at read
     * time. Sections are an arbitrary, per-block JSON structure, so this
     * walks the tree instead of hardcoding a field path per section type:
     * SmartMediaField values (`{type, file, poster, ...}`) and the plain
     * `logo_image` field are the only shapes that hold an uploaded filename.
     *
     * @param  mixed  $node
     * @return mixed
     */
    protected static function resolveMediaUrls($node)
    {
        if (!is_array($node)) {
            return $node;
        }

        $isMediaField = array_key_exists('type', $node) && array_key_exists('file', $node);

        if ($isMediaField) {
            // The main file lives under files/pages/ when it's a video
            // (matching UploadFileService::uploadFile()) and images/pages/
            // otherwise; the poster is always a still image.
            $isVideo = ($node['type'] ?? null) === 'video';
            $node['file'] = self::toStorageUrl($node['file'] ?? null, $isVideo);
            if (array_key_exists('poster', $node)) {
                $node['poster'] = self::toStorageUrl($node['poster'] ?? null);
            }
        }

        if (array_key_exists('logo_image', $node) && is_string($node['logo_image'])) {
            $node['logo_image'] = self::toStorageUrl($node['logo_image']);
        }

        foreach ($node as $key => $value) {
            if (is_array($value) && !($isMediaField && in_array($key, ['file', 'poster'], true))) {
                $node[$key] = self::resolveMediaUrls($value);
            }
        }

        return $node;
    }

    protected static function toStorageUrl($value, $isVideo = false)
    {
        if (!is_string($value) || $value === '' || str_starts_with($value, 'http')) {
            return $value;
        }

        return asset('storage/' . ($isVideo ? 'files/pages/' : 'images/pages/') . $value);
    }
}
