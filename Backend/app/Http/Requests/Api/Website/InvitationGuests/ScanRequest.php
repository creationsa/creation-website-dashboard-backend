<?php

namespace App\Http\Requests\Api\Website\InvitationGuests;

use App\Rules\ValidEmailDomain;
use Illuminate\Validation\Rule;
use App\Services\PhoneNumberService;
use App\Http\Requests\Api\ApiMasterRequest;

class ScanRequest extends ApiMasterRequest
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
            'checker_token'              => 'required|exists:user_templates,checker_token',
            'guest_token'                => 'required|exists:invitation_guests,code',
        ];
    }

}
