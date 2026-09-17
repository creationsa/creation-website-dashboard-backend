<?php

use Illuminate\Support\Facades\Route;

Route::namespace('General')->middleware('setLocale')->group(function () {
    Route::post('attachments', 'AttachmentController@store');
    Route::delete('attachments/{id}', 'AttachmentController@destroy')->middleware('auth:api');
    Route::get('countries', 'GeneralController@countries');
    Route::get('cities', 'GeneralController@cities');
    Route::get('settings', 'GeneralController@settings');
    Route::get('go-login', 'GeneralController@goLogin')->name('go-login');
});
