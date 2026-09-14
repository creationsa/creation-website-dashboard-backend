<?php

namespace App\Http\Requests\Api\Dashboard\Admin\Solution;

use App\Http\Requests\Api\ApiMasterRequest;
use App\Rules\SvgFile;

class SolutionRequest extends ApiMasterRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        $solution = $this->allSolution ?: null;

        return [
            'title_en' => 'required|string|max:255',
            'title_ar' => 'required|string|max:255',
            'slug_en' => 'required|string|max:255|alpha_dash|unique:solution_translations,slug,' . $solution . ',solution_id',

            'first_title_en' => 'required|string|max:255',
            'first_title_ar' => 'required|string|max:255',
            'second_title_en' => 'required|string|max:255',
            'second_title_ar' => 'required|string|max:255',
            'third_title_en' => 'required|string|max:255',
            'third_title_ar' => 'required|string|max:255',

            'proposition_title_en' => 'required|string|max:255',
            'proposition_title_ar' => 'required|string|max:255',
            'proposition_desc_en' => 'required|string',
            'proposition_desc_ar' => 'required|string',

            'small_description_en' => 'required|string|max:300',
            'small_description_ar' => 'required|string|max:300',

            'execution_title_en' => 'required|string|max:255',
            'execution_title_ar' => 'required|string|max:255',

            'execution_keys' => 'required|array|size:5',
            'execution_keys.*.label_en' => 'required|string|max:255',
            'execution_keys.*.label_ar' => 'required|string|max:255',
            'execution_keys.*.value_en' => 'required|string',
            'execution_keys.*.value_ar' => 'required|string',

            // Shown on this solution's card on the listing page — SVG
            // only, same rule Client logos already use.
            'card_icon.file' => ['nullable', 'string', new SvgFile()],
            'card_icon.alt_en' => 'nullable|string|max:255',
            'card_icon.alt_ar' => 'nullable|string|max:255',

            'items' => 'nullable|array',
            // A custom item carries its own media; a project item is a
            // live reference and needs none — the website resolves it
            // from the project itself at read time.
            'items.*.source' => 'nullable|string|in:custom,project',
            'items.*.project_id' => 'required_if:items.*.source,project|nullable|integer|exists:projects,id',
            'items.*.project_media_field' => 'nullable|string',
            'items.*.feature_media.type' => 'nullable|string|in:image,video',
            'items.*.feature_media.file' => 'nullable|string',
            'items.*.feature_media.alt_en' => 'nullable|string|max:255',
            'items.*.feature_media.alt_ar' => 'nullable|string|max:255',
            'items.*.feature_media.poster' => 'nullable|string',

            'ticker_items' => 'required|array|min:1',
            'ticker_items.*.text_en' => 'required|string',
            'ticker_items.*.text_ar' => 'required|string',
        ];
    }
}
