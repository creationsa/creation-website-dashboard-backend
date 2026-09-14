<?php

use App\Models\Permission;
use App\Models\PermissionTranslation;
use App\Models\Role;
use Illuminate\Support\Facades\Route;

// Local-dev-only CORS proxy for assets that get read via cross-origin
// fetch() (e.g. the Website's react-inlinesvg inlining the logo SVG so its
// fill/stroke stay themeable via CSS). Deliberately NOT under /storage/:
// `php artisan serve`'s built-in PHP server, for any URI that resolves to a
// real file (which /storage/* always does, via the public/storage symlink),
// sets SCRIPT_NAME to that file's path before the router script even runs —
// this breaks Symfony's path-info parsing and makes Laravel resolve the
// request as "/" regardless of what the router or config/cors.php says, so
// a route matching /storage/{path} can never actually be reached under this
// dev server. Since no real file/symlink exists under /asset-proxy/, that
// quirk never triggers here. Real Apache deployments don't need this at
// all — storage/app/public/.htaccess already gives /storage/* files a CORS
// header directly. Only LogoResolver uses this path; every other upload
// (badges, statement image, etc.) is read via a plain <img src>, which
// doesn't need CORS and keeps using the normal /storage/* URL.
Route::get('/asset-proxy/{path}', function (string $path) {
    $fullPath = storage_path('app/public/'.$path);

    abort_unless(is_file($fullPath), 404);

    return response()->file($fullPath, ['Access-Control-Allow-Origin' => '*']);
})->where('path', '.*');


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