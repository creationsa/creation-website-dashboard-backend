<?php

namespace App\Services\Website;

use App\Models\BlogsMainData;
use App\Models\ProjectsMainData;
use App\Models\SolutionsMainData;

class MenuItemResolver
{
    /**
     * Turns one Header/Footer menu item into a ready-to-render
     * `{key, href, label}`, fully resolved server-side — the website's
     * only remaining job is prefixing `href` with the current locale
     * (e.g. `/${locale}/${href}`), nothing else. `href` is the bare slug
     * with no leading slash, and empty string for the home page. `page`
     * items resolve from the linked builder page; `projects`/`solutions`/
     * `blogs` resolve from that section's own singleton "main data"
     * record (its nav title + slug, dashboard-editable there) — never per
     * individual item. Returns null when the item can't be resolved to a
     * real link yet (missing/deleted page, or the section's nav
     * title/slug hasn't been filled in) — the caller filters these out,
     * so the website never has to guard against incomplete items.
     *
     * @param  \App\Models\HeaderMenuItem|\App\Models\FooterMenuItem  $item
     * @return array{key: string, href: string, label: string}|null
     */
    public static function resolve($item): ?array
    {
        if ($item->type === 'page') {
            if (!$item->page || !$item->page->title) {
                return null;
            }

            return [
                'key' => 'page-'.$item->page->id,
                'href' => $item->page->is_home ? '' : (string) $item->page->slug,
                'label' => (string) $item->page->title,
            ];
        }

        $model = match ($item->type) {
            'projects' => ProjectsMainData::first(),
            'solutions' => SolutionsMainData::first(),
            'blogs' => BlogsMainData::first(),
            default => null,
        };

        if (!$model || !$model->slug || !$model->nav_title) {
            return null;
        }

        return [
            'key' => $item->type,
            'href' => (string) $model->slug,
            'label' => (string) $model->nav_title,
        ];
    }
}
