<?php

namespace App\Http\Requests\Api\Dashboard\Admin\ChooseUs;

use App\Http\Requests\Api\ApiMasterRequest;
use App\Models\ChooseUs;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ChooseUsRequest extends ApiMasterRequest
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
            // 'choose_us' =>  'required|array',
            'media' =>  'nullable|string',
            'icon'  =>  'nullable|string',
        ];

        foreach (config('translatable.locales') as $locale) {
            $rules[$locale . '.title'] =  [
                'required',
                'between:3,180',
            ];
            $rules[$locale . '.desc'] =  [
                'required',
                'between:3,1000',
            ];
        }
        return $rules;
    }
}
