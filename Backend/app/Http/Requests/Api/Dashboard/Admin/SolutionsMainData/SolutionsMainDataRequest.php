<?php

namespace App\Http\Requests\Api\Dashboard\Admin\SolutionsMainData;

use App\Http\Requests\Api\ApiMasterRequest;

class SolutionsMainDataRequest extends ApiMasterRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'first_title_en' => 'required|string|max:255',
            'first_title_ar' => 'required|string|max:255',
            'second_title_en' => 'required|string|max:255',
            'second_title_ar' => 'required|string|max:255',
            'third_title_en' => 'required|string|max:255',
            'third_title_ar' => 'required|string|max:255',

            'core_desc_en' => 'required|string',
            'core_desc_ar' => 'required|string',

            'core_sub_desc_en' => 'required|string',
            'core_sub_desc_ar' => 'required|string',

            'items_header_first_title_en' => 'required|string|max:255',
            'items_header_first_title_ar' => 'required|string|max:255',
            'items_header_second_title_en' => 'required|string|max:255',
            'items_header_second_title_ar' => 'required|string|max:255',
            'items_header_third_title_en' => 'required|string|max:255',
            'items_header_third_title_ar' => 'required|string|max:255',

            'items' => 'nullable|array',
            // A custom item carries its own media/title/slug; a project
            // item is a live reference and needs none of that — the
            // website resolves it from the project itself at read time.
            'items.*.source' => 'nullable|string|in:custom,project',
            'items.*.project_id' => 'required_if:items.*.source,project|nullable|integer|exists:projects,id',
            'items.*.project_media_field' => 'nullable|string',
            'items.*.feature_media.type' => 'nullable|string|in:image,video',
            'items.*.feature_media.file' => 'nullable|string',
            'items.*.feature_media.alt_en' => 'nullable|string|max:255',
            'items.*.feature_media.alt_ar' => 'nullable|string|max:255',
            'items.*.feature_media.poster' => 'nullable|string',
            'items.*.item_title_en' => 'nullable|string|max:255',
            'items.*.item_title_ar' => 'nullable|string|max:255',
            'items.*.item_slug_en' => 'nullable|string|max:255',

            'ticker_items' => 'required|array|min:1',
            'ticker_items.*.text_en' => 'required|string',
            'ticker_items.*.text_ar' => 'required|string',

            'accordion_items' => 'nullable|array',
            'accordion_items.*.title_en' => 'required|string|max:255',
            'accordion_items.*.title_ar' => 'required|string|max:255',
            'accordion_items.*.content_blocks' => 'required|array|min:1',
            'accordion_items.*.content_blocks.*.subtitle_en' => 'nullable|string|max:255',
            'accordion_items.*.content_blocks.*.subtitle_ar' => 'nullable|string|max:255',
            'accordion_items.*.content_blocks.*.description_en' => 'required|string',
            'accordion_items.*.content_blocks.*.description_ar' => 'required|string',

            'accordion_media.type' => 'nullable|string|in:image,video',
            'accordion_media.file' => 'nullable|string',
            'accordion_media.alt_en' => 'nullable|string|max:255',
            'accordion_media.alt_ar' => 'nullable|string|max:255',
            'accordion_media.poster' => 'nullable|string',

            'accordion_items_header_first_title_en' => 'required|string|max:255',
            'accordion_items_header_first_title_ar' => 'required|string|max:255',
            'accordion_items_header_second_title_en' => 'required|string|max:255',
            'accordion_items_header_second_title_ar' => 'required|string|max:255',
            'accordion_items_header_third_title_en' => 'required|string|max:255',
            'accordion_items_header_third_title_ar' => 'required|string|max:255',

            'nav_title_en' => 'required|string|max:100',
            'nav_title_ar' => 'required|string|max:100',
            'slug_en' => 'required|string|max:255|alpha_dash',
        ];
    }
}
