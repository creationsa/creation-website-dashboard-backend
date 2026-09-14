<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

/**
 * The dashboard pre-uploads files via the generic /general/attachments
 * endpoint (which allows png/jpg/svg for any image field) and only submits
 * the resulting filename here, so the svg-only constraint for a specific
 * field has to be enforced at this later step instead. A value that's
 * already a full URL (starting with "http") is a resubmitted, previously
 * uploaded value, not a new file, and was already validated when it was
 * first uploaded — so it's left untouched here.
 */
class SvgFile implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (empty($value) || str_starts_with($value, 'http')) {
            return;
        }

        if (!str_ends_with(strtolower($value), '.svg')) {
            $fail('The :attribute must be an SVG file.');
        }
    }
}
