<?php

namespace App\Http\Requests\Api\Dashboard\Admin\Asset;

use App\Http\Requests\Api\ApiMasterRequest;

class SecondAssetRequest extends ApiMasterRequest
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
            'model_type'    => 'required|in:sticker,envelope_stamp,backdrop',
            'image'         => 'required|string',
            'thumbnail'     => 'required_if:model_type,backdrop|string',
        ];
    }
}
