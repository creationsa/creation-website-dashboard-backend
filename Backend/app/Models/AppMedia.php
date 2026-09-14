<?php

namespace App\Models;

use Astrotomic\Translatable\Contracts\Translatable as TranslatableContract;
use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\Model;

class AppMedia extends Model implements TranslatableContract
{
    use Translatable;

    protected $guarded = ['id', 'created_at', 'updated_at'];
    public $translatedAttributes = ['alt'];

    public static function boot()
    {
        parent::boot();

        static::updating(function ($model) {
            $is_media_changed = $model->isDirty(['media', 'media_type']);
            if ($is_media_changed) {
                $media = $model->getOriginal('media');
                $path  = storage_path('app/public/' . ($model->getOriginal('media_type') == 'image' ? 'images/' : 'files/') . $model->file_name . '/' . $media);
                if (file_exists($path)) {
                    \File::delete($path);
                }
            }
        });

        static::deleting(function ($model) {
            $path  = storage_path('app/public/' . ($model->getOriginal('media_type') == 'image' ? 'images/' : 'files/') . $model->file_name . '/' . $model->media);
            if (file_exists($path)) {
                \File::delete($path);
            }
        });
    }

    public function getPathAttribute()
    {
        return $this->file_name ? asset('storage/' . ($this->media_type == 'image' ? 'images/' : 'files/') . $this->file_name . '/' . $this->media) : null;
    }

    public function getStoragePathAttribute()
    {
        return $this->file_name ? storage_path('app/public/' . ($this->media_type == 'image' ? 'images/' : 'files/') . $this->file_name . '/' . $this->media) : null;
    }

    public function getFileNameAttribute()
    {
        $map = [
            About::class    => 'abouts',
            Country::class  => 'countries',
            Metadata::class => 'metadata',
            User::class     => 'users',
            Page::class     => 'pages',
            Blog::class     => 'blogs',
            Project::class  => 'projects',
            ProjectsMainData::class => 'projects',
            Solution::class => 'solutions',
            SolutionItem::class => 'solutions',
            SolutionsMainData::class => 'solutions',
            SolutionMainDataItem::class => 'solutions',
            Footer::class => 'footer',
            FooterBadge::class => 'footer',
            Client::class => 'clients',
        ];

        return $map[$this->app_mediaable_type];
    }

    public function app_mediaable()
    {
        return $this->morphTo();
    }
}
