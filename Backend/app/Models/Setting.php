<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $guarded = ['id', 'created_at', 'updated_at'];

    public function setValueAttribute($value)
    {
        if ($this->attributes['key'] == 'instructions') {
            $this->attributes['value'] = json_encode($value);
        } else {
            $this->attributes['value'] = $value;
        }
    }

    public function getValueAttribute()
    {
        if (count($this->attributes) > 0) {
            if ($this->attributes['key'] == 'instructions') return json_decode($this->attributes['value']);
            return $this->attributes['value'];
        }
    }
}
