<?php

namespace App\Http\Requests\Api\Dashboard\Admin\Country;

use App\Http\Requests\Api\ApiMasterRequest;
use App\Models\Country;
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

        $rules = [
            'phone_code'         => ['required', 'numeric', 'digits_between:1,3', Rule::unique('countries')->ignore($country)->where(function ($query) {
                return $query->whereNull('deleted_at');
            })],
            'phone_number_limit' => 'required|numeric',
            'national_id_limit'  => 'nullable|numeric',
            'flag'               => 'nullable',
            'continent'          => 'nullable|in:africa,europe,asia,south_america,north_america,australia'
        ];

        foreach (config('translatable.locales') as $locale) {
            $rules[$locale . '.slug']        = 'nullable|string|between:3,100000';
            $rules[$locale . '.currency']    = 'nullable|string|between:3,100000';
            $rules[$locale . '.short_name']  = 'nullable|string|between:3,100000';
            $rules[$locale . '.nationality'] = 'nullable|string|between:3,100000';
            $rules[$locale . '.name']        = [
                'required',
                'between:3,100000',
                Rule::unique('country_translations', 'name')->where(function ($query) use ($locale) {
                    return $query->where('locale', $locale)->where('country_id', '!=', $this->country);
                })
            ];
        }
        return $rules;
    }
}
