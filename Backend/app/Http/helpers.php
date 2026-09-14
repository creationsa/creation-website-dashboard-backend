<?php

use Illuminate\Support\Str;
use App\Services\SMSService;
use LaravelFCM\Facades\FCM as FCM;
use Illuminate\Support\Facades\Schema;
use LaravelFCM\Message\OptionsBuilder;
use LaravelFCM\Message\PayloadDataBuilder;
use Illuminate\Support\Facades\File as File;
use App\Models\{Device, Permission, Setting};
use Intervention\Image\Facades\Image as Image;
use LaravelFCM\Message\PayloadNotificationBuilder;

function startsWith($string, $startString)
{
    $len = strlen($startString);
    return substr($string, 0, $len) === $startString;
}

function permissions_names()
{
    $all = Permission::pluck('back_route_name')->toArray();

    $permissions_names = [];

    foreach ($all as $item) {
        $arr = explode('.', $item);
        $permissions_names[] = $arr[0];
    }

    $permissions_names = array_unique($permissions_names);

    return $permissions_names;
}

function permissions_names_v2()
{
    $user = auth()->guard('api')->user();

    if ($user->user_type == 'super_admin') {
        $permissionsArr = Permission::pluck('id')->toArray();
    } else {
        $permissionsArr = $user->role ? @$user->role->permissions->pluck('id')->toArray() : [];
    }

    $all = Permission::whereIn('id', $permissionsArr)->pluck('back_route_name')->toArray();

    $permissions_names = [];

    foreach ($all as $item) {
        $arr = explode('.', $item);
        $permissions_names[] = $arr[0];
    }

    $permissions_names = array_unique($permissions_names);
    return $permissions_names;
}

function setting($attr)
{
    if (Schema::hasTable('settings')) {
        $phone = $attr;
        if ($attr == 'phone') {
            $attr = 'phones';
        }
        $setting = Setting::where('key', $attr)->first() ?? [];
        if ($attr == 'project_name') {
            return !empty($setting) ? $setting->value : 'Alamyia';
        }
        if ($attr == 'logo') {
            return !empty($setting) ? asset('storage/images/setting') . "/" . $setting->value : asset('dashboardAssets/images/icons/logo_sm.png');
        }
        if ($phone == 'phone') {
            return !empty($setting) && $setting->value ? json_decode($setting->value)[0] : null;
        } elseif ($phone == 'phones') {
            return !empty($setting) && $setting->value ? implode(",", json_decode($setting->value)) : null;
        }
        if (!empty($setting)) {
            return $setting->value;
        }
        return false;
    }
    return false;
}

// Get Distance
function distance($startLat, $startLng, $endLat, $endLng, $unit = "K")
{
    // $unit = M --> Miles
    // $unit = K --> Kilometers
    // $unit = N --> Nautical Miles

    $startLat = (float) $startLat;
    $startLng = (float) $startLng;
    $endLat = (float) $endLat;
    $endLng = (float) $endLng;

    $theta = $startLng - $endLng;
    $dist = sin(deg2rad($startLat)) * sin(deg2rad($endLat)) + cos(deg2rad($startLat)) * cos(deg2rad($endLat)) * cos(deg2rad($theta));
    $dist = acos($dist);
    $dist = rad2deg($dist);
    $miles = $dist * 60 * 1.1515;
    $unit = strtoupper($unit);

    if ($unit == "K") {
        return ($miles * 1.609344);
    } else if ($unit == "N") {
        return ($miles * 0.8684);
    } else {
        return $miles;
    }
}

