<?php

namespace App\Http\Controllers\Api\Dashboard\Admin\Footer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Dashboard\Admin\Footer\FooterRequest;
use App\Http\Resources\Api\Dashboard\Admin\Footer\FooterResource;
use App\Models\AppMedia;
use App\Models\Footer;
use App\Models\FooterBadge;

class FooterController extends Controller
{
    private const RELATIONS = [
        'menuItems', 'menuItems.page', 'menuItems.page.translations',
        'copyrightItems', 'copyrightItems.page', 'copyrightItems.page.translations',
        'socialItems', 'socialItems.settingSocial',
        'badges', 'badges.translations', 'badges.media', 'badges.media.translations',
        'media', 'media.translations',
    ];

    /**
     * Display the (single) site-wide footer, creating an empty one on
     * first use since the dashboard always expects a record to exist.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $footer = Footer::with(self::RELATIONS)->first();

        if (!$footer) {
            $emptyLocale = ['statement_desc' => '', 'description' => '', 'tagline' => '', 'copyright_text' => ''];
            $footer = Footer::create([
                'en' => $emptyLocale,
                'ar' => $emptyLocale,
            ])->fresh(self::RELATIONS);
        }

        return FooterResource::make($footer)->additional(['status' => 'success', 'message' => '']);
    }

    /**
     * Update the (single) site-wide footer.
     *
     * @param  \App\Http\Requests\Api\Dashboard\Admin\Footer\FooterRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function update(FooterRequest $request)
    {
        $data = $request->validated();
        $footer = Footer::first();

        $payload = [
            'en' => [
                'statement_desc' => $data['en']['statement_desc'],
                'statement_image_alt' => $data['en']['statement_image_alt'],
                'description' => $data['en']['description'],
                'tagline' => $data['en']['tagline'],
                'menu_title' => $data['en']['menu_title'],
                'social_title' => $data['en']['social_title'],
                'copyright_text' => $data['en']['copyright_text'],
            ],
            'ar' => [
                'statement_desc' => $data['ar']['statement_desc'],
                'statement_image_alt' => $data['ar']['statement_image_alt'],
                'description' => $data['ar']['description'],
                'tagline' => $data['ar']['tagline'],
                'menu_title' => $data['ar']['menu_title'],
                'social_title' => $data['ar']['social_title'],
                'copyright_text' => $data['ar']['copyright_text'],
            ],
        ];

        if (!$footer) {
            $footer = Footer::create($payload);
        } else {
            $footer->update($payload);
        }

        $this->syncStatementImage($footer, $data['statement_image'] ?? null);
        $this->syncMenuItems($footer, $data['menu_items'] ?? []);
        $this->syncCopyrightItems($footer, $data['copyright_items'] ?? []);
        $this->syncSocialItems($footer, $data['social_items'] ?? []);
        $this->syncBadges($footer, $data['badges']);

        return FooterResource::make($footer->fresh(self::RELATIONS))
            ->additional(['status' => 'success', 'message' => trans('Updated successfully')]);
    }

    /**
     * `media` is only present in the payload when the admin actually
     * picked a new file, so an existing statement image must not be
     * wiped out when it's absent — and never overwritten with the
     * previously resolved full URL the dashboard resubmits when unchanged.
     */
    private function syncStatementImage(Footer $footer, ?array $data): void
    {
        if (!$this->isNewUpload($data['media'] ?? null)) {
            return;
        }

        $media = $footer->media()->where('option', 'statement_image')->first();
        if (!$media) {
            $media = new AppMedia();
            $media->app_mediaable_id = $footer->id;
            $media->app_mediaable_type = Footer::class;
            $media->option = 'statement_image';
        }
        $media->media_type = 'image';
        $media->media = $data['media'];
        $media->save();
    }

    /**
     * The dashboard sends the full menu list on every save without ids,
     * so the simplest correct sync is to replace it wholesale — these are
     * plain references (no files involved).
     */
    private function syncMenuItems(Footer $footer, array $items): void
    {
        $footer->menuItems()->delete();

        foreach ($items as $item) {
            $footer->menuItems()->create([
                'type' => $item['type'],
                'page_id' => $item['type'] === 'page' ? ($item['page_id'] ?? null) : null,
            ]);
        }
    }

    /**
     * Same reasoning as `syncMenuItems()` — a separate list, shown in the
     * copyright row instead of the main footer menu.
     */
    private function syncCopyrightItems(Footer $footer, array $items): void
    {
        $footer->copyrightItems()->delete();

        foreach ($items as $item) {
            $footer->copyrightItems()->create([
                'type' => $item['type'],
                'page_id' => $item['type'] === 'page' ? ($item['page_id'] ?? null) : null,
            ]);
        }
    }

    /**
     * Same reasoning as menu items — plain references, no files involved.
     */
    private function syncSocialItems(Footer $footer, array $items): void
    {
        $footer->socialItems()->delete();

        foreach ($items as $item) {
            $footer->socialItems()->create(['setting_social_id' => $item['setting_social_id']]);
        }
    }

    /**
     * Always exactly 2 badges, identified by `slot` (0/1) rather than
     * array order — update in place rather than delete-and-recreate since
     * each owns an image file.
     */
    private function syncBadges(Footer $footer, array $badges): void
    {
        foreach ($badges as $slot => $badgeData) {
            $badge = $footer->badges()->where('slot', $slot)->first();

            $payload = [
                'slot' => $slot,
                'link' => $badgeData['link'] ?? '',
                'en' => ['label' => $badgeData['label_en'] ?? ''],
                'ar' => ['label' => $badgeData['label_ar'] ?? ''],
            ];

            if (!$badge) {
                $badge = $footer->badges()->create($payload);
            } else {
                $badge->update($payload);
            }

            if ($this->isNewUpload($badgeData['image'] ?? null)) {
                $media = $badge->media()->where('option', 'badge_image')->first();
                if (!$media) {
                    $media = new AppMedia();
                    $media->app_mediaable_id = $badge->id;
                    $media->app_mediaable_type = FooterBadge::class;
                    $media->option = 'badge_image';
                }
                $media->media_type = 'image';
                $media->media = $badgeData['image'];
                $media->save();
            }
        }
    }

    /**
     * The dashboard resubmits every media value on save, including
     * unchanged ones, as the previously resolved full URL (not a bare
     * filename). Only a genuinely new upload should overwrite a stored
     * value.
     */
    private function isNewUpload(?string $value): bool
    {
        return !empty($value) && !str_starts_with($value, 'http');
    }
}
