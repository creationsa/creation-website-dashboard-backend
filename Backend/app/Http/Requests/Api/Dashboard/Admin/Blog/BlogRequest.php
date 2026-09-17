<?php

namespace App\Http\Requests\Api\Dashboard\Admin\Blog;

use App\Http\Requests\Api\ApiMasterRequest;

class BlogRequest extends ApiMasterRequest
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
        $rules = [];
        $blog = $this->blog ? $this->blog : null;
        $required = isset($this->blog) ? 'nullable' : 'required';
        $baseImageMediaRule = is_array($this->input('base_image')) && !isset($this->blog) ? 'required|string' : 'nullable|string';
        $coverImageMediaRule = is_array($this->input('cover_image')) && !isset($this->blog) ? 'required|string' : 'nullable|string';

        foreach (config('translatable.locales') as $locale) {
            
            $rules[$locale . '.title']        = $required.'|string|between:3,250';
            $slugRequired = $locale === 'ar' ? 'nullable' : $required . '|string|between:2,600|unique:blog_translations,slug,' . $blog . ',blog_id';
            $rules[$locale . '.slug']         = $slugRequired;
            $rules[$locale . '.seo_desc']         = $required.'|string';
            $rules[$locale . '.first_sub_title']         = $required.'|string';
            $rules[$locale . '.first_desc']         = $required.'|string';
            $rules[$locale . '.second_desc']         = $required.'|string';
            $rules[$locale . '.second_sub_title']         = $required.'|string';


            $rules['base_image.' . $locale . '.alt']      = 'nullable|string|between:2,100';
            $rules['base_image_alt.' . $locale]           = 'nullable|string|between:2,100';
            $rules['cover_image.' . $locale . '.alt']     = 'nullable|string|between:2,100';
            $rules['cover_image_alt.' . $locale]          = 'nullable|string|between:2,100';

            $rules['items.' . $locale . '.*.desc']         = $required.'|string';
        }

        return [
            'base_image'            => $required,
            'base_image.media'      => $baseImageMediaRule,
            'base_image_alt'        => 'nullable|array',
            'cover_image'           => $required,
            'cover_image.media'     => $coverImageMediaRule,
            'cover_image_alt'       => 'nullable|array',
            'items'                 => 'required|array',
        ] + $rules;
    }
}
