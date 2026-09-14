<?php

use Illuminate\Support\Facades\Route;

Route::namespace('Website')->middleware('setLocale')->group(function () {
    Route::namespace('Contact')->group(function () {
        Route::post('contact-us', 'ContactController@contact');
    });

    Route::namespace('About')->group(function () {
        Route::get('about', 'AboutController@get');
    });

    Route::namespace('Header')->group(function () {
        Route::get('header', 'HeaderController@get');
    });

    Route::namespace('Footer')->group(function () {
        Route::get('footer', 'FooterController@get');
    });

    Route::namespace('Blog')->group(function () {
        Route::get('blogs', 'BlogController@index');
        Route::get('blogs/slugs', 'BlogController@slugs');
        Route::get('blogs/{slug}', 'BlogController@show');
        Route::get('seo-blog', 'BlogController@seoBlog');
        Route::get('home-blogs', 'BlogController@getHomeBlogs');
    });

    Route::namespace('Metadata')->group(function () {
        Route::get('metadata/{for}', 'MetadataController@get');
    });

    Route::namespace('Client')->group(function () {
        Route::get('clients', 'ClientController@get');
    });

    Route::namespace('PageBuilder')->group(function () {
        Route::get('home-blogs-teaser', 'BuilderPageController@homeBlogsTeaser');
        Route::get('page-builder/slugs', 'BuilderPageController@slugs');
        Route::get('page-builder/{slug}', 'BuilderPageController@show');
    });

    Route::namespace('Project')->group(function () {
        Route::get('projects-main-data', 'ProjectController@mainData');
        Route::get('projects', 'ProjectController@index');
        Route::get('projects/slugs', 'ProjectController@slugs');
        Route::get('projects/{slug}', 'ProjectController@show');
    });

    Route::namespace('Solution')->group(function () {
        Route::get('solutions-main-data', 'SolutionController@mainData');
        Route::get('solutions', 'SolutionController@index');
        Route::get('solutions/slugs', 'SolutionController@slugs');
        Route::get('solutions/{slug}', 'SolutionController@show');
    });
});