function uploadImg($files, $url = 'images', $key = 'image', $width = null, $height = null)
{
    $dist = storage_path('app/public/' . $url . "/");
    if ($url != 'images' && !File::isDirectory(storage_path('app/public/images/' . $url . "/"))) 
    {
        File::makeDirectory(storage_path('app/public' . DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . $url . DIRECTORY_SEPARATOR), 0777, true);
        $dist = storage_path('app/public' . DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . $url . DIRECTORY_SEPARATOR);
    } elseif (File::isDirectory(storage_path('app/public/images/' . $url . "/"))) {
        $dist = storage_path('app/public/images/' . $url . "/");
    }

    $image = "";

    if (!is_array($files)) {
        $dim    = getimagesize($files);
        $width  = $width ?? $dim[0];
        $height = $height ?? $dim[1];
    }

    if (gettype($files) == 'array') {
        $image = [];
        foreach ($files as $img) {
            $dim    = getimagesize($img);
            $width  = $width ?? $dim[0];
            $height = $height ?? $dim[1];

            if ($img && $dim['mime'] != "image/gif") {
                Image::make($img)->resize($width, $height, function ($cons) {
                    $cons->aspectRatio();
                })->save($dist . $img->hashName());
                $image[][$key] = $img->hashName();
            } elseif ($img && $dim['mime'] == "image/gif") {
                $image = uploadGIFImg($img, $dist);
            }
        }
    } elseif ($dim && $dim['mime'] == "image/gif") {
        $image = uploadGIFImg($files, $dist);
    } else {
        Image::make($files)->resize($width, $height, function ($cons) {
            $cons->aspectRatio();
        })->save($dist . $files->hashName());
        $image = $files->hashName();
    }
    return $image;
}

function uploadGIFImg($gif_image, $dist)
{
    $file_name = Str::uuid() . "___" . $gif_image->getClientOriginalName();
    if ($gif_image->move($dist, $file_name)) {
        return $file_name;
    }
}

function uploadFile($files, $url = 'files', $key = 'file', $model = null)
{
    $dist = storage_path('app/public/' . $url);
    if ($url != 'images' && !File::isDirectory(storage_path('app/public/files/' . $url . "/"))) {
        File::makeDirectory(storage_path('app/public' . DIRECTORY_SEPARATOR . 'files' . DIRECTORY_SEPARATOR . $url . DIRECTORY_SEPARATOR), 0777, true);
        $dist = storage_path('app/public' . DIRECTORY_SEPARATOR . 'files' . DIRECTORY_SEPARATOR . $url . DIRECTORY_SEPARATOR);
    } elseif (File::isDirectory(storage_path('app/public/files/' . $url . "/"))) {
        $dist = storage_path('app/public/files/' . $url . "/");
    }
    $file = '';

    if (gettype($files) == 'array') {
        $file = [];
        foreach ($files as $new_file) {
            $file_name = time() . "___file_" . $new_file->getClientOriginalName();
            if ($new_file->move($dist, $file_name)) {
                $file[][$key] = $file_name;
            }
        }
    } else {
        $file = $files;
        $file_name = time() . "___file_" . $file->getClientOriginalName();
        if ($file->move($dist, $file_name)) {
            $file =  $file_name;
        }
    }

    return $file;
}

/**
 * Push Notifications to phone FCM
 *
 * @param  array $fcmData
 * @param  array $userIds
 */
