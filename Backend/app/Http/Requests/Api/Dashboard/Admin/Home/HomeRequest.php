<?php

namespace App\Http\Requests\Api\Dashboard\Admin\Home;

use App\Http\Requests\Api\ApiMasterRequest;
use Illuminate\Validation\Rule;

class HomeRequest extends ApiMasterRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        foreach (config('translatable.locales') as $locale) {

            $rules['sliders.*.' . $locale . '.title'] =   'nullable|string|between:1,255';
            $rules['sliders.*.' . $locale . '.desc'] =   'nullable|string|between:1,255';
            
            $rules['second_section.*.' . $locale . '.title'] =   'nullable|string|between:1,255';

            $rules['third_section.*.' . $locale . '.title'] =   'nullable|string|between:1,255';
            $rules['third_section.*.' . $locale . '.sub_title'] =    'nullable|string|between:1,255';
            $rules['third_section.*.' . $locale . '.desc'] =    'nullable|string|between:1,100000';

            
        }
        
        return [
            'sliders'         => 'nullable|array',
            // 'sliders.*.is_video'      => 'nullable|boolean',
            'sliders.*.id'         => 'required|exists:sliders,id',
            'sliders.*.is_active'         => 'nullable|boolean',
            'sliders.*.show_desc'         => 'nullable|boolean',
            'sliders.*.type'       => 'required|in:link,category,normal',
            'sliders.*.link'       => 'required_if:sliders.*.type,link|url',
            'sliders.*.category_id'       => 'required_if:sliders.*.type,category|exists:categories,id',
            'sliders.*.image_ar'   => 'nullable|string',
            'sliders.*.image_en'   => 'nullable|string',

            'second_section'         => 'nullable|array',
            'second_section.*.id'      => 'nullable|exists:second_sections,id',
            'second_section.*.is_wide'      => 'nullable|boolean',
            'second_section.*.category_id'      => 'nullable|exists:categories,id',
            'second_section.*.media'   => 'nullable|string',

            'third_section'         => 'nullable|array',
            'third_section.*.id'      => 'nullable|exists:third_sections,id',
            'third_section.*.category_id'      => 'nullable|exists:categories,id',
            'third_section.*.media'   => 'nullable|string',

            'templates'         => 'nullable|array',
            'templates.*'      => 'nullable|exists:templates,id',

        ]+ $rules;
        
    }
}
