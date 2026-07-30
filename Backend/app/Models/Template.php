<?php

namespace App\Models;

use App\Observers\TemplateObserver;
use Astrotomic\Translatable\Contracts\Translatable as TranslatableContract;
use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Template extends Model implements TranslatableContract
{
    use HasFactory, Translatable;

    protected $guarded = ['id', 'created_at', 'updated_at'];
    protected $casts = [
        'design' => 'array',
    ];
    public $translatedAttributes = ['name'];

    protected static function boot()
    {
        parent::boot();
        Template::observe(TemplateObserver::class);
    }

    public function favorites()
    {
        return $this->hasMany(Favorite::class);
    }

    public function getIsFavoriteAttribute()
    {
        return auth('api')->check() && $this->favorites()->where('user_id', auth('api')->id())->first();
    }
    
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function templateType()
    {
        return $this->hasOne(TemplateType::class, 'id', 'template_type_id');
    }

    public function subcategory()
    {
        return $this->belongsTo(Subcategory::class);
    }

    public function getImageAttribute()
    {
        $media = $this->media()->where("option", "template_thumbnail")->first();
        if ($media) {
            if (file_exists(storage_path('app/public/images/templates/' . $media->media))) {
                $image = 'storage/images/templates/' . $media->media;
            } else {
                $image = 'storage/images/user_templates/' . $media->media;
            }
        } else {
            $image = 'assets/images/default/default.png';
        }
        return asset($image);
    }

    public function getColorImageAttribute()
    {
        $media = $this->media()->where("option", "color_image")->first();
        $image = null;
        if ($media) {
            if (file_exists(storage_path('app/public/images/templates/' . $media->media))) {
                $image = 'storage/images/templates/' . $media->media;
            } else {
                $image = 'storage/images/user_templates/' . $media->media;
            }
        }
        return $image != null ? asset($image) : null;
    }

    public function getTemplatePreview()
    {
        $media = $this->media()->where("option", "template_preview")->first();
        if ($media) {
            if (file_exists(storage_path('app/public/images/templates/' . $media->media))) {
                $image = 'storage/images/templates/' . $media->media;
            } else {
                $image = 'storage/images/user_templates/' . $media->media;
            }
        } else {
            $image = 'assets/images/default/default.png';
        }
        return asset($image);
    }

    public function getTemplateAssets()
    {
        $template_assets = $this->media()->where('option', 'LIKE', 'asset_%')->get();
        $assets = $template_assets->map(function ($asset) {
            if (file_exists(storage_path('app/public/images/templates/' . $asset->media))) {
                return [
                    'id' => $asset->option,
                    'url' => asset('storage/images/templates/' . $asset->media)
                ];
            }else{
                return [
                    'id' => $asset->option,
                    'url' => asset('storage/images/user_templates/' . $asset->media)
                ];
            }
        });
        return $assets;
    }

    public function media()
    {
        return $this->morphOne(AppMedia::class, 'app_mediaable');
    }

    public function children()
    {
        return $this->hasMany(Template::class, 'parent_id');
    }

    public function parent()
    {
        return $this->belongsTo(Template::class, 'parent_id');
    }
}
