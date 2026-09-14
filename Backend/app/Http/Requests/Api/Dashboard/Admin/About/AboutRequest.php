<?php

namespace App\Http\Requests\Api\Dashboard\Admin\About;

use App\Http\Requests\Api\ApiMasterRequest;

class AboutRequest extends ApiMasterRequest
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
        $is_required = $this->about ? 'nullable' : 'required';
        $rules = [
            'is_active'        => 'required|in:0,1',

            'main_image'       => $is_required . '|array',
            'main_image.media' => $is_required . '|string',
            'main_image.id'    => 'nullable|exists:app_media,id',

            'images'           => $is_required . '|array',
            'images.*.media'   => $is_required . '|string',
            'images.*.id'      => 'nullable|exists:app_media,id',
        ];

        foreach(config('translatable.locales') as $locale)
        {
            $rules[$locale.'.title']             = 'required|string|between:2,100';
            $rules[$locale.'.desc']              = 'required|string|between:2,1000';
            $rules[$locale.'.slug']              = 'required|string|between:2,100';

            $rules['main_image.'.$locale.'.alt'] = 'nullable|string|between:2,100';

            $rules['images.*.'.$locale.'.alt']   = 'nullable|string|between:2,100';
        }

        return $rules;
    }
}
