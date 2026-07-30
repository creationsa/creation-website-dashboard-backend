<?php

use App\Models\User;
use Google\Service\Gmail;
use App\Models\UserTemplate;
use Illuminate\Http\Request;
use App\Services\GmailService;
use Google\Service\Gmail\Message;
use Google\Client as GoogleClient;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Api\Website\GmailController;

Route::namespace('Website')->middleware('setLocale')->group(function () {

    // Route::post('test',function(){
    //     UserTemplate::whereHas('invitationGuests',function($q){
    //         $q->where('status' ,'Sent');
    //     })->update(['type' => 'sent']);
    // });
    Route::get('hash_code',function (){
        $users = User::all();
        foreach($users as $user){
            $user->update(['hash_code' => generate_unique_code(8, '\\App\\Models\\User', 'hash_code', 'letters')]);
        }
    });
    Route::namespace('Contact')->group(function () {
        Route::post('contact-us', 'ContactController@contact');
    });

    Route::namespace('About')->group(function () {
        Route::get('about', 'AboutController@get');
    });

    Route::namespace('Metadata')->group(function () {
        Route::get('metadata/{for}', 'MetadataController@get');
    });

    Route::namespace('Category')->group(function () {
        Route::get('event-categories', 'CategoryController@index');
    });

    Route::namespace('Templates')->group(function () {
        Route::get('templates', 'TemplateController@index');
        Route::get('templates-without-pagination', 'TemplateController@indexWithoutPagination');
        Route::get('templates/{id}', 'TemplateController@show');
        Route::post('templates/{id}/toggle-favorite', 'TemplateController@toggleFavorite')->middleware('auth:api');
        Route::get('favorites', 'TemplateController@getFavorite')->middleware('auth:api');
    });

    Route::namespace('TermsAndConditions')->group(function () {
        Route::get('terms-and-conditions', 'TermsAndConditionsController@index');
        Route::get('terms-and-conditions/{id}', 'TermsAndConditionsController@show');
    });


    Route::namespace('Privacy')->group(function () {
        Route::get('privacy-policy', 'PrivacyController@index');
        Route::get('privacy-policy/{id}', 'PrivacyController@show');
    });

    Route::namespace('Auth')->group(function () {

        Route::post('register', 'RegisterController@register');
        Route::post('check-code', 'RegisterController@checkCode');
        Route::post('verify', 'RegisterController@verify');
        Route::post('send-code', 'RegisterController@sendCode');
        Route::post('edit-email', "RegisterController@editEmail");
        Route::post('social_login', "SocialLoginController@social");

        Route::post('login', 'AuthController@login');
        Route::post('guest', 'AuthController@guest');

        Route::prefix('forgot-password')->group(function () {
            Route::post('/', "AuthController@forgotPassword");
            Route::post('check-code', 'AuthController@checkCode');
            Route::post('reset-password', "AuthController@resetPassword");
        });

        Route::middleware(['auth:api', 'one_session:sing_out_other_session'])->group(function () {
            Route::get('user', 'AuthController@getUserInfo');
            Route::post('logout', 'AuthController@logout');
            Route::post('update-fcm', 'AuthController@updateFcm');
        });
    });

    Route::namespace('Asset')->group(function () {
        Route::get('invitation_assets', 'AssetController@index');
    });

    Route::namespace('UserTemplate')->group(function () {
        Route::get('user-templates/{id}', 'UserTemplateController@show');
        Route::get('get-user-template-by-token', 'UserTemplateController@getUserTemplateByToken');
    });

    Route::namespace('InvitationGuests')->group(function () {
        Route::post('invitation-guests', 'InvitationGuestsController@store');
        Route::post('invitation-guests/submit-attendance', 'InvitationGuestsController@submitAttendance');
        Route::post('scan', 'InvitationGuestsController@scan');
        Route::get('export_guests', 'InvitationGuestsController@exportEmptyGuests');
        Route::get('export_all_guests/{id}', 'InvitationGuestsController@exportGuests');
        Route::get('landing-guests/{code}', 'InvitationGuestsController@guestsForEditor');
        Route::get('accept-invitation', 'InvitationGuestsController@acceptInvitationForWhatsapp');
        Route::get('reject-invitation', 'InvitationGuestsController@rejectInvitationForWhatsapp');
    });


    Route::namespace('Home')->group(function () {
        Route::get('home', 'HomeController@home');
        Route::post('email-subscribtion', 'HomeController@emailSubscribtion');
    });
    
    Route::middleware(['auth:api'])->group(function () {
        Route::namespace('Profile')->prefix('profile')->group(function () {
            Route::get('/', 'ProfileController@profile');
            
            Route::put('update', 'ProfileController@updateProfile');
            Route::patch('update-password', 'ProfileController@updatePassword');
            Route::post('edit-email', 'ProfileController@updateEmail');
            Route::post('verify-email', 'ProfileController@verifyEmail');
            Route::post('check-code', 'ProfileController@checkCode');
            Route::patch('update-phone', 'ProfileController@updatePhone');
            Route::patch('change-language', 'ProfileController@changeLanguage');
            Route::patch('toggle-notification', 'ProfileController@toggleNotification');
            Route::put('medical-file', 'ProfileController@medicalFile');
            Route::delete('/', 'ProfileController@deleteAccount');
            
            Route::patch('fcm_update', 'ProfileController@updateFcm');
        });
        
        Route::namespace('Cohost')->group(function () {
            Route::apiResource('cohosts', 'CohostController');
            Route::get('received-templates', 'CohostController@receivedTemplates');
            Route::get('cohost-requests', 'CohostController@cohostRequests');
            Route::post('cohosts/change-status/{id}', 'CohostController@changeStatus');
            Route::get('cohosts-without-paginate', 'CohostController@cohostWithoutPaginate');
            Route::post('cohosts-send-points', 'CohostController@sendPoints');

        });

        

        Route::namespace('UserTemplate')->group(function () {
            Route::get('user-templates', 'UserTemplateController@index');
            // Route::get('user-templates/{id}', 'UserTemplateController@show');
            Route::post('user-templates', 'UserTemplateController@store');
            Route::post('user-templates/{id}', 'UserTemplateController@update')->name('user_templates.update');
            Route::get('history/{id}', 'UserTemplateController@history');
            Route::post('upload-logos', 'UserTemplateController@uploadLogo');
            Route::get('get-logos', 'UserTemplateController@getLogos');
            Route::delete('delete-logos/{id}', 'UserTemplateController@deleteLogo');
            Route::get('event-settings/{id}', 'UserTemplateController@settings');
            Route::post('update-event-settings/{id}', 'UserTemplateController@updateSettings');
        });

        Route::namespace('InvitationGuests')->group(function () {
        //    Route::post('invitation-guests', 'InvitationGuestsController@store');
            Route::get('invitation-guests', 'InvitationGuestsController@index');
            Route::get('invitation-guests-by-cohost/{user_template_id}', 'InvitationGuestsController@getGuestsByCohost');
            Route::post('invitation-guests/attendance', 'InvitationGuestsController@updateAttendance');
            Route::get('invitation-guests/attendance/{id}', 'InvitationGuestsController@getAttendance')->withoutMiddleware(['auth:api']);
            // Route::post('invitation-guests/submit-attendance', 'InvitationGuestsController@submitAttendance');
            
            Route::get('invitation-guests/statistics/{id}', 'InvitationGuestsController@statistics');
            Route::get('tracking/{id}', 'InvitationGuestsController@tracking');
            Route::post('send-invitation/{user_template_id}', 'InvitationGuestsController@sendInvetation');
            Route::post('add_guest', 'InvitationGuestsController@addGuest');
            Route::post('schedule_guests/{id}', 'InvitationGuestsController@sendSchedule');
            Route::post('cancel_attendance/{id}', 'InvitationGuestsController@cancelAttendance');
            Route::put('update_guest/{id}', 'InvitationGuestsController@updateGuest');
            Route::delete('delete_guest/{id}', 'InvitationGuestsController@destroy');
            Route::delete('delete_pending_guests/{id}', 'InvitationGuestsController@deletePendingGuests');

            Route::post('import_guests/{id}', 'InvitationGuestsController@import');

            // Route::get('history/{id}', 'InvitationGuestsController@history');
        });

        Route::namespace('SubscriptionPlan')->group(function () {
            Route::get('subscription-plans', 'SubscriptionPlanController@index')->withoutMiddleware('auth:api');
            Route::post('subscripe/{id}', 'SubscriptionPlanController@subscripe');
            Route::get('subscripe-checkout/{id}', 'SubscriptionPlanController@checkout');
                
            Route::get('subscriptions', 'SubscriptionController@index');

            Route::post('payment/callback/{plan_id}', 'SubscriptionPlanController@callback')->withoutMiddleware('auth:api');
            Route::get('payment/return/{plan_id}', 'SubscriptionPlanController@return')->withoutMiddleware('auth:api');
            // Route::post('create-payment/{plan_id}', 'PaymentController@createPayment');
        });

        Route::namespace('Notification')->group(function () {
            Route::delete('delete_all_notifications', 'NotificationController@deleteAllNotifications');
            // Route::apiResource('notifications', 'NotificationController')->except(['update', 'store']);
            Route::get('notifications', 'NotificationController@index')->name('website.notifications.index');
            Route::get('notifications/{id}', 'NotificationController@show')->name('website.notifications.show');
            Route::delete('notifications/{id}', 'NotificationController@destroy')->name('website.notifications.destroy');
        }); 
    });

    Route::get('auth', [GmailController::class, 'getClient'])->name('gmail.auth');
    Route::get('/gmail/callback', [GmailController::class, 'handleGoogleCallback'])->name('gmail.callback');
    Route::get('send-email', [GmailController::class, 'sendEmail'])->name('send.email');
});