function pushFcmNotes($fcmData, $userIds)
{
    // dd($fcmData);
    $send_process = 0;
    if (is_array($userIds) && !empty($userIds)) {
        // Fetch distinct Android device tokens for given users
        $android_devices = Device::whereIn('user_id', $userIds)
            ->where('type', 'android')
            ->distinct('device_token')
            ->pluck('device_token')
            ->toArray();
        // Fetch distinct iOS device tokens for given users
        $ios_devices = Device::whereIn('user_id', $userIds)
            ->where('type', 'ios')
            ->distinct('device_token')
            ->pluck('device_token')
            ->toArray();
        if (!empty($android_devices)) {
            foreach ($android_devices as $token) {
                $android_payload = [
                    'message' => [
                        'token' => $token,
                        'data'  => stringifyData($fcmData), // Only 'data' for Android
                        'notification'=>[
                                'title' => $fcmData['title'],
                                'body' => $fcmData['body'],
                            ]
                    ]
                ];
                $send_process += send($token, $android_payload);
            }
        }
        if (!empty($ios_devices)) {
            foreach ($ios_devices as $token) {
                $ios_payload = [
                    'message' => [
                        'token' => $token,
                        'notification' => [
                            'title' => $fcmData['title'] ?? "",
                            'body'  => $fcmData['body'] ?? "",
                        ],
                        'data' => stringifyData($fcmData),
                        // 'apns' =>  ['payload' => ['aps' => ['sound' => $fcmData['sound'] ?? 'default']]] // to send sound
                    ]
                ];
                $send_process += send($token, $ios_payload);
            }
        }
        // dd($send_process);
        return $send_process;  // Return total number of successful sends
    }
    return "No Users";  // Return message if no users provided
}
function send($fcm_token, $notification)
{
    $serverKey = getToken();  // Get the OAuth token
    $headers   = [
        'Authorization: Bearer ' . $serverKey,
        'Content-Type: application/json',
    ];
    // Log::channel('single')->info(json_encode($notification));
    // Initialize cURL
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://fcm.googleapis.com/v1/projects/beexepress/messages:send");
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
    curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);  // Temporarily bypass SSL verification
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($notification));
    // Execute post and handle errors
    $result = curl_exec($ch);
    if ($result === FALSE) {
        // Log::error('Curl failed: ' . curl_error($ch));  // Log specific cURL error
        return 0;  // Return failure status
    }
    $responseCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    if ($responseCode != 200) {
        // Log::error('FCM Response Error: ' . $result);  // Log specific FCM error response
        return 0;  // Return failure status
    }
    curl_close($ch);
    return 1;  // Return success status
}
function getToken()
{
    $keyFilePath = storage_path('app/firebase.json');  // Path to Firebase service account file
    $keyData     = json_decode(file_get_contents($keyFilePath), true);
    $header = [
        'alg' => 'RS256',
        'typ' => 'JWT'
    ];
    $now = time();
    $claims = [
        'iss'   => $keyData['client_email'],
        'scope' => 'https://www.googleapis.com/auth/firebase.messaging',
        'aud'   => 'https://oauth2.googleapis.com/token',
        'exp'   => $now + 3600,  // Token valid for 1 hour
        'iat'   => $now
    ];
    $base64UrlHeader = base64UrlEncode(json_encode($header));
    $base64UrlClaims = base64UrlEncode(json_encode($claims));
    $signatureInput  = $base64UrlHeader . '.' . $base64UrlClaims;
    openssl_sign($signatureInput, $signature, $keyData['private_key'], 'sha256WithRSAEncryption');
    $base64UrlSignature = base64UrlEncode($signature);
    $jwt = $signatureInput . '.' . $base64UrlSignature;
    // Make a request to get the access token
    $postFields = http_build_query([
        'grant_type' => 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        'assertion'  => $jwt
    ]);
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://oauth2.googleapis.com/token');
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postFields);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/x-www-form-urlencoded']);
    $response = curl_exec($ch);
    if ($response === FALSE) {
        // Log::error('Curl failed: ' . curl_error($ch));
        return false;
    }
    $responseData = json_decode($response, true);
    curl_close($ch);
    return $responseData['access_token'];
}
function stringifyData($data)
{
    foreach ($data as $key => $value) {
        if (is_array($value)) {
            // Convert arrays/objects to JSON strings
            $data[$key] = json_encode($value);
        } else {
            // Ensure all other values are strings
            $data[$key] = (string) $value;
        }
    }
    return $data;
}
function base64UrlEncode($data)
{
    return str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($data));
}

// HISMS
function send_sms($mobile, $msg)
{
    $sender_name = str_replace(' ', '%20', setting('project_name'));
    $msg         = str_replace(' ', '%20', $msg);
    
    $sender_data = [
        'username'    => setting('sms_username'),
        'password'    => setting('sms_password'),
        'sender_name' => setting('sms_sender_name') ?? $sender_name,
    ];

    $send_data = [
        'message' => $msg,
        'numbers' => $mobile
    ];

    $date_time = [
        'date' => date('Y-m-d'),
        'time' => date("H:i")
    ];

    return SMSService::send($sender_data, $send_data, $date_time, setting('sms_provider'));
}

function validateIfPhoneStartWithZero($phone)
{
    $first_number = substr($phone, 0, 1);
    if ($first_number == '0') {
        $phone = substr($phone, 1);
    }
    return $phone;
}
