<?php

namespace App\Http\Requests\Api\Dashboard\Admin\Header;

use App\Http\Requests\Api\ApiMasterRequest;

class HeaderRequest extends ApiMasterRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'show_language_switch' => 'required|boolean',
            'show_theme_switch' => 'required|boolean',

            'menu_items' => 'nullable|array',
            'menu_items.*.type' => 'required|string|in:page,solutions,projects,blogs',
            'menu_items.*.page_id' => 'required_if:menu_items.*.type,page|nullable|integer|exists:builder_pages,id',
        ];
    }
}
