<?php

namespace App\Http\Requests\Api\Website\Profile;

use Illuminate\Validation\Rule;
use App\Services\PhoneNumberService;
use App\Http\Requests\Api\ApiMasterRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class MedicalFileRequest extends ApiMasterRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'gender'                => 'nullable|string|in:male,female',
            'weight'                => 'nullable|numeric|max:300',
            'hight'                 => 'nullable|numeric|max:300',
            'date_of_birth'         => 'nullable|date_format:Y-m-d',
            'diseases'              => 'nullable|array',
            'diseases.*'            => 'numeric|exists:diseases,id',
            'blood_id'              => 'nullable|numeric|exists:bloods,id',
        ];
    }

    
}
