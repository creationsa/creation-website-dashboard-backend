<?php

namespace App\Http\Requests\Api\Dashboard\Admin\Asset;

use App\Http\Requests\Api\ApiMasterRequest;

class PageStyleRequest extends ApiMasterRequest
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
            'name'                       => 'required|string|unique:page_styles,name',
            'font_name'                  => 'required|string',
            'custom_font'                => 'required|boolean',
            'file'                       => 'required_if:custom_font,true|string',
            'font_url'                   => 'required_if:custom_font,false|string',
            'format'                     => 'required_if:custom_font,true|in:opentype,truetype',
            'size'                       => 'required',
            'styles'                     => 'required_if:custom_font,true|array',
            'styles.*.name'              => 'required_if:custom_font,true|string',
            'styles.*.font_weight_num'   => 'required_if:custom_font,true|numeric',
            'styles.*.font_style'        => 'required_if:custom_font,true|in:normal,italic',
        ];
    }
}
