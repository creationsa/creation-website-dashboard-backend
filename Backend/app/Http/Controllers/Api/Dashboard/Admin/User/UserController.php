<?php

namespace App\Http\Controllers\Api\Dashboard\Admin\User;

use App\Models\User;
use App\Exports\ExportUser;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Maatwebsite\Excel\Facades\Excel;
use App\Http\Requests\Api\Dashboard\Admin\User\UserRequest;
use App\Http\Resources\Api\Dashboard\Admin\User\UserResource;
use App\Http\Resources\Api\Dashboard\Admin\User\UserIndexResource;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $users = User::whereNotIn('user_type', ['admin', 'super_admin'])->where('is_completed_data', 1)
            ->when($request->user_type, fn($query) => $query->where('user_type', $request->user_type))
            ->when($request->keyword, fn($query) => $query->where(function ($query) use ($request) {
            $query->where('full_name', 'like', '%' . $request->keyword . '%')
                ->orWhere('phone', 'like', '%' . $request->keyword . '%')
                ->orWhere('email', 'like', '%' . $request->keyword . '%');
            }))
            ->when(isset($request->is_active), fn($query) => $query->where('is_admin_active_user', $request->is_active))
            ->when(isset($request->is_ban), fn($query) => $query->where('is_ban', $request->is_ban))
            ->when($request->from_date, fn($query) => $query->whereDate('created_at', '>=', $request->from_date))
            ->when($request->to_date, fn($query) => $query->whereDate('created_at', '<=', $request->to_date))
            ->latest()
            ->paginate($request->per_page ?? 10);

        return UserIndexResource::collection($users)->additional(['status' => 'success', 'message' => '']);
    }

    public function indexWithoutPagination(Request $request)
    {
        $users = User::whereNotIn('user_type', ['admin', 'super_admin'])
            ->when($request->user_type, function ($query) use ($request) {
                $query->where('user_type', $request->user_type);
            })
            ->when(request()->keyword, function ($query) {
                $query->where(function ($query) {
                    $query->where('full_name', 'like', '%' . request()->keyword . '%')
                        ->orWhere('email', 'like', '%' . request()->keyword . '%');
                });
            })
            ->latest()
            ->get();

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
        // $promotional_code = $this->generatePromotionalCode();
        $user = User::create($request->validated() + ['is_admin_active_user' => 1, 'phone_verified_at' => now(), 'is_completed_data' => 1]);
        $user->profile()->create($request->profile_data);
        return UserResource::make($user)->additional(['status' => 'success', 'message' => trans('Created successfully')]);
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
        $user->update($request->validated());
        $user->profile()->update($request->profile_data);
        return UserResource::make($user)->additional(['status' => 'success', 'message' => trans('Updated successfully')]);
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
            return $this->successResponse(trans('Deleted successfully'));
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

    public function export()
    {
		return Excel::download(new ExportUser(), 'users.xlsx');
	}
}
