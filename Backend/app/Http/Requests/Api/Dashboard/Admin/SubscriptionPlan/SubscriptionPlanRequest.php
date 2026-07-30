<?php

namespace App\Http\Requests\Api\Dashboard\Admin\SubscriptionPlan;

use App\Http\Requests\Api\ApiMasterRequest;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SubscriptionPlanRequest extends ApiMasterRequest
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
            'price'  => 'required|numeric|min:0',
            'invetation_num'  => 'required|numeric|min:0',
            'features'  => 'required|array',
        ];
        foreach (config('translatable.locales') as $locale) {
            $rules[$locale . '.title'] =  ['required', 'between:3,150'];
            $rules[$locale . '.desc'] =  ['required', 'between:3,1000'];

            $rules['features.*.' . $locale . '.title'] =   'required|string|between:1,255';
        }
        return $rules;
    }
}
