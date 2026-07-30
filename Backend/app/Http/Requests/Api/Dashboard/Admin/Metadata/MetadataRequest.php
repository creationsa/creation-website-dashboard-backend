<?php

namespace App\Http\Requests\Api\Dashboard\Admin\Metadata;

use App\Http\Requests\Api\ApiMasterRequest;

class MetadataRequest extends ApiMasterRequest
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
        $rules = [
            'for' => 'required|in:home,blogs,blog,gallery,about,services,service,contact-us',
        ];

        foreach(config('translatable.locales') as $locale)
        {
            $rules[$locale.'.title']          = 'nullable|string';
            $rules[$locale.'.canonical_tags'] = 'nullable|string';
            $rules[$locale.'.image']          = 'nullable|string';
            $rules[$locale.'.type']           = 'nullable|string';
            $rules[$locale.'.description']    = 'nullable|string';
            $rules[$locale.'.keywords']       = 'nullable|string';
        }

        return $rules;
    }
}
