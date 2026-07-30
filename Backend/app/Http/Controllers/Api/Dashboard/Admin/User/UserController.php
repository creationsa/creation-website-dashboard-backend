<?php

namespace App\Http\Controllers\Api\Dashboard\Admin\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Dashboard\Admin\User\UserRequest;
use App\Http\Resources\Api\Dashboard\Admin\User\UserIndexResource;
use App\Http\Resources\Api\Dashboard\Admin\User\UserNamesResource;
use App\Http\Resources\Api\Dashboard\Admin\User\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{

    public function users_names(Request $request)
    {
        $users = User::when($request->user_type, function ($query) use ($request) {

            $query->where('user_type', $request->user_type);

        })->latest()->get(['id', 'full_name']);

        return UserNamesResource::collection($users)->additional(['status' => 'success', 'message' => '']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $users = User::whereNotIn('user_type', ['admin', 'super_admin'])
            ->when($request->is_ban, function ($query) use ($request) {
                $query->where('is_ban', $request->is_ban);
            })
            ->when($request->is_active, function ($query) use ($request) {
                $query->where('is_admin_active_user', $request->is_active);
            })
            //
        /*leftJoin('subscription_plans', 'users.subscription_plan_id', '=', 'subscription_plans.id')
            ->select('users.*', 'subscription_plans.name as subscription_plan_name')*/
            
            ->when(request()->keyword, function ($query) {
                $query->where(function ($query) {
                    $query->where('full_name', 'like', '%' . request()->keyword . '%')
                        ->orWhere('phone', 'like', '%' . request()->keyword . '%')
                        ->orWhere('email', 'like', '%' . request()->keyword . '%');
                });
            })
            ->when(request()->points, function ($query) {
                $query->whereBetween('points', [request()->points['min'], request()->points['max']]);
            })
            // ->when(request()->subscription_plan, function ($query) {
            //     $query->where('subscription_plan_id', request()->subscription_plan);
            // })
            ->latest()->paginate(request()->per_page ?? 10);


        return UserIndexResource::collection($users)->additional(['status' => 'success', 'message' => '']);
    }

    public function indexWithoutPagination(Request $request)
    {
        $users = User::when($request->user_type, function ($query) use ($request) {

            $query->where('user_type', $request->user_type);

        })->when(request()->keyword, function ($query) {
            $query->where(function ($query) {
                $query->where('full_name', 'like', '%' . request()->keyword . '%')
                    ->orWhere('email', 'like', '%' . request()->keyword . '%');
            });
        })->latest()->get();

        return UserIndexResource::collection($users)->additional(['status' => 'success', 'message' => '']);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(UserRequest $request)
    {
        if (isset($request->phone) && (substr($request->phone, 0, 1) != '5' || substr($request->phone, 0, 1) != '05')) {
            return response()->json(['status' => 'fail', 'data' => null, 'message' => trans('app/client.messages.worng_phone_format')], 422);
        }
        $user = User::create($request->all() + ['is_admin_active_user' => 1, 'phone_verified_at' => now(), 'hash_code'  => generate_unique_code(8, '\\App\\Models\\User', 'hash_code', 'letters'),'points' => 25]);
        $user->profile()->create($request->only(['country_id']));

        return UserResource::make($user)->additional(['status' => 'success', 'message' => '']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::whereNotIn('user_type', ['admin', 'super_admin'])->findOrFail($id);
        return UserResource::make($user)->additional(['status' => 'success', 'message' => '']);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UserRequest $request, $id)
    {
        $user = User::whereNotIn('user_type', ['admin', 'super_admin'])->findOrFail($id);
        $user->update($request->all());
        $user->profile()->update($request->only(['country_id']));
        return UserResource::make($user)->additional(['status' => 'success', 'message' => '']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::whereNotIn('user_type', ['admin', 'super_admin'])->findOrFail($id);

        if ($user->delete()) {
            return response()->json(['status' => 'success', 'data' => null, 'message' => trans('dashboard/admin.actions.deleted_successfully')]);
        }
    }

    public function toggleActive($id)
    {
        $user = User::whereNotIn('user_type', ['admin', 'super_admin'])->findOrFail($id);
        $user->update(['is_admin_active_user' => !$user->is_admin_active_user]);
        return UserResource::make($user)->additional(['status' => 'success', 'message' => '']);
    }

    public function toggleBan($id)
    {
        $user = User::whereNotIn('user_type', ['admin', 'super_admin'])->findOrFail($id);
        $user->update(['is_ban' => !$user->is_ban]);

        // $ban = $user->is_ban == true ? 'ban' : 'not_ban';

        // $user->notify(new  BanNotification($this->banContent($ban), ['database', 'fcm']));

        return UserResource::make($user)->additional(['status' => 'success', 'message' => '']);
    }

    public function addPoints($id, Request $request)
    {
        $request->validate([
            'points' => 'required|numeric|min:1|max:1000000',
        ]);
        $user = User::whereNotIn('user_type', ['admin', 'super_admin'])->findOrFail($id);
        $user->update(['points' => $user->points + $request->points]);
        return UserResource::make($user)->additional(['status' => 'success', 'message' => '']);
    }

}
