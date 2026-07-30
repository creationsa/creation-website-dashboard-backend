<?php
namespace App\Observers;

use App\Models\AppMedia;
use App\Models\UserTemplate;

class UserTemplateObserver
{
    // public function created(UserTemplate $template)
    // {
    //     $this->handleMedia($template);
    // }

    // public function updated(UserTemplate $template)
    // {
    //     $this->handleMedia($template);
    // }

    public function saved(UserTemplate $template)
    {
        $this->handleMedia($template);
    }

    private function handleMedia(UserTemplate $template)
    {
        if (request()->has('template_assets') && is_array(request()->template_assets)) {
            foreach (request()->template_assets as $imageObject) {
                if (isset($imageObject['id']) && isset($imageObject['url'])) {
                    $option = 'asset_' . $imageObject['id'];

                    $template_image = AppMedia::where([
                        'app_mediaable_type' => 'App\Models\UserTemplate',
                        'app_mediaable_id' => $template->id,
                        'media_type' => 'image',
                        'option' => $option,
                    ])->first();

                    if ($template_image) {
                        if (file_exists(storage_path('app/public/images/user_templates/' . $template_image->media))) {
                            \File::delete(storage_path('app/public/images/user_templates/' . $template_image->media));
                        }
                        $template_image->delete();
                    }

                    $template->media()->create([
                        'media' => $imageObject['url'],
                        'media_type' => 'image',
                        'option' => $option,
                    ]);
                }
            }
        }

        if (request()->has('logos')) {
            foreach (request()->logos as $logo) {
                $template->media()->create(['media' => $logo, 'media_type' => 'image', 'option' => 'logo']);
            }
        }
    }
}
