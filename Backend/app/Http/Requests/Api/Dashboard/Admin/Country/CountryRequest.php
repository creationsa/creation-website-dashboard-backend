<?php

namespace App\Http\Requests\Api\Dashboard\Admin\Country;

use App\Http\Requests\Api\ApiMasterRequest;
use App\Models\Country;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CountryRequest extends ApiMasterRequest
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
        $country = isset($this->country) ? Country::findOrFail($this->country) : null;

        $rules=[
            'key' => 'nullable|numeric|digits_between:2,5',
            'flag' => 'nullable',
        ];
        foreach (config('translatable.locales') as $locale) {

            $rules[$locale.'.nationality'] = 'nullable|string|between:3,100000';

            $rules[$locale.'.name'] =  [ 
                'required','between:3,100000', 
                Rule::unique('country_translations', 'name')->where(function ($query) use ($locale) {
                    return $query->where('locale', $locale)->where('country_id', '!=', $this->country);
                })
            ];
        }
        return $rules;

    }
}
