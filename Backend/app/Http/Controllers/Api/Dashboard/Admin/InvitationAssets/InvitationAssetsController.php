<?php

namespace App\Http\Controllers\Api\Dashboard\Admin\InvitationAssets;

use App\Models\{Font, Logo, Sticker, AppMedia, Backdrop, PageStyle, EnvelopeLiner, EnvelopeStamp, PaperBackground, EnvelopeBackground};
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\Api\Dashboard\Admin\Asset\{FontRequest, AssetRequest, PageStyleRequest, SecondAssetRequest};
use App\Http\Resources\Api\Dashboard\Admin\Asset\{FontResource, LogoResource, AssetResource, PageStyleResource, SecondAssetResource};
use App\Http\Requests\Api\Website\UserTemplate\EventLogoRequest;

class InvitationAssetsController extends Controller
{
    public function index(Request $request)
    {
        switch ($request->model_type) {
            case 'backdrop':
                $images = Backdrop::Active()->latest()->paginate($request->per_page ?? 25);
                return SecondAssetResource::collection($images)->additional(['status' => 'success', 'messages' => '']);
                break;
            case 'sticker':
                $images = Sticker::Active()->latest()->paginate($request->per_page ?? 25);
                return SecondAssetResource::collection($images)->additional(['status' => 'success', 'messages' => '']);
                break;
            case 'envelope_stamp':
                $images = EnvelopeStamp::Active()->latest()->paginate($request->per_page ?? 25);
                return SecondAssetResource::collection($images)->additional(['status' => 'success', 'messages' => '']);
                break;
            case 'envelope_liner':
                $images = EnvelopeLiner::Active()->latest()->paginate($request->per_page ?? 25);
                return AssetResource::collection($images)->additional(['status' => 'success', 'messages' => '']);
                break;
            case 'paper_background':
                $images = PaperBackground::Active()->latest()->paginate($request->per_page ?? 25);
                return AssetResource::collection($images)->additional(['status' => 'success', 'messages' => '']);
                break;
            case 'envelope_background':
                $images = EnvelopeBackground::Active()->latest()->paginate($request->per_page ?? 25);
                return AssetResource::collection($images)->additional(['status' => 'success', 'messages' => '']);
                break;
            case 'font':
                $images = Font::Active()->latest()->paginate($request->per_page ?? 25);
                return FontResource::collection($images)->additional(['status' => 'success', 'messages' => '']);
                break;
            case 'page_style':
                $images = PageStyle::Active()->latest()->paginate($request->per_page ?? 25);
                return PageStyleResource::collection($images)->additional(['status' => 'success', 'messages' => '']);
                break;
            default :
                $images = PaperBackground::Active()->latest()->paginate($request->per_page ?? 25);
                return AssetResource::collection($images)->additional(['status' => 'success', 'messages' => '']);
                break;
        }

    }

    public function createAsset(AssetRequest $request)
    {
        switch ($request->model_type) {
            case 'envelope_liner':
                $instance = EnvelopeLiner::create(array_except($request->validated(), 'model_type'));
                break;
            case 'paper_background':
                $instance = PaperBackground::create(array_except($request->validated(), 'model_type'));
                break;
            case 'envelope_background':
                $instance = EnvelopeBackground::create(array_except($request->validated(), 'model_type'));
                break;
        }

        return AssetResource::make($instance)->additional(['status' => 'success', 'message' => trans('dashboard/admin.actions.created_successfully')]);
    }

    public function createSecondAsset(SecondAssetRequest $request)
    {
        switch ($request->model_type) {
            case 'sticker':
                $instance = Sticker::create($request->validated());
                break;
            case 'envelope_stamp':
                $instance = EnvelopeStamp::create($request->validated());
                break;
            case 'backdrop':
                $instance = Backdrop::create($request->validated());
                break;
        }

        return SecondAssetResource::make($instance)->additional(['status' => 'success', 'message' => trans('dashboard/admin.actions.created_successfully')]);
    }

    public function createFont(FontRequest $request)
    {
        $font = Font::create($request->validated());
        if($request->styles){
            $font->fontStyles()->createMany($request->styles);
        }
        return FontResource::make($font)->additional(['status' => 'success', 'message' => trans('dashboard/admin.actions.created_successfully')]);
    }

    public function createPageStyle(PageStyleRequest $request)
    {
        $page_style = PageStyle::create($request->validated());
        if($request->styles){
            $page_style->pageStyleStyles()->createMany($request->styles);
        }
        return PageStyleResource::make($page_style)->additional(['status' => 'success', 'message' => trans('dashboard/admin.actions.created_successfully')]);
    }

    public function destroy(Request $request, $id)
    {
        switch ($request->model_type) {
            case 'backdrop':
                $instance = Backdrop::findOrFail($id);
                break;
            case 'paper_background':
                $instance = PaperBackground::findOrFail($id);
                break;
            case 'envelope_background':
                $instance = EnvelopeBackground::findOrFail($id);
                break;
            case 'sticker':
                $instance = Sticker::findOrFail($id);
                break;
            case 'envelope_stamp':
                $instance = EnvelopeStamp::findOrFail($id);
                break;
            case 'envelope_liner':
                $instance = EnvelopeLiner::findOrFail($id);
                break;
            case 'font':
                $instance = Font::findOrFail($id);
                break;
            case 'page_style':
                $instance = PageStyle::findOrFail($id);
                break;
        }

        if ($instance->update(['is_active' => false])) {
            return response()->json(['status' => 'success', 'data' => null, 'message' => trans('dashboard/admin.actions.deleted_successfully')]);
        }
        return response()->json(['status' => 'fail', 'data' => null, 'message' => trans('dashboard.api.delete_fail')], 422);
    }

    public function uploadLogo(EventLogoRequest $request)
    {

        $Logo = Logo::create(['is_dashboard' => true, 'type' => $request->type, 'user_id' => auth('api')->user()->id]);
        $Logo->media()->create(['media' => $request->logo, 'media_type' => 'image', 'option' => $request->type]);

        return LogoResource::make($Logo->fresh())->additional(['status' => 'success', 'message' => 'Uploaded successfully']);
    }

    public function getLogos(Request $request)
    {
        $Logos = Logo::where(['is_dashboard' => true])->when($request->type, function ($q) use ($request) {
            $q->where('type', $request->type);
        })->latest()->paginate($request->per_page ?? 1000);
        return LogoResource::collection($Logos)->additional(['status' => 'success', 'message' => '']);
    }

    public  function deleteLogo($id)
    {
        $Logo = Logo::where('is_dashboard',true)->findOrFail($id);
        if ($Logo->delete()) {
            if ($Logo->media()->exists()) {
                $image = AppMedia::where(['app_mediaable_type' => 'App\Models\Logo', 'app_mediaable_id' => $Logo->id, 'media_type' => 'image'])->first();
                if (file_exists(storage_path('app/public/images/logos/' . $image->media))) {
                    \File::delete(storage_path('app/public/images/logos/' . $image->media));
                }
                $image->delete();
            }
            return response()->json(['status' => 'success', 'data' => null, 'message' => trans('api.messages.deleted_successfully')]);
        }
        return response()->json(['status' => 'fail', 'data' => null, 'message' => trans('dashboard.api.delete_fail')], 422);
    }
}
