<?php

namespace App\Http\Requests\Api\Dashboard\Admin\ProjectsMainData;

use App\Http\Requests\Api\ApiMasterRequest;

class ProjectsMainDataRequest extends ApiMasterRequest
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

            'overview_description_en' => 'required|string',
            'overview_description_ar' => 'required|string',

            'nav_title_en' => 'required|string|max:100',
            'nav_title_ar' => 'required|string|max:100',
            'slug_en' => 'required|string|max:255|alpha_dash',
        ];
    }
}
