<?php

namespace App\Http\Controllers\Api\Dashboard\Admin\Header;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Dashboard\Admin\Header\HeaderRequest;
use App\Http\Resources\Api\Dashboard\Admin\Header\HeaderResource;
use App\Models\Header;

class HeaderController extends Controller
{
    private const RELATIONS = ['menuItems', 'menuItems.page', 'menuItems.page.translations'];

    /**
     * Display the (single) site-wide header, creating a default one on
     * first use since the dashboard always expects a record to exist.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $header = Header::with(self::RELATIONS)->first();

        if (!$header) {
            $header = Header::create([
                'show_language_switch' => true,
                'show_theme_switch' => true,
            ])->fresh(self::RELATIONS);
        }

        return HeaderResource::make($header)->additional(['status' => 'success', 'message' => '']);
    }

    /**
     * Update the (single) site-wide header.
     *
     * @param  \App\Http\Requests\Api\Dashboard\Admin\Header\HeaderRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function update(HeaderRequest $request)
    {
        $data = $request->validated();
        $header = Header::first();

        $payload = [
            'show_language_switch' => $data['show_language_switch'],
            'show_theme_switch' => $data['show_theme_switch'],
        ];

        if (!$header) {
            $header = Header::create($payload);
        } else {
            $header->update($payload);
        }

        $this->syncMenuItems($header, $data['menu_items'] ?? []);

        return HeaderResource::make($header->fresh(self::RELATIONS))
            ->additional(['status' => 'success', 'message' => trans('Updated successfully')]);
    }

    /**
     * The dashboard sends the full menu list on every save without ids,
     * so the simplest correct sync is to replace it wholesale — these are
     * plain references (no files involved).
     */
    private function syncMenuItems(Header $header, array $items): void
    {
        $header->menuItems()->delete();

        foreach ($items as $item) {
            $header->menuItems()->create([
                'type' => $item['type'],
                'page_id' => $item['type'] === 'page' ? ($item['page_id'] ?? null) : null,
            ]);
        }
    }
}
