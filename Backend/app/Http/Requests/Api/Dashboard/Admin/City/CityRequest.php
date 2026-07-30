<?php

namespace App\Http\Requests\Api\Dashboard\Admin\City;

use App\Http\Requests\Api\ApiMasterRequest;
use App\Models\City;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CityRequest extends ApiMasterRequest
{
    public function rules()
    {
        $status = isset($this->city) ? City::findOrfail($this->city) : null;
        $rules = [

            'short_name'  => 'nullable|string',
            'country_id'  => 'required|exists:countries,id',
        ];

        foreach(config('translatable.locales') as $locale)
        {
            $rules[$locale.'.slug'] = 'nullable|string|between:2,45';
            $rules[$locale.'.name'] =  [ 
                'required','between:3,100000', 
                  Rule::unique('city_translations', 'name')->where(function ($query) use ($locale) {
                    return $query->where('locale', $locale)->where('city_id', '!=', $this->city);
                  })
                ];
        }

        return $rules;
    }
}
