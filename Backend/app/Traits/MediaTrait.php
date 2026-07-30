<?php

namespace App\Traits;

use App\Models\AppMedia;
use Illuminate\Database\Eloquent\Model;

trait MediaTrait
{
    public function setMedia(Model $model, $media, $folder, $media_type = 'image', $option = null, $delete_old = true)
    {
        $old_media = AppMedia::where(['app_mediaable_type' => get_class($model), 'app_mediaable_id' => $model->id, 'media' => $media, 'media_type' => $media_type, 'option' => $option])->first();

        if (!$old_media) {
            if ($model->media()->exists() && $delete_old) {
                $this->deleteOldMedia($model, $folder, $media_type, $option);
            }

            $model->media()->create(['media' => $media, 'media_type' => $media_type, 'option' => $option]);
        }
    }

    public function deleteOldMedia(Model $model, $folder, $media_type = 'image', $option = null)
    {
        $media = AppMedia::where(['app_mediaable_type' => get_class($model), 'app_mediaable_id' => $model->id, 'media_type' => $media_type, 'option' => $option])->first();
        if ($media) {
            if (file_exists($this->getPath($folder, $media->media, $media_type))) {
                \File::delete($this->getPath($folder, $media->media, $media_type));
            }
            $media->delete();
        }
    }

    public function deleteMedia(Model $model, $folder, $media_type = 'image', $option = null)
    {
        $medias = $model->media()->get();

        if (is_array($medias)) {
            foreach ($medias as  $media) {
                if (file_exists($this->getPath($folder, $media->media, $media_type))) {
                    \File::delete($this->getPath($folder, $media->media, $media_type));
                }
                $media->delete();
            }
        }
    }

    public function getPath($folder, $media, $media_type = 'image')
    {
        return storage_path('app/public/' . $media_type == 'image' ? 'images' : 'files' . '/' . $folder . '/' . $media);
    }
}
