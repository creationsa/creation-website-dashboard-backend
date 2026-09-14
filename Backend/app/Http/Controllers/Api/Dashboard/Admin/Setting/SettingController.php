<?php

namespace App\Http\Controllers\Api\Dashboard\Admin\Setting;

use App\Http\Requests\Api\Dashboard\Admin\Setting\SettingRequest;
use App\Http\Resources\Api\Dashboard\Admin\Setting\SettingResource;
use App\Http\Controllers\Controller;
use App\Models\Setting;
use App\Models\SettingSocial;

class SettingController extends Controller
{
    private const KEYS = [
        'logo_en', 'logo_en_alt_en', 'logo_en_alt_ar',
        'logo_ar', 'logo_ar_alt_en', 'logo_ar_alt_ar',
    ];

    /**
     * The dashboard settings screen edits a flat set of site-wide values
     * (logos, each stored as its own row in the generic `settings`
     * key/value table) plus a dynamic list of social links. Consolidate
     * them into one object.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $rows = Setting::whereIn('key', self::KEYS)->get(['key', 'value'])->keyBy('key');

        $data = collect(self::KEYS)->mapWithKeys(fn ($key) => [$key => $rows[$key]->value ?? ''])->toArray();
        $data['socials'] = SettingSocial::all();

        return SettingResource::make((object) $data)->additional(['status' => 'success', 'message' => '']);
    }

    /**
     * Update the site-wide settings. `logo_en`/`logo_ar` are only present
     * in the payload when the admin actually picked a new file, so an
     * existing logo must not be wiped out when it's absent.
     *
     * @param  \App\Http\Requests\Api\Dashboard\Admin\Setting\SettingRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function update(SettingRequest $request)
    {
        $data = $request->validated();

        $flat = [
            'logo_en_alt_en' => $data['logo_en']['en']['alt'] ?? null,
            'logo_en_alt_ar' => $data['logo_en']['ar']['alt'] ?? null,
            'logo_ar_alt_en' => $data['logo_ar']['en']['alt'] ?? null,
            'logo_ar_alt_ar' => $data['logo_ar']['ar']['alt'] ?? null,
        ];

        if ($this->isNewUpload($data['logo_en']['media'] ?? null)) {
            $flat['logo_en'] = $data['logo_en']['media'];
        }
        if ($this->isNewUpload($data['logo_ar']['media'] ?? null)) {
            $flat['logo_ar'] = $data['logo_ar']['media'];
        }

        foreach ($flat as $key => $value) {
            if ($value === null) {
                continue;
            }
            Setting::updateOrCreate(['key' => $key], ['value' => $value]);
        }

        $this->syncSocials($data['socials']);

        return $this->index();
    }

    /**
     * Update-in-place-by-id rather than delete-and-recreate: other
     * records (the footer's social link picker) reference a social entry
     * by its id, so wiping and reinserting on every save would silently
     * break those references even when nothing meaningful changed.
     */
    private function syncSocials(array $socials): void
    {
        $submittedIds = collect($socials)->pluck('id')->filter()->values();

        SettingSocial::whereNotIn('id', $submittedIds)->delete();

        foreach ($socials as $social) {
            $payload = [
                'title_en' => $social['title_en'],
                'title_ar' => $social['title_ar'],
                'link' => $social['link'],
            ];

            if (!empty($social['id'])) {
                SettingSocial::where('id', $social['id'])->update($payload);
            } else {
                SettingSocial::create($payload);
            }
        }
    }

    /**
     * The dashboard resubmits the logo on every save, including when
     * unchanged, as the previously resolved full URL (not a bare
     * filename). Only a genuinely new upload should overwrite the stored
     * value.
     */
    private function isNewUpload(?string $value): bool
    {
        return !empty($value) && !str_starts_with($value, 'http');
    }
}
