<?php

namespace App\Observers;

use App\Models\AppMedia;
use App\Models\User;
use App\Traits\MediaTrait;

class UserObserver
{
    use MediaTrait;

    public function saved(User $user)
    {
        $requestKeys = collect(array_only(request()->all(), ['image', 'personal_image']))->keys();
        $imgs = $requestKeys->filter(function ($key) {
            if (\Str::contains($key, 'image')) return $key;
        })->toArray();

        if (! empty($imgs)) {
            foreach ($imgs as $img)
            {
                if (request($img) != null) $this->setMedia($user, request($img), 'users', 'image', $img);
            }
        }
    }

    public function deleted(User $user)
    {
        if ($user->media()->exists()) {
            $this->deleteMedia($user, 'users');
        }
    }
}
