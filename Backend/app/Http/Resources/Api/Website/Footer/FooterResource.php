<?php

namespace App\Http\Resources\Api\Website\Footer;

use App\Services\Website\AssetProxy;
use App\Services\Website\MenuItemResolver;
use Illuminate\Http\Resources\Json\JsonResource;

class FooterResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $isAr = app()->getLocale() === 'ar';

        return [
            'logo' => $this->logo,
            'logo_alt' => (string) $this->logo_alt,

            'statement_image' => AssetProxy::url($this->media->firstWhere('option', 'statement_image')?->path) ?? '',
            'statement_desc' => (string) $this->statement_desc,
            'statement_image_alt' => (string) $this->statement_image_alt,

            'description' => (string) $this->description,
            'tagline' => (string) $this->tagline,
            'menu_title' => (string) $this->menu_title,
            'social_title' => (string) $this->social_title,
            // Raw, with the literal "{{year}}" token left in place — the
            // website replaces it with the current year at render time,
            // so the year is always correct regardless of when this text
            // was last saved.
            'copyright_text' => (string) $this->copyright_text,

            // Fully resolved server-side — see MenuItemResolver, same as
            // the website Header resource.
            'menu_items' => $this->menuItems
                ->map(fn ($item) => MenuItemResolver::resolve($item))
                ->filter()
                ->values(),

            // Same reasoning as `menu_items` above — shown in the
            // copyright row instead of the main footer menu.
            'copyright_items' => $this->copyrightItems
                ->map(fn ($item) => MenuItemResolver::resolve($item))
                ->filter()
                ->values(),

            // `SettingSocial` isn't a translatable model (plain
            // `title_en`/`title_ar` columns), so the locale pick happens
            // here rather than via a magic accessor.
            'social_items' => $this->socialItems->map(fn ($item) => [
                'title' => $isAr
                    ? (string) $item->settingSocial?->title_ar
                    : (string) $item->settingSocial?->title_en,
                'link' => (string) $item->settingSocial?->link,
            ]),

            'badges' => $this->badges->map(fn ($badge) => [
                'label' => (string) $badge->label,
                'link' => (string) $badge->link,
                'image' => $badge->media->firstWhere('option', 'badge_image')?->path ?? '',
            ]),
        ];
    }
}
