<?php

namespace App\Http\Requests\Api\Website\Contact;

use App\Http\Requests\Api\ApiMasterRequest;
use Illuminate\Validation\Rule;

class ContactRequest extends ApiMasterRequest
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
            'full_name' => ['required', 'string', 'between:2,250'],
            'email' => ['required', 'email', 'max:250'],
            'company_name' => ['required', 'string', 'between:2,250'],
            'phone' => ['required', 'string', 'max:25', 'regex:/^\+?[0-9\s()\-]{7,25}$/'],
            'country_id' => [
                'required',
                Rule::exists('countries', 'id')->whereNull('deleted_at')->where('is_active', true),
            ],
            'content' => ['required', 'string', 'between:2,10000'],
            'user_id' => ['nullable', 'exists:users,id'],
        ];
    }

    public function getValidatorInstance()
    {
        $data = $this->all();
        $user = auth('api')->user();
        if ($user != null) {
            $data['user_id'] = $user->id;
        }
        $this->getInputSource()->replace($data);

        return parent::getValidatorInstance();
    }
}
