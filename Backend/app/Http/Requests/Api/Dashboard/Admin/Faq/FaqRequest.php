<?php

namespace App\Http\Requests\Api\Dashboard\Admin\Faq;

use App\Http\Requests\Api\ApiMasterRequest;

class FaqRequest extends ApiMasterRequest
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
     * @return array
     */
    public function rules()
    {
        foreach (config('translatable.locales') as $locale) {
            $rules[$locale.'.title'] = 'required|string|between:2,250';/*|regex:/^[^0-9]*$/';*/
            $rules[$locale.'.desc'] = 'required|string|between:3,100000';/*|regex:/^[^0-9]*$/';*/
        }
        return $rules;

    }
}
