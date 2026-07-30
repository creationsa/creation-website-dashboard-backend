<?php

namespace App\Http\Controllers\Api\Dashboard\Admin\Setting;

use Exception;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Dashboard\Admin\Setting\SettingRequest;
use App\Http\Resources\Api\Dashboard\Admin\Setting\SettingResource;

class SettingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $settings = Setting::latest()->paginate(25);

        return SettingResource::collection($settings)->additional([
            'status' => 'success', 'message' => '',
        ]);
    }

    public function store(SettingRequest $request)
    {
        DB::beginTransaction();
        
        try {
            $setting = Setting::latest()->get();
            
            $inputs= $request->validated();

            foreach ($inputs as $key => $value) {
                Setting::updateOrCreate(['key' => trim($key)],['value'=> $value]);
            }

            DB::commit();

            return (SettingResource::collection($setting->fresh()))->additional(['status' => 'success', 'message' => trans('dashboard.messages.success_add')]);

        } catch (Exception $e) {
            DB::rollback();
            info($e->getMessage());
            return response()->json(['status' => 'fail', 'data' => null, 'message' => trans('dashboard.messages.something_went_wrong_please_try_again')], 422);
        }
    }
}
