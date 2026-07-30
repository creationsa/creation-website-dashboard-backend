<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Dashboard\Admin\EventCategoriesController;

Route::namespace('Dashboard\Admin')->middleware('setLocale')->group(function () {
    Route::namespace('Auth')->group(function () {
        Route::post('login', 'AuthController@login');
        Route::post('verify', 'AuthController@verify');
        Route::post('send-code', 'AuthController@sendCode');
    });


    Route::group(['middleware' => ['auth:api', 'CustomPermission']], function () {

        Route::namespace('Auth')->group(function () {
            Route::post('logout', 'AuthController@logout');
        });

        Route::namespace('Category')->group(function () {
            Route::get('event-categories/without-pagination', 'CategoryController@indexWithoutPagination');
            Route::get('event-categories', 'CategoryController@index');
            Route::get('event-categories/{id}', 'CategoryController@show');
            Route::post('event-categories', 'CategoryController@store');
            Route::put('event-categories/{id}', 'CategoryController@update');
            Route::delete('event-categories/{id}', 'CategoryController@deleteCategory');
        });

        Route::namespace('SubscriptionPlan')->group(function () {
            Route::apiResource('subscription-plans', 'SubscriptionPlanController');
            Route::get('subscription-plans-without-pagination', 'SubscriptionPlanController@indexWithoutPagination');
            Route::get('subscriptions', 'SubscriptionController@index');
            Route::get('export-orders', 'SubscriptionController@export');
        });

        Route::namespace('Faq')->group(function () {
            Route::apiResource('faqs', 'FaqController');
        });


        Route::namespace('Subcategory')->group(function () {
            Route::apiResource('subcategories', 'SubcategoryController');
            Route::get('subcategories/without-pagination/{category_id}', 'SubcategoryController@indexWithoutPagination');
        });

        Route::namespace('Home')->group(function () {
            Route::get('home', 'HomeController@home');
            Route::post('update-home', 'HomeController@updateHome');
            Route::delete('delete-slider', 'HomeController@deleteSlider');
        }); 

        Route::namespace('Coupon')->group(function () {
            Route::apiResource('coupons', 'CouponController');
        });

        Route::namespace('ChooseUs')->group(function () {
            Route::apiResource('choose-us', 'ChooseUsController');
        });

        Route::namespace('EmailSubscribtion')->group(function () {
            Route::get('email-subscribtions', 'EmailSubscribtionController@index');
            Route::get('export-emails', 'EmailSubscribtionController@export');
        });

        Route::namespace('Statistic')->group(function () {
            Route::get('statistics', 'StatisticController@index');
        });

        Route::namespace('TermsAndConditions')->group(function () {
            Route::apiResource('terms-and-conditions', 'TermsAndConditionsController');
        });

        Route::namespace('Privacy')->group(function () {
            Route::apiResource('privacy-policy', 'PrivacyController');
        });

        Route::namespace('EventDetail')->group(function () {
            Route::get('event-details', 'EventDetailController@index');
        });

        Route::namespace('Template')->group(function () {
            Route::post('templates', 'TemplateController@store');
            Route::get('templates', 'TemplateController@index');
            Route::get('templates/{id}', 'TemplateController@show');
            Route::put('templates/{id}', 'TemplateController@update');
            Route::delete('templates/{id}', 'TemplateController@destroy');
            Route::get('parent-templates', 'TemplateController@parentTemplates');
            Route::post('templates/edit-ordering', 'TemplateController@editOrdering');
        });

        Route::namespace('Profile')->group(function () {
            Route::get('profile', 'ProfileController@profile');
            Route::put('profile/update', 'ProfileController@updateProfile');
        });

        Route::namespace('Country')->group(function () {

            Route::apiResource('countries', 'CountryController');
            Route::get('countries_without_pagination', 'CountryController@indexWithoutPagination');
            Route::get('get-countries-names', 'CountryController@get_countries_names');

            Route::get('countries/{country}/cities', 'CountryController@getCities');
            Route::get('countries/{country}/cities_without_pagination', 'CountryController@getCitiesByCountryWithoutPagination');
        });

        Route::namespace('City')->group(function () {
            Route::apiResource('cities', 'CityController');
            Route::get('cities_without_pagination', 'CityController@getCitiesWithoutPagination');
            Route::get('get-cities-names', 'CityController@get_cities_names');
        });

        Route::namespace('InvitationAssets')->group(function () {
            Route::get('invitation_assets', 'InvitationAssetsController@index');
            Route::post('invitation_assets', 'InvitationAssetsController@createAsset');
            Route::post('second_assets', 'InvitationAssetsController@createSecondAsset');
            Route::post('create_font', 'InvitationAssetsController@createFont');
            Route::post('create_page_style', 'InvitationAssetsController@createPageStyle');
            Route::delete('invitation_assets/{id}', 'InvitationAssetsController@destroy');

            Route::post('upload-logos', 'InvitationAssetsController@uploadLogo');
            Route::get('get-logos', 'InvitationAssetsController@getLogos');
            Route::delete('delete-logos/{id}', 'InvitationAssetsController@deleteLogo');
        });

        Route::namespace('Admin')->group(function () {
            Route::apiResource('admins', 'AdminController');
            Route::get('admins-without-paginated', 'AdminController@indexWithoutPagination');
            Route::patch('admins/{admin_id}/toggle-active-user', 'AdminController@toggleActive');

            //Route::get('admin_side_bar', 'AdminController@sideBar');
            Route::get('get_my_permissions', 'AdminController@getMyPermissions')->name('dashboard.admin.get_my_permissions');
            //Route::get('get_my_control_permissions', 'AdminController@getMyControlPermissions');
        });

        Route::namespace('User')->group(function () {
            Route::apiResource('users', 'UserController');
            Route::get('users-without-paginated', 'UserController@indexWithoutPagination');
            Route::patch('users/{user_id}/toggle-active-user', 'UserController@toggleActive');
            Route::patch('users/{user_id}/toggle-ban-user', 'UserController@toggleBan');

            Route::get('users-names', 'UserController@users_names');

        });

        Route::namespace('Contact')->group(function () {
            Route::post('contacts/{contact}/reply', 'ContactController@contact_reply');
            Route::apiResource('contacts', 'ContactController')->except(['store', 'update']);
        });

        Route::namespace('Setting')->group(function () {
            Route::apiResource('settings', 'SettingController')->only(['index', 'store']);
        });

        Route::namespace('Role')->group(function () {
            Route::apiResource('roles', 'RoleController');
            Route::get('role_not_paginated', 'RoleController@indexNotPaginated');
            Route::get('role-names', 'RoleController@role_names');
        });

        Route::namespace('Permission')->group(function () {
            Route::apiResource('permissions', 'PermissionController');
            Route::get('permission_not_paginated', 'PermissionController@indexNotPaginated');
            Route::post('update-all-permissions', 'PermissionController@update_all_permissions');
        });

        Route::namespace('Notification')->group(function () {
            Route::get('unread-notification-count', 'NotificationController@unreadNotificationCount');
            Route::apiResource('notifications', 'NotificationController')->except('update');
        });

        Route::namespace('Page')->group(function () {
            Route::apiResource('pages', 'PageController');
            Route::get('pages_without_pagination', 'PageController@getPagesWithoutPagination');
        });

    });
});
