<?php

use Illuminate\Support\Facades\Route;
use Termwind\Components\Raw;

Route::namespace('Dashboard\Admin')->middleware('setLocale')->group(function () {
    Route::namespace('Auth')->group(function () {
        Route::post('login', 'AuthController@login');
    });


    
    Route::group(['middleware' => ['auth:api', 'CustomPermission']], function () {

        Route::namespace('Auth')->group(function () {
            Route::post('logout', 'AuthController@logout');
        });

        Route::namespace('Profile')->group(function () {
            Route::get('profile', 'ProfileController@profile');
            Route::put('profile/update', 'ProfileController@updateProfile');
        });

        Route::namespace('Statistics')->group(function () {
            Route::get('statistics', 'StatisticsController@index')->name('statistics.index');
        });

        Route::namespace('Blog')->group(function () {
            // Must be registered before the apiResource below, otherwise
            // its `blogs/{blog}` show route swallows this path.
            Route::get('blogs/picker', 'BlogController@picker');
            Route::apiResource('blogs', 'BlogController');
        });

        Route::namespace('BlogsMainData')->group(function () {
            Route::get('blogsMainData', 'BlogsMainDataController@index')->name('blogsMainData.index');
            Route::match(['put', 'post'], 'blogsMainData', 'BlogsMainDataController@update')->name('blogsMainData.store');
        });

        Route::namespace('PageBuilder')->group(function () {
            Route::apiResource('page', 'BuilderPageController');
        });

        Route::namespace('Metadata')->group(function () {
            Route::apiResource('metadata', 'MetadataController');
        });

        Route::namespace('Setting')->group(function () {
            Route::get('settings', 'SettingController@index')->name('settings.index');
            Route::match(['put', 'post'], 'settings', 'SettingController@update')->name('settings.store');
        });

        Route::namespace('Project')->group(function () {
            // Must be registered before the apiResource below, otherwise
            // its `allProjects/{allProject}` show route swallows this path.
            Route::get('allProjects/picker', 'ProjectController@picker');
            Route::apiResource('allProjects', 'ProjectController');
        });

        Route::namespace('ProjectsMainData')->group(function () {
            Route::get('projects', 'ProjectsMainDataController@index')->name('projects.index');
            Route::match(['put', 'post'], 'projects', 'ProjectsMainDataController@update')->name('projects.store');
        });

        Route::namespace('Solution')->group(function () {
            // Must be registered before the apiResource below, otherwise
            // its `allSolutions/{allSolution}` show route swallows this path.
            Route::get('allSolutions/picker', 'SolutionController@picker');
            Route::apiResource('allSolutions', 'SolutionController');
        });

        Route::namespace('SolutionsMainData')->group(function () {
            Route::get('solutions', 'SolutionsMainDataController@index')->name('solutions.index');
            Route::match(['put', 'post'], 'solutions', 'SolutionsMainDataController@update')->name('solutions.store');
        });

        Route::namespace('MenuOptions')->group(function () {
            Route::get('menu-options', 'MenuOptionsController@index');
        });

        Route::namespace('Footer')->group(function () {
            Route::get('footer', 'FooterController@index')->name('footer.index');
            Route::match(['put', 'post'], 'footer', 'FooterController@update')->name('footer.store');
        });

        Route::namespace('Header')->group(function () {
            Route::get('header', 'HeaderController@index')->name('header.index');
            Route::match(['put', 'post'], 'header', 'HeaderController@update')->name('header.store');
        });

        Route::namespace('Client')->group(function () {
            Route::get('clients', 'ClientController@index')->name('clients.index');
            Route::match(['put', 'post'], 'clients', 'ClientController@update')->name('clients.store');
        });

        Route::namespace('Country')->group(function () {

            Route::apiResource('countries', 'CountryController');
            Route::get('countries_without_pagination', 'CountryController@indexWithoutPagination');
            // Route::get('get-countries-names', 'CountryController@get_countries_names');

            Route::get('countries/{country}/cities', 'CountryController@getCities');
            Route::get('countries/{country}/cities_without_pagination', 'CountryController@getCitiesByCountryWithoutPagination');
            Route::patch('countries/{country_id}/toggle-active-country', 'CountryController@toggleActive')->name('countries.toggle_active');
            Route::get('export-countries', 'CountryController@export')->name('countries.export');
        });


        Route::namespace('Static')->group(function () {
            Route::apiResource('faqs', 'FaqController');
        });

        Route::namespace('City')->group(function () {
            Route::apiResource('cities', 'CityController');
            Route::get('cities_without_pagination', 'CityController@getCitiesWithoutPagination');
            // Route::get('get-cities-names', 'CityController@get_cities_names');
            Route::patch('cities/{city_id}/toggle-active-city', 'CityController@toggleActive')->name('cities.toggle_active');
            Route::get('export-cities', 'CityController@export')->name('cities.export');
        });

        

        Route::namespace('Admin')->group(function () {
            Route::apiResource('admins', 'AdminController');
            Route::get('admins-without-paginated', 'AdminController@indexWithoutPagination');
            Route::patch('admins/{admin_id}/toggle-active-user', 'AdminController@toggleActive')->name('admins.toggle_active');

            //Route::get('admin_side_bar', 'AdminController@sideBar');
            Route::get('get_my_permissions', 'AdminController@getMyPermissions')->name('admins.get_my_permissions');
            //Route::get('get_my_control_permissions', 'AdminController@getMyControlPermissions');
            Route::get('export-admins', 'AdminController@export')->name('admins.export');
        });

        Route::namespace('User')->group(function () {
            Route::apiResource('users', 'UserController');
            Route::get('users-without-paginated', 'UserController@indexWithoutPagination');
            Route::patch('users/{user_id}/toggle-active-user', 'UserController@toggleActive')->name('users.toggle_active');
            Route::patch('users/{user_id}/toggle-ban-user', 'UserController@toggleBan')->name('users.toggle_ban');
            // Route::post('users/{id}/change-status', 'UserController@changeStatus')->name('users.change_status');

            // Route::get('users-names', 'UserController@users_names');

            Route::get('export-users', 'UserController@export')->name('users.export')->withoutMiddleware('auth:api');
        });

        Route::namespace('Contact')->group(function () {
            Route::post('contacts/{contact}/reply', 'ContactController@contact_reply')->name('contacts.reply');
            Route::apiResource('contacts', 'ContactController')->only(['index', 'show', 'destroy']);
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
            Route::get('sent-notifications', 'NotificationController@sentNotifications');
            Route::apiResource('notifications', 'NotificationController')->except('update');
            Route::delete('delete-all-notifications', 'NotificationController@deleteAllNotifications')->name('notifications.delete_all');
        });


    });
});
