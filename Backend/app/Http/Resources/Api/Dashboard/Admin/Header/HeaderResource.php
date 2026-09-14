<?php

namespace App\Http\Resources\Api\Dashboard\Admin\Header;

use Illuminate\Http\Resources\Json\JsonResource;

class HeaderResource extends JsonResource
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
            'show_language_switch' => (bool) $this->show_language_switch,
            'show_theme_switch' => (bool) $this->show_theme_switch,

            // `page_title`/`page_slug` are resolved live from the linked
            // builder page rather than stored — same reasoning as the
            // footer's own menu items.
            'menu_items' => $this->menuItems->map(fn ($item) => [
                'type' => $item->type,
                'page_id' => $item->page_id,
                'page_title' => $item->page?->title,
                'page_slug' => $item->page?->slug,
            ]),
        ];
    }
}
