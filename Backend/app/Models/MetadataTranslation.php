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
        $value = $this->attributes['image'] ?? null;
        if (!$value) {
            return null;
        }

        // A value picked from another model's own already-uploaded media
        // (e.g. one of a project's 10 images) is stored as the full URL
        // it already resolved to — only a genuinely new upload through
        // this model's own attachment slot is a bare filename needing
        // `storage/images/metadata/` prepended.
        if (str_starts_with($value, 'http')) {
            return $value;
        }

        return asset('storage/images/metadata/' . $value);
    }
}
