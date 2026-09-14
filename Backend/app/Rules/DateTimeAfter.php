<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class DateTimeAfter implements ValidationRule
{
    public function __construct(
        protected string $startDate,
        protected string $startTime,
        protected ?string $endDate = null
    ) {}

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $request = request();
        
        if ($request->input($this->endDate) && $request->input($this->startDate) && 
            $request->input($this->startTime) && $value) {
            
            $start = $request->input($this->startDate) . ' ' . $request->input($this->startTime);
            $end = $request->input($this->endDate) . ' ' . $value;
            
            if (strtotime($end) <= strtotime($start)) {
                $fail('The end datetime must be after the start datetime.');
            }
        }
    }
} 