<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MetadataTranslation extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $guarded = ['id', 'created_at', 'updated_at'];

    public static function boot()
    {
        parent::boot();

        static::updating(function ($model) {
            $is_image_changed = $model->isDirty(['image']);
            if ($is_image_changed) {
                $path = storage_path('app/public/images/metadata/' . $model->getOriginal('image'));
                if (file_exists($path)) {
                    \File::delete($path);
                }
            }
        });

        static::deleting(function ($model) {
            $path = storage_path('app/public/images/metadata/' . $model->image);
            if (file_exists($path)) {
                \File::delete($path);
            }
        });
    }

    public function getImageAttribute($key)
    {
        $image = $this->attributes['image'] ? asset('storage/images/metadata/' . $this->attributes['image']) : null;
        return $image;
    }
}
