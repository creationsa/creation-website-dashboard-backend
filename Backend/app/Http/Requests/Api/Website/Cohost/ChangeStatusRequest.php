<?php

namespace App\Http\Requests\Api\Website\Cohost;

use Illuminate\Validation\Rule;
use App\Http\Requests\Api\ApiMasterRequest;

class ChangeStatusRequest extends ApiMasterRequest
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
            'status'                     => 'required|string|in:accepted,rejected',
        ];
    }
}
