<?php

namespace App\Http\Requests\Api\Dashboard\Admin\Page;

use App\Http\Requests\Api\ApiMasterRequest;
use App\Models\Page;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PageRequest extends ApiMasterRequest
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

        $rules=[
            'ordering' => 'nullable|unique:pages,ordering,'.$this->slider,
            'type' => 'required|in:about,privacy-policy,terms-conditions'
        ];
        
        foreach (config('translatable.locales') as $locale) {
            $rules[$locale.'.title'] =  'required';
            $rules[$locale.'.desc'] =  'required';
        }
        return $rules;

    }
}
