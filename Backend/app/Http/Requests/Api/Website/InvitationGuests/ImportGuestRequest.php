<?php

namespace App\Http\Requests\Api\Website\InvitationGuests;

use App\Http\Requests\Api\ApiMasterRequest;

class ImportGuestRequest extends ApiMasterRequest
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
            'attachment' => 'required',
        ];
    }

}
