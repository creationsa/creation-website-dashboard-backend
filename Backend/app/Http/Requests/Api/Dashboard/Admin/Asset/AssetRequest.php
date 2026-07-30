<?php

namespace App\Http\Requests\Api\Dashboard\Admin\Asset;

use App\Http\Requests\Api\ApiMasterRequest;

class AssetRequest extends ApiMasterRequest
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
            'model_type'    => 'required|in:envelope_liner,paper_background,envelope_background',
            'type'          => 'required|in:image,color',
            'image'         => 'required_if:type,image|string',
            'thumbnail'     => 'required_if:type,image|string',
            'color'         => 'required_if:type,color|string',
        ];
    }
}
