<?php

namespace App\Http\Requests\Api\Dashboard\Admin\Privacy;

use App\Http\Requests\Api\ApiMasterRequest;
use Illuminate\Validation\Rule;

class PrivacyRequest extends ApiMasterRequest
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
            $rules[$locale . '.title'] = [
                'required', 'between:3,180',
            ];
            $rules[$locale . '.desc'] = [
                'required', 'between:3,100000',
            ];
        }
        return $rules;

    }
}
