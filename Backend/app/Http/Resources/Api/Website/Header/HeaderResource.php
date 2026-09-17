<?php

namespace App\Http\Resources\Api\Website\Header;

use App\Services\Website\MenuItemResolver;
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
            'logo' => $this->logo,
            'logo_alt' => (string) $this->logo_alt,

            'show_language_switch' => (bool) $this->show_language_switch,
            'show_theme_switch' => (bool) $this->show_theme_switch,

            // Fully resolved server-side to {key, href, label} — see
            // MenuItemResolver. The website's only remaining job is
            // prefixing href with the current locale; unresolvable items
            // are dropped here so it never has to guard against them.
            'menu_items' => $this->menuItems
                ->map(fn ($item) => MenuItemResolver::resolve($item))
                ->filter()
                ->values(),

            // Actually the footer's copyright items (see HeaderController)
            // — carried here too so the mobile nav's slide-out menu can
            // show them without also fetching the whole footer.
            'copyright_items' => $this->copyrightItems
                ->map(fn ($item) => MenuItemResolver::resolve($item))
                ->filter()
                ->values(),
        ];
    }
}
