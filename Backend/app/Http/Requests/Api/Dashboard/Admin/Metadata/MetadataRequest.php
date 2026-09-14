<?php

namespace App\Http\Requests\Api\Dashboard\Admin\Metadata;

use App\Http\Requests\Api\ApiMasterRequest;

class MetadataRequest extends ApiMasterRequest
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
        $required = isset($this->metadata) ? 'nullable' : 'required';

        // Records linked to a specific model (e.g. a single builder page,
        // via metadataable_id) are looked up by that id, not by `for` — so
        // `for` is meaningless there and shouldn't be forced on the client.
        $isLinkedRecord = $this->filled('metadataable_id');
        $forRequired = $isLinkedRecord ? 'nullable' : 'required';

        // A per-record SEO row (a single project/solution/blog) may skip
        // its own image entirely — the website falls back to the general
        // category's image/keywords for whatever's left blank here (see
        // ProjectController::resolveSeo() on the website side). The
        // general category row itself (for=projects/solutions/blogs) has
        // nothing to fall back to, so its image stays required.
        $imageRequired = $isLinkedRecord ? 'nullable' : $required;

        $rules = [
            'for' => $forRequired.'|in:home,blogs,blog,projects,solutions',
            'keywords' => 'nullable',
            // Links this metadata row to a specific record (e.g. a single
            // builder page, project, or solution) instead of sharing one
            // row per `for` category.
            'metadataable_id' => 'nullable|integer',
            'metadataable_type' => 'required_with:metadataable_id|string|in:page,project,solution',
        ];

        foreach(config('translatable.locales') as $locale)
        {
            $rules[$locale.'.title']          = 'required|string';
            // $rules[$locale.'.canonical_tags'] = 'nullable|string';
            $rules[$locale.'.image']          = $imageRequired.'|string';
            $rules[$locale.'.image_alt']      = 'nullable|string';
            $rules[$locale.'.image_type']     = 'nullable|string';
            $rules[$locale.'.site_name']      = 'nullable|string';
            $rules[$locale.'.type']           = 'nullable|string';
            $rules[$locale.'.description']    = 'required|string';
        }

        return $rules;
    }
}
