<?php

namespace App\Http\Controllers\Api\Website\Asset;


use App\Models\{Backdrop, PageStyle, Sticker, Font, EnvelopeLiner, EnvelopeStamp, PaperBackground, EnvelopeBackground};
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\Api\Dashboard\Admin\Asset\{FontResource, AssetResource, PageStyleResource, SecondAssetResource};


class AssetController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
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
            default:
                $images = PaperBackground::Active()->latest()->paginate($request->per_page ?? 25);
                return AssetResource::collection($images)->additional(['status' => 'success', 'messages' => '']);
                break;
        }
    }
}
