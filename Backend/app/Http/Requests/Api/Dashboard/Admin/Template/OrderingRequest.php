<?php

namespace App\Http\Requests\Api\Dashboard\Admin\Template;

use App\Http\Requests\Api\ApiMasterRequest;

class OrderingRequest extends ApiMasterRequest
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
     * @return array
     */
    public function rules()
    {
        return [
            'templates.*'           => 'required|array',
            'templates.*.id'        => 'required|integer|exists:templates,id',
            'templates.*.ordering'  => 'required|integer|min:1',
        ];
    }
}
