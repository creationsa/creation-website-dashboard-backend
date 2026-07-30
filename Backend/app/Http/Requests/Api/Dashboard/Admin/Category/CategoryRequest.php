<?php

namespace App\Http\Requests\Api\Dashboard\Admin\Category;

use App\Http\Requests\Api\ApiMasterRequest;
use App\Models\Category;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CategoryRequest extends ApiMasterRequest
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
        $status = isset($this->category) ? 'nullable' : 'required';
        $rules = [
            'type' => $status . '|string|in:general,private',
        ];
        foreach (config('translatable.locales') as $locale) {
            $rules[$locale.'.name'] =  [ 
                'required','between:3,100000',
            ];
        }
        return $rules;

    }
}
