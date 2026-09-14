<?php

namespace App\Http\Controllers\Api\Dashboard\Admin\Admin;

use App\Models\User;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Dashboard\Admin\Admin\AdminRequest;
use App\Http\Resources\Api\Dashboard\Admin\Admin\{AdminIndexResource, AdminResource};
use App\Models\Permission;

class AdminController extends Controller
{
    public function indexWithoutPagination()
    {
        $admins = User::where('user_type', 'admin')->when(request()->keyword, function ($query) {
            $query->where(function ($query) {
                $query->where('full_name', 'LIKE', '%' . request()->keyword . '%')
                    ->orWhere('phone', 'LIKE', '%' . request()->keyword . '%')
                    ->orWhere('email', 'LIKE', '%' . request()->keyword . '%');
            });
        })->latest()->get();

        return AdminIndexResource::collection($admins)->additional(['status' => 'success', 'message' => '']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $admins = User::where('user_type', 'admin')

            ->when(request()->keyword, function ($query) {
                $query->where(function ($query) {
                    $query->where('full_name', 'LIKE', '%' . request()->keyword . '%')
                        ->orWhere('phone', 'LIKE', '%' . request()->keyword . '%')
                        ->orWhere('email', 'LIKE', '%' . request()->keyword . '%');
                });
            })->when(request()->role_id, function ($query) {

                $query->where('role_id', request()->role_id);
            })->when(request()->status != null, function ($query) {

                $query->where('is_admin_active_user', request()->status);
            })->latest()->paginate(25);

        return AdminIndexResource::collection($admins)->additional(['status' => 'success', 'message' => '']);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(AdminRequest $request)
    {
        $admin = User::create($request->all() + ['is_admin_active_user' => 1, 'user_type' => 'admin']);
        return AdminResource::make($admin->load('country'))->additional(['status' => 'success', 'message' => '']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $admin = User::with('country')->where('user_type', 'admin')->findOrFail($id);
        return AdminResource::make($admin)->additional(['status' => 'success', 'message' => '']);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(AdminRequest $request, $id)
    {
        $admin = User::where('user_type', 'admin')->findOrFail($id);
        $admin->update($request->all());

        return AdminResource::make($admin->load('country'))->additional(['status' => 'success', 'message' => '']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $admin = User::where('user_type', 'admin')->findOrFail($id);

        if ($admin->delete()) {
            return response()->json(['status' => 'success', 'data' => null, 'message' => trans('Deleted successfully')]);
        }
    }

    public function toggleActive($id)
    {
        $admin = User::where('user_type', 'admin')->findOrFail($id);
        $admin->update(['is_admin_active_user' => !$admin->is_admin_active_user]);
        return AdminResource::make($admin->fresh()->load('country'))->additional(['status' => 'success', 'message' => '']);
    }

    public function getMyPermissions()
    {
        $user = auth('api')->user();
        $lang = app()->getLocale();
        if ($user->user_type == 'super_admin') {
            $permissions =  Permission::get();
            $count       = $permissions->count();
        } else {
            $permissions =  $user->role ? $user->role?->permissions()->get() : [];
            $count       = $user->role ? $user->role?->permissions()->count() : 0;
        }
        if ($count > 0) {
            // Group permissions by module (e.g., 'countries') and map the actions
            $groupedPermissions = $permissions->groupBy(function ($permission) {
                // Assuming permissions follow the pattern like 'countries.index', 'countries.store', etc.
                $parts = explode('.', $permission->back_route_name);
                return $parts[0]; // Return the module name ('countries' in this case)
            })->map(function ($actions) {
                return $actions->map(function ($permission) {
                    $parts = explode('.', $permission->back_route_name);
                    return $parts[1]; // Return the action (like 'index', 'store', etc.)
                    // return  $permission->back_route_name;
                })->unique()->values(); // Ensure unique actions and reindex the array
            });
            // Example response
            $response = $groupedPermissions->toArray();
        } else {
            $response = [];
        }
        // If you need to return the response in a specific format, you can return it like this:
        // return response()->json([
        //     'permissions' => $response
        // ]);
        return response()->json([
            "status"  => "success",
            "data"    => $response,
            "message" => ""
        ]);
    }
}
