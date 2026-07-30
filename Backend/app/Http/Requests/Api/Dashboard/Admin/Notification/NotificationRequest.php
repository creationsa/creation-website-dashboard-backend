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
        return [
            'type'       => 'required|in:all,all_clients,all_employees,specific_client,specific_employee',
            'user_ids'   => 'nullable|array|required_if:type,specific_client,specific_employee',
            'user_ids.*' => 'nullable|exists:users,id',
            'title'      => 'required|string|between:3,200',
            'body'       => 'required|string|between:3,10000',
        ];
    }
}
