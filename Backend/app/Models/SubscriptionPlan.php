<?php

namespace App\Models;

use Astrotomic\Translatable\Contracts\Translatable as TranslatableContract;
use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SubscriptionPlan extends Model implements TranslatableContract
{
    use HasFactory, Translatable, SoftDeletes;

    protected $guarded = ['id', 'created_at', 'updated_at', 'deleted_at'];
    public $translatedAttributes = ['title', 'desc'];

    public function users()
    {
        return $this->hasMany(SubscriptionPlanUser::class, 'subscription_plan_id');
    }

    public function planFeatures()
    {
        return $this->hasMany(PlanFeature::class, 'subscription_plan_id');
    }
}
