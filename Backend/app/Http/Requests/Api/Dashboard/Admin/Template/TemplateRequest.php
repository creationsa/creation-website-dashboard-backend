<?php

namespace App\Http\Requests\Api\Dashboard\Admin\Template;

use Carbon\Carbon;
use App\Models\Category;
use App\Models\Template;
use App\Http\Requests\Api\ApiMasterRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class TemplateRequest extends ApiMasterRequest
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
        if(isset($this->parent_id) && Template::where('parent_id', '!=', null)->where('id', $this->parent_id)->exists()){
            throw new HttpResponseException(response()->json([
                'status' => 'fail',
                'message' => 'You cannot assign a child template as a parent template.',
                'data' => null,
            ], 422));
        }
        $required = isset($this->template) ? 'required' : 'nullable';

        $category = Category::findOrFail($this->category_id);

        $current_time = Carbon::now()->format('H:i');
        $current_date = Carbon::now()->format('Y-m-d');

        foreach (config('translatable.locales') as $locale) {
            $rules[$locale . '.name'] = [
                'required',
                'between:3,180',
            ];
        }

            

        $rules['ordering']       = $required . '|integer|min:1';
        $rules['category_id']       = $required . '|integer|exists:categories,id';
        $rules['subcategory_id']    = $required . '|integer|exists:subcategories,id';
        $rules['template_type_id']  = $required . '|numeric|exists:template_types,id';
        $rules['parent_id']          = 'nullable|integer|exists:templates,id';
        $rules['price']             = 'required|numeric|min:0';
        $rules['color_type']             = 'required|string|in:hexa,image';
        $rules['color_image']             = 'nullable|string';
        $rules['hexa']             = 'required_if:color_type,hexa|string';
        $rules['image']             = $required . '|string';
        $rules['design']            = $required;
        $rules['template_preview']   = $required . '|string';
        $rules['user_template_data']      = 'nullable';
        $rules['category_type']      = 'nullable';

        if ($category->type == 'private') {
            $rules['user_design']           = 'nullable';
            $rules['locale']                = 'nullable|string|in:en,ar';
            $rules['show_qr']               = 'nullable|boolean';
            $rules['logos']                 = 'nullable|array';
            $rules['logos.*']               = 'nullable|string';
            $rules['name']                  = 'nullable|string|between:2,180';
            $rules['title']                 = 'nullable|string|between:2,180';
            $rules['desc']                  = 'nullable|string|between:2,1000';
            $rules['show_guest_list']       = 'nullable|in:0,1';
            $rules['location_name']         = 'nullable|string';
            $rules['address']               = 'nullable|string|between:2,180';
            $rules['questions']             = 'nullable|array';
            $rules['questions.*.title']     = 'nullable|string';
            $rules['questions.*.type']      = 'nullable|in:short,checkboxes,multiple|string';
            $rules['questions.*.answers']   = 'array|required_if:questions.*.type,checkboxes,multiple';
            $rules['date']                  = 'nullable|date_format:Y-m-d|after_or_equal:today';
            $rules['time']                  = $current_date == request()->date ? 'nullable|date_format:H:i|after_or_equal:' . $current_time : 'nullable|date_format:H:i';
            $rules['added_by']              = 'nullable';
            $rules['user_id']               = 'required|integer|exists:users,id';
        }
        return $rules;
    }

    public function getValidatorInstance()
    {
        $data = $this->all();

        $user_template_data = [
            'locale'    => isset($data['locale']) && $data['locale'] != null ? $data['locale'] : 'en',
            'show_qr'   => $data['show_qr'],
            'logos'     => isset($data['logos']) && $data['logos'] != null ? $data['logos'] : null,
            'name'      => isset($data['name']) && $data['name'] != null ? $data['name'] : null,
            'title'     => isset($data['title']) && $data['title'] != null ? $data['title'] : null,
            'desc'      => isset($data['desc']) && $data['desc'] != null ? $data['desc'] : null,
            'show_guest_list' => isset($data['show_guest_list']) && $data['show_guest_list'] != null ? $data['show_guest_list'] : 0,
            'location_name'  => isset($data['location_name']) && $data['location_name'] != null ? $data['location_name'] : null,
            'address'   => isset($data['address']) && $data['address'] != null ? $data['address'] : null,
            'questions' => isset($data['questions']) && $data['questions'] != null ? $data['questions'] : null,
            'date'      => isset($data['date']) && $data['date'] != null ? $data['date'] : null,
            'time'      => isset($data['time']) && $data['time'] != null ? $data['time'] : null,
            'added_by'  => 'admin',
            'user_design' => isset($data['user_design']) && $data['user_design'] != null ? $data['user_design'] : null,
            'user_id'   => isset($data['user_id']) && $data['user_id'] != null ? $data['user_id'] : null
        ];

        $data['user_template_data'] = $user_template_data;
        $data['category_type'] = $category = Category::findOrFail($this->category_id)->type;

        $this->getInputSource()->replace($data);
        return parent::getValidatorInstance();
    }
}
