<?php

namespace App\Support;

use App\Models\Metadata;
use Closure;

/**
 * Shared "own metadata row, falling back to the category's general row"
 * resolution used by Project/Solution/BuilderPage's SEO blocks. Image,
 * image_alt, image_type and keywords always fall back the same way; title
 * and description take their natural/general fallback from the caller,
 * since only the caller knows what "natural" means for its own record —
 * e.g. BuilderPage has no natural description field, so it falls back
 * straight to the general row's description instead.
 */
class SeoResolver
{
    public static function resolve(
        ?Metadata $ownMetadata,
        string $locale,
        string $for,
        ?string $naturalTitle,
        Closure $descriptionFallback,
    ): array {
        $ownT = $ownMetadata?->translate($locale);

        $general = Metadata::where('for', $for)
            ->whereNull('metadataable_type')
            ->whereNull('metadataable_id')
            ->first();
        $generalT = $general?->translate($locale);

        return [
            'title' => $ownT?->title ?: $naturalTitle,
            'description' => $ownT?->description ?: $descriptionFallback($generalT),
            'image' => $ownT?->image ?: $generalT?->image,
            'image_alt' => $ownT?->image_alt ?: $generalT?->image_alt,
            'image_type' => $ownT?->image_type ?: $generalT?->image_type,
            'keywords' => $ownMetadata?->keywords ?: $general?->keywords,
        ];
    }
}
