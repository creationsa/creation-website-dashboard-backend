<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Observers\UserTemplateObserver;
class UserTemplate extends Model
{
    use HasFactory;

    protected $guarded = ['id', 'created_at', 'updated_at'];
    protected $casts = [
        'design' => 'array',
        'q_and_a' => 'array'
    ];

    protected static function boot()
    {
        parent::boot();
        UserTemplate::observe(UserTemplateObserver::class);
    }

    public function template()
    {
        return $this->belongsTo(Template::class);
    }

    public function templateSetting()
    {
        return $this->hasOne(TemplateSetting::class, 'user_template_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function questions()
    {
        return $this->hasMany(Question::class);
    }

    public function invitationGuests()
    {
        return $this->hasMany(InvitationGuests::class,'user_template_id');
    }

    public function getTemplateAssets()
    {
        $template_assets = $this->media()->where('option', 'LIKE', 'asset_%')->get();

        $assets = $template_assets->map(function ($asset) {
            if (file_exists(storage_path('app/public/images/user_templates/' . $asset->media))) {
                return [
                    'id' => $asset->option,
                    'url' => asset('storage/images/user_templates/' . $asset->media)
                ];
            } else {
                return [
                    'id' => $asset->option,
                    'url' => asset('storage/images/templates/' . $asset->media)
                ];
            }
        });
        return $assets;
    }

    public function getLogosAttribute()
    {
        $logos = $this->media()->where('option', 'logo')->get();

        $assets = $logos->map(function ($asset) {
            if (file_exists(storage_path('app/public/images/user_templates/' . $asset->media))) {
                return [
                    'id' => $asset->option,
                    'url' => asset('storage/images/user_templates/' . $asset->media)
                ];
            } else {
                return [
                    'id' => $asset->option,
                    'url' => asset('storage/images/templates/' . $asset->media)
                ];
            }
        });
        return $assets;
    }

    public function media()
    {
        return $this->morphOne(AppMedia::class, 'app_mediaable');
    }

    public function cohosts()
    {
        return $this->hasMany(Cohost::class, 'user_template_id');
    }

}
