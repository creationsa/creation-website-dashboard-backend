<?php

namespace App\Http\Controllers\Api\Dashboard\Admin\Client;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Dashboard\Admin\Client\ClientRequest;
use App\Http\Resources\Api\Dashboard\Admin\Client\ClientResource;
use App\Models\AppMedia;
use App\Models\Client;

class ClientController extends Controller
{
    private const RELATIONS = ['logos', 'logos.translations'];

    /**
     * Display the (single) clients/logos list, creating an empty one on
     * first use since the dashboard always expects a record to exist.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Client::with(self::RELATIONS)->first();

        if (!$data) {
            $data = Client::create([
                'en' => ['title' => ''],
                'ar' => ['title' => ''],
            ])->fresh(self::RELATIONS);
        }

        return ClientResource::make($data)->additional(['status' => 'success', 'message' => '']);
    }

    /**
     * Update the (single) clients/logos list.
     *
     * @param  \App\Http\Requests\Api\Dashboard\Admin\Client\ClientRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function update(ClientRequest $request)
    {
        $data = $request->validated();
        $model = Client::first();

        $payload = [
            'en' => ['title' => $data['title_en']],
            'ar' => ['title' => $data['title_ar']],
        ];

        if (!$model) {
            $model = Client::create($payload);
        } else {
            $model->update($payload);
        }

        $this->syncLogos($model, $data['logos']);

        return ClientResource::make($model->fresh(self::RELATIONS))
            ->additional(['status' => 'success', 'message' => trans('Updated successfully')]);
    }

    /**
     * Match submitted logos against existing ones by filename so unchanged
     * logos are left alone (AppMedia deletes the physical file when a row
     * is removed) — only genuinely removed/added logos are touched.
     */
    private function syncLogos(Client $model, array $logos): void
    {
        $existing = $model->logos()->get();
        $submittedFilenames = collect($logos)
            ->pluck('logo_image')
            ->filter()
            ->map(fn ($value) => $this->resolveFilename($value))
            ->values();

        foreach ($existing as $logo) {
            if (!$submittedFilenames->contains($logo->media)) {
                $logo->delete();
            }
        }

        foreach ($logos as $logoData) {
            $filename = $this->resolveFilename($logoData['logo_image'] ?? null);
            if (!$filename) {
                continue;
            }

            $logo = $model->logos()->where('media', $filename)->first();
            if (!$logo) {
                $logo = new AppMedia();
                $logo->app_mediaable_id = $model->id;
                $logo->app_mediaable_type = Client::class;
                $logo->option = 'logo';
                $logo->media_type = 'image';
                $logo->media = $filename;
                $logo->save();
            }

            $logo->update([
                'en' => ['alt' => $logoData['alt_en'] ?? ''],
                'ar' => ['alt' => $logoData['alt_ar'] ?? ''],
            ]);
        }
    }

    /**
     * The dashboard resubmits every logo on save, including unchanged ones,
     * whose value is the previously resolved full URL (not a bare
     * filename). Match/store by the bare filename so unchanged logos are
     * neither deleted nor corrupted.
     */
    private function resolveFilename(?string $value): ?string
    {
        if (!$value) {
            return null;
        }

        return str_starts_with($value, 'http')
            ? basename(parse_url($value, PHP_URL_PATH) ?: $value)
            : $value;
    }
}
