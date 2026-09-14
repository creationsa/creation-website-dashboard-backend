<?php

namespace App\Http\Requests\Api\Dashboard\Admin\Notification;

use App\Http\Requests\Api\ApiMasterRequest;

class NotificationRequest extends ApiMasterRequest
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
            'type'       => 'required|in:all,admins,clients,super_admin,drivers,agents,specific',
            'user_ids'   => 'nullable|array|required_if:type,specific',
            'user_ids.*' => 'nullable|exists:users,id',
        ] + $rules;
    }
}
