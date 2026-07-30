<?php

namespace App\Http\Controllers\Api\Dashboard\Admin\Admin;

use App\Models\User;
use Illuminate\Http\Request;
// use App\Models\{PermissionLabel, PermissionCategory};
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Dashboard\Admin\Admin\AdminRequest;
use App\Http\Resources\Api\Dashboard\Admin\Admin\{AdminIndexResource, AdminResource, PermissionResource, Sidebare};
use App\Models\Permission;
use App\Models\PermissionCategory;
use App\Models\PermissionLabel;

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
        $admins = User::where('user_type', 'admin')->when(request()->keyword, function ($query) {
            $query->where(function ($query) {
                $query->where('full_name', 'LIKE', '%' . request()->keyword . '%')
                    ->orWhere('phone', 'LIKE', '%' . request()->keyword . '%')
                    ->orWhere('email', 'LIKE', '%' . request()->keyword . '%');
            });
        })->when(request()->role_id, function ($query) {

            $query->where('role_id',request()->role_id);

        })->when(request()->status != null, function ($query) {

            $query->where('is_admin_active_user',request()->status);

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
        $admin = User::create($request->all() + ['is_admin_active_user' => 1]);
        return AdminResource::make($admin->load('country'))->additional(['status' => 'success', 'message' => 'created successfully']);
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
        $admin->update($request->validated());

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
            return response()->json(['status' => 'success', 'data' => null, 'message' => trans('dashboard/admin.actions.deleted_successfully')]);
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

        if($user->user_type == 'supper_admin') {
            $permissions  =  Permission::get();
        } else {
            $permissions  =  $user->role ? $user->role?->permissions()->get() : [];
        }

        if ($user->role) {
            return PermissionResource::collection($permissions)->additional([
                "status"  => "success",
                "message" => ""
            ]);
        }
        return response()->json([
            "status"  => "success",
            "data"    => [],
            "message" => ""
            // "status"  => "fail",
            // "data"    => null,
            // "message" => $lang == 'en' ? 'You Not have any permissions' : 'لا تمتلك اي صلاحيات'
        ]);
    }



    /* *************************************************************************************************************************** */

    // public function sideBar()
    // {
    //     $user = auth('api')->user();
    //     $data = [];

    //     $permissions =  $user->role?->permissions?->pluck("id");

    //     $permission_categories_ids = array_values($user->role?->permissions?->pluck("permission_category_id")->toArray() ?? []);

    //     $permission_lables_based_on_categories = PermissionCategory::whereIn("id", $permission_categories_ids)->distinct()->get()->pluck("permission_label_id");

    //     $permission_labels = PermissionLabel::whereIn("id", $permission_lables_based_on_categories)->distinct()->get()->pluck("id");

    //     $permission_labels_data = PermissionLabel::whereIn("id", $permission_labels)->distinct()->get();

    //     foreach ($permission_labels_data as $permission_label) {
    //         $categories = PermissionCategory::where("permission_label_id", $permission_label->id)
    //             ->whereIn("id", $permission_categories_ids)
    //             ->get();
    //         $ids = [];
    //         foreach ($categories as $category) {
    //             $ids[] =   $category->id;
    //         }
    //         $data[] = [
    //             "label" => $permission_label->name,
    //             "icon" => $permission_label->icon,

    //             "categories" => Sidebare::collection($categories)
    //         ];
    //     }

    //     return $data;
    // }


    // private function items($items)
    // {
    //     $items_data = [];

    //     foreach ($items as $item) {
    //         // dump($item->id , $item->permission_category_id) ;
    //         $items_data[] = [
    //             'id'        => $item->id,
    //             "url"  => $item->front_route_name,
    //             "back_route" => $item->back_route_name,
    //             "title"  =>  $item->title
    //         ];
    //     }
    //     return  $items_data;
    // }


    // private function categories($categories, $user)
    // {

    //     foreach ($categories as $category) {
    //         // dump($category) ;
    //         $items = $user->role->permissions()->where("permission_category_id", $category->id)
    //             ->where("show_in_side_bar", 1)
    //             ->get();

    //         $categories_data = [
    //             "title" =>  $category->name,
    //             "items"  => $this->items($items)
    //         ];
    //     }
    //     // dump($categories_data) ;
    //     return $categories_data;
    // }

   

    // public function getMyControlPermissions()
    // {
    //     $user = auth('api')->user();
    //     $permissions = $user->role?->permissions()->where("is_control_permission", true)->get();
    //     if ($user->role) {
    //         return PermissionResource::collection($permissions)->additional([
    //             "status"  => "success",
    //             "message" => ""
    //         ]);
    //     }
    //     return response()->json([
    //         "status"  => "fail",
    //         "data"    => null,
    //         "message" => ""
    //     ], 422);
    // }


}
