<?php

namespace App\Http\Requests\Api\Dashboard\Admin\BlogsMainData;

use App\Http\Requests\Api\ApiMasterRequest;

class BlogsMainDataRequest extends ApiMasterRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'nav_title_en' => 'required|string|max:100',
            'nav_title_ar' => 'required|string|max:100',
            'slug_en' => 'required|string|max:255|alpha_dash',
        ];
    }
}
