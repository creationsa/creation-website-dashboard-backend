<?php

namespace App\Http\Requests\Api\Dashboard\Admin\Project;

use App\Http\Requests\Api\ApiMasterRequest;
use App\Models\Project;

class ProjectRequest extends ApiMasterRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        $project = $this->allProject ?: null;

        $rules = [
            'title_en' => 'required|string|max:255',
            'title_ar' => 'required|string|max:255',
            'slug_en' => 'required|string|max:255|alpha_dash|unique:project_translations,slug,' . $project . ',project_id',

            'first_title_en' => 'required|string|max:255',
            'first_title_ar' => 'required|string|max:255',
            'second_title_en' => 'required|string|max:255',
            'second_title_ar' => 'required|string|max:255',
            'third_title_en' => 'required|string|max:255',
            'third_title_ar' => 'required|string|max:255',

            'overview_description_en' => 'required|string',
            'overview_description_ar' => 'required|string',

            'stats_title_en' => 'required|string|max:255',
            'stats_title_ar' => 'required|string|max:255',
            'stat_one_value' => 'required|string|max:50',
            'stat_one_label_en' => 'required|string|max:255',
            'stat_one_label_ar' => 'required|string|max:255',
            'stat_two_value' => 'required|string|max:50',
            'stat_two_label_en' => 'required|string|max:255',
            'stat_two_label_ar' => 'required|string|max:255',
            'stat_three_value' => 'required|string|max:50',
            'stat_three_label_en' => 'required|string|max:255',
            'stat_three_label_ar' => 'required|string|max:255',

            'ticker_items' => 'required|array|min:1',
            'ticker_items.*.text_en' => 'required|string',
            'ticker_items.*.text_ar' => 'required|string',

            'cover_media_field' => 'required|string|in:' . implode(',', Project::MEDIA_FIELDS),
            'feature_media_field' => 'required|string|in:' . implode(',', Project::MEDIA_FIELDS),
        ];

        foreach (Project::MEDIA_FIELDS as $field) {
            $rules["$field.type"] = 'nullable|string|in:image,video';
            $rules["$field.file"] = 'nullable|string';
            $rules["$field.alt_en"] = 'nullable|string|max:255';
            $rules["$field.alt_ar"] = 'nullable|string|max:255';
            $rules["$field.poster"] = 'nullable|string';
        }

        return $rules;
    }
}
