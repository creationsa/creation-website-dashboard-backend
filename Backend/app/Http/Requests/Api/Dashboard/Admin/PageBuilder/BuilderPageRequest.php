<?php

namespace App\Http\Requests\Api\Dashboard\Admin\PageBuilder;

use App\Http\Requests\Api\ApiMasterRequest;
use Illuminate\Validation\Rule;

class BuilderPageRequest extends ApiMasterRequest
{
    /**
     * Decode the JSON-encoded sections field sent via multipart/form-data.
     *
     * @return void
     */
    protected function prepareForValidation()
    {
        if ($this->has('sections') && is_string($this->sections)) {
            $this->merge(['sections' => json_decode($this->sections, true) ?? []]);
        }
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        $page = $this->page ?: null;

        $slugRule = Rule::unique('builder_pages', 'slug')->ignore($page);

        // The dashboard always assigns the fixed slug "home" to whichever
        // page is home, and the controller reclaims it from the outgoing
        // home page in the same request — but that reclaim happens after
        // validation, so without this exclusion the incoming page would
        // always fail here first.
        if ($this->boolean('is_home')) {
            $slugRule = $slugRule->where(fn ($query) => $query->where('is_home', false));
        }

        return [
            'en.title' => 'required|string|max:255',
            'ar.title' => 'required|string|max:255',
            'slug' => ['required', 'string', 'max:255', 'alpha_dash', $slugRule],
            'is_home' => 'nullable|boolean',

            'sections' => 'nullable|array',
            'sections.*.type' => 'required_with:sections.*|string',
            // `present` (not `required_with`): Laravel's `required` treats
            // an empty array as absent, which would wrongly reject
            // section types with no fields at all (e.g. a pure position
            // marker like the contact placeholder) — `present` only
            // checks the key exists, empty or not.
            'sections.*.content' => 'present|array',
        ];
    }
}
