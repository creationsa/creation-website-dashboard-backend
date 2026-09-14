<?php

namespace App\Support;

class PageSectionMedia
{
    public static function resolveUrls($node)
    {
        if (!is_array($node)) {
            return $node;
        }

        $isMediaField = array_key_exists('type', $node) && array_key_exists('file', $node);

        if ($isMediaField) {
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
                $node[$key] = self::resolveUrls($value);
            }
        }

        return $node;
    }

    public static function toStorageUrl($value, $isVideo = false)
    {
        if (!is_string($value) || $value === '' || str_starts_with($value, 'http')) {
            return $value;
        }

        return asset('storage/' . ($isVideo ? 'files/pages/' : 'images/pages/') . $value);
    }
}
