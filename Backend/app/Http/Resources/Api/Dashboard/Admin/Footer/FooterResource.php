<?php

namespace App\Http\Resources\Api\Dashboard\Admin\Footer;

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
        return [
            'statement_image' => $this->media->firstWhere('option', 'statement_image')?->path ?? '',
            'statement_desc_en' => (string) $this->translate('en')?->statement_desc,
            'statement_desc_ar' => (string) $this->translate('ar')?->statement_desc,
            'statement_image_alt_en' => (string) $this->translate('en')?->statement_image_alt,
            'statement_image_alt_ar' => (string) $this->translate('ar')?->statement_image_alt,

            'description_en' => (string) $this->translate('en')?->description,
            'description_ar' => (string) $this->translate('ar')?->description,
            'tagline_en' => (string) $this->translate('en')?->tagline,
            'tagline_ar' => (string) $this->translate('ar')?->tagline,
            'menu_title_en' => (string) $this->translate('en')?->menu_title,
            'menu_title_ar' => (string) $this->translate('ar')?->menu_title,
            'social_title_en' => (string) $this->translate('en')?->social_title,
            'social_title_ar' => (string) $this->translate('ar')?->social_title,
            'copyright_text_en' => (string) $this->translate('en')?->copyright_text,
            'copyright_text_ar' => (string) $this->translate('ar')?->copyright_text,
            // Sourced from the server so the "{{year}}" hint under the
            // copyright text fields always shows the real current year,
            // never one computed in the browser.
            'current_year' => (int) now()->year,

            // `page_title`/`page_slug` are resolved live from the linked
            // builder page (via `page_id`) rather than stored, so a page
            // rename is always reflected here — the same reasoning as
            // per-record SEO lookups elsewhere in this app.
            'menu_items' => $this->menuItems->map(fn ($item) => [
                'type' => $item->type,
                'page_id' => $item->page_id,
                'page_title' => $item->page?->title,
                'page_slug' => $item->page?->slug,
            ]),

            // Same reasoning as `menu_items` above — a separate list shown
            // in the copyright row.
            'copyright_items' => $this->copyrightItems->map(fn ($item) => [
                'type' => $item->type,
                'page_id' => $item->page_id,
                'page_title' => $item->page?->title,
                'page_slug' => $item->page?->slug,
            ]),

            // `title_en`/`title_ar`/`link` are resolved live from the
            // linked Settings entry rather than stored, for the same
            // reason `page_title`/`page_slug` are above.
            'social_items' => $this->socialItems->map(fn ($item) => [
                'setting_social_id' => $item->setting_social_id,
                'title_en' => $item->settingSocial?->title_en,
                'title_ar' => $item->settingSocial?->title_ar,
                'link' => $item->settingSocial?->link,
            ]),

            'badges' => $this->badges->map(fn ($badge) => [
                'label_en' => (string) $badge->translate('en')?->label,
                'label_ar' => (string) $badge->translate('ar')?->label,
                'link' => (string) $badge->link,
                'image' => $badge->media->firstWhere('option', 'badge_image')?->path ?? '',
            ]),
        ];
    }
}
