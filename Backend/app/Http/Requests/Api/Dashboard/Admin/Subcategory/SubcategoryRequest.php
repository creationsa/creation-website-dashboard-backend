<?php

namespace App\Http\Requests\Api\Dashboard\Admin\Subcategory;

use App\Http\Requests\Api\ApiMasterRequest;
use App\Models\Subcategory;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;


class SubcategoryRequest extends ApiMasterRequest
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
        $status = isset($this->subcategory) ? 'nullable' : 'required';
        $rules = [
            'category_id'  =>  $status . '|exists:categories,id',
            'big_image'=> $status.'|string',
            'small_image'=> $status.'|string',
        ];
        foreach (config('translatable.locales') as $locale) {
            $rules[$locale.'.name'] =  [ 
                'required','between:3,180',
            ];
            $rules[$locale.'.description'] =  [ 
                'required','between:3,100000',
            ];
        }
        return $rules;

    }
}
