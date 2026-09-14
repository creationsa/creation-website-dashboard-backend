<?php

use Illuminate\Support\Facades\Route;

Route::namespace('General')->middleware('setLocale')->group(function () {
    Route::post('attachments', 'AttachmentController@store');
    Route::delete('attachments/{id}', 'AttachmentController@destroy')->middleware('auth:api');
    Route::get('countries', 'GeneralController@countries');
    Route::get('cities', 'GeneralController@cities');
    Route::get('governrates', 'GeneralController@governrates');
    Route::get('regions', 'GeneralController@regions');
    Route::get('settings', 'GeneralController@settings');
    Route::get('cancel-reasons', 'GeneralController@cancelReasons');
    Route::get('sizes', 'GeneralController@sizes');

    // Route::get('send', function () {
    //     $user = auth('api')->user();
    //     $user->notify(new App\Notifications\Api\App\GiftNotification(1, 100, ['database', 'fcm']));
    //     return response()->json(['status' => 'success', 'message' => 'Notification sent successfully']);
    // });

    Route::get('go-login', 'GeneralController@goLogin')->name('go-login');
});
