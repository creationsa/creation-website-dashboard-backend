<?php

use Illuminate\Support\Facades\Route;
use App\Models\AppMedia;

Route::namespace('General')->middleware('setLocale')->group(function () {
    Route::post('attachments', 'AttachmentController@store');
    Route::delete('attachments/{id}', 'AttachmentController@destroy')->middleware('auth:api');
    Route::get('countries', 'GeneralController@countries');
    Route::get('cities', 'GeneralController@cities');
    Route::get('faqs', 'GeneralController@faqs');
    Route::get('sitemap', 'SitemapController');
    Route::post('event-details', 'GeneralController@eventDetails');
});
