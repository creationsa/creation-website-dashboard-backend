<?php

namespace App\Http\Requests\Api\Dashboard\Admin\Footer;

use App\Http\Requests\Api\ApiMasterRequest;
use App\Rules\SvgFile;

class FooterRequest extends ApiMasterRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'statement_image.media' => ['nullable', 'string', new SvgFile()],
            'en.statement_desc' => 'required|string',
            'ar.statement_desc' => 'required|string',
            'en.statement_image_alt' => 'required|string|max:255',
            'ar.statement_image_alt' => 'required|string|max:255',

            'en.description' => 'required|string',
            'ar.description' => 'required|string',
            'en.tagline' => 'required|string|max:255',
            'ar.tagline' => 'required|string|max:255',

            'en.menu_title' => 'required|string|max:100',
            'ar.menu_title' => 'required|string|max:100',
            'en.social_title' => 'required|string|max:100',
            'ar.social_title' => 'required|string|max:100',
            'en.copyright_text' => 'required|string|max:500',
            'ar.copyright_text' => 'required|string|max:500',

            'menu_items' => 'nullable|array',
            'menu_items.*.type' => 'required|string|in:page,solutions,projects,blogs',
            'menu_items.*.page_id' => 'required_if:menu_items.*.type,page|nullable|integer|exists:builder_pages,id',

            'copyright_items' => 'nullable|array',
            'copyright_items.*.type' => 'required|string|in:page,solutions,projects,blogs',
            'copyright_items.*.page_id' => 'required_if:copyright_items.*.type,page|nullable|integer|exists:builder_pages,id',

            'social_items' => 'nullable|array',
            'social_items.*.setting_social_id' => 'required|integer|exists:setting_socials,id',

            'badges' => 'required|array|size:2',
            'badges.*.label_en' => 'required|string|max:255',
            'badges.*.label_ar' => 'required|string|max:255',
            'badges.*.link' => 'required|string|max:255',
            'badges.*.image' => 'nullable|string',
        ];
    }
}
