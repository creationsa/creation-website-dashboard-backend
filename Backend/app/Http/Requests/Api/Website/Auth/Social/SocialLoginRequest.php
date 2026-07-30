<?php

namespace App\Http\Requests\Api\Website\Auth\Social;

use App\Http\Requests\Api\ApiMasterRequest;

class SocialLoginRequest extends ApiMasterRequest
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
            'provider_type' => 'required|in:google,apple',
            'provider_id'   => 'required',

            'full_name'     => 'nullable|string',
            'gender'        => 'nullable',
            'email'         => 'nullable|email',
            'image'         => 'nullable',

            'lat'           => 'nullable|numeric',
            'lng'           => 'nullable|numeric',
            'location'      => 'nullable|string',
        ];
    }

    public function getValidatorInstance()
    {
        $data = $this->all();
        if (isset($data['phone']) && $data['phone']) {
            $data['phone'] = filter_mobile_number($data['phone']);
            $data['phone'] = filter_mobile_number($data['phone']);
        }
        $this->getInputSource()->replace($data);
        return parent::getValidatorInstance();
    }
}
