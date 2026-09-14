<?php

namespace App\Traits;

trait PaginateCollection
{
    public function paginateCollection($items)
    {
        return [
            'current_page'   => $items->currentPage(),
            'first_page_url' => $items->url(1),
            'from'           => $items->firstItem(),
            'last_page'      => $items->lastPage(),
            'last_page_url'  => $items->url($items->lastPage()),
            'links'          => $items->linkCollection(),
            'next_page_url'  => $items->nextPageUrl(),
            'path'           => $items->path(),
            'per_page'       => $items->perPage(),
            'prev_page_url'  => $items->previousPageUrl(),
            'to'             => $items->lastItem(),
            'total'          => $items->total(),
        ];
    }
}
