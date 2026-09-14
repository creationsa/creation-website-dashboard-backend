<?php

namespace App\Http\Requests\Api\Dashboard\Admin\Notification;

use App\Http\Requests\Api\ApiMasterRequest;

class PrivateNotificationRequest extends ApiMasterRequest
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
        $rules = [];

        foreach (config('translatable.locales') as $locale) {
            $rules[$locale. '.title'] = 'required|string|between:3,200';
            $rules[$locale. '.body']  = 'required|string|between:3,10000';
        }

        return [
            'category_ids'   => 'required|array',
            'category_ids.*' => 'required|exists:categories,id,level,1',
        ] + $rules;
    }
}
