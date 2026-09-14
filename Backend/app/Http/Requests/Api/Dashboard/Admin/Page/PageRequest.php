<?php

namespace App\Http\Requests\Api\Dashboard\Admin\Page;

use App\Http\Requests\Api\ApiMasterRequest;
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
        $is_required = $this->page ? 'nullable' : 'required';

        $rules = [
            'ordering' => [
                'nullable',
                Rule::unique('pages', 'ordering')
                    ->ignore($this->page) // Ignore the current page if updating
                    ->where(function ($query) {
                        return $query->where('type', $this->input('type'));
                    }),
            ],

            'type'        => 'required|in:about,privacy,terms,instructions',
            'image'       => $is_required . '|array',
            'image.media' => $is_required . '|string',
            'image.id'    => 'nullable|exists:app_media,id',
        ];

        foreach (config('translatable.locales') as $locale) {
            $rules[$locale . '.title'] = 'required';
            $rules[$locale . '.desc']  = 'required';
        }

        return $rules;
    }
}
