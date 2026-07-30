<?php

use App\Models\Permission;
use App\Models\PermissionTranslation;
use App\Models\Role;
use Illuminate\Support\Facades\Route;


// Route::group(
// [
// 	'prefix' => LaravelLocalization::setLocale(),
// 	'middleware' => [ 'localeSessionRedirect', 'localizationRedirect', 'localeViewPath' ]
// ], function(){


// 		// Dashboard (Has Role)
// 		Route::get('dashboard/login', "Auth\LoginController@showLoginForm")->name("dashboard.login");
// 		Route::post('dashboard/login', "Auth\LoginController@login")->name("dashboard.post_login");


// 		// For All
// 		Route::get('activate/{confirmationCode}', 'Auth\LoginController@confirm')->name('confirmation_path');
// 		Route::post('setPassword', "Auth\LoginController@storePassword")->name('setPassword');
// 		Route::get('password/reset', 'Auth\ForgotPasswordController@showLinkRequestForm')->name('forget');
// 		Route::post('password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail')->name('email');
// 		Route::get('password/reset/{token}', 'Auth\ResetPasswordController@showResetForm')->name('password.reset');
// 		Route::post('password/reset', 'Auth\ResetPasswordController@reset')->name('resetToNew');

// 		Route::middleware('auth')->group(function () {
// 			Route::post('logout',"Auth\LoginController@logout")->name('logout');
// 		});
// 		Route::view('/',"site.index")->name('site.home');
// 		// Route::view('terms',"site.terms")->name('site.terms');

// });




Route::get('routes', function () {


    $routesNamesList = array();

    $routeCollection = Route::getRoutes();

    // echo "<table style='width:100%'>";
    // echo "<tr>";
    // echo "<td width='10%'><h4>HTTP Method</h4></td>";
    // echo "<td width='10%'><h4>Route</h4></td>";
    // echo "<td width='10%'><h4>Name</h4></td>";
    // echo "<td width='70%'><h4>Corresponding Action</h4></td>";
    // echo "</tr>";

    foreach ($routeCollection as $value) {

        $routeName = $value->getName();

        if($routeName && ! startsWith($routeName, "ignition")) {
            $routesNamesList[] = $routeName;
        }

        // echo "<tr>";
        // echo "<td>" . $value->methods()[0] . "</td>";
        // echo "<td>" . $value->uri() . "</td>";
        // echo "<td>" . $value->getName() . "</td>";
        // //echo "<td>" . $value->getActionName() . "</td>";
        // echo "</tr>";
        
    }

    // echo "</table>";

    // dd($routesNamesList);

    Permission::where('id','>',0)->delete();
    PermissionTranslation::where('id','>',0)->delete();

    foreach ($routesNamesList as $perm) {

        $permission_row = Permission::firstOrCreate([
            'back_route_name' => $perm,
        ])->id;

        foreach(config('translatable.locales') as $locale)
        {
            PermissionTranslation::Create([
                'title' => ucfirst($perm),
                'locale' => $locale,
                'permission_id' => $permission_row,
            ]);
        }
    }


    // $permission_ids = Permission::pluck('id')->toArray();

    // $role = Role::create(['en' => ['name' => 'admin'],'ar' => ['name' => 'admin']]);
        
    // $role->permissions()->attach($permission_ids);

    // dd($routesNamesList,$permission_ids);


});