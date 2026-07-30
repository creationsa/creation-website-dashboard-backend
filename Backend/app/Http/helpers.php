<?php

use App\Models\{Device, Permission, Setting};
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image as Image;
use Illuminate\Support\Facades\File as File;
use LaravelFCM\Facades\FCM as FCM;
use LaravelFCM\Message\OptionsBuilder;
use LaravelFCM\Message\PayloadDataBuilder;
use LaravelFCM\Message\PayloadNotificationBuilder;
use App\Services\SMSService;
use Illuminate\Support\Facades\Schema;

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
    if ($url != 'images' && !File::isDirectory(storage_path('app/public/images/' . $url . "/"))) {
        File::makeDirectory(storage_path('app/public' . DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . $url . DIRECTORY_SEPARATOR), 0777, true);
        $dist = storage_path('app/public' . DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . $url . DIRECTORY_SEPARATOR);
    } elseif (File::isDirectory(storage_path('app/public/images/' . $url . "/"))) {
        $dist = storage_path('app/public/images/' . $url . "/");
    }
    $image = "";
    if (!is_array($files)) {
        $dim = getimagesize($files);
        $width = $width ?? $dim[0];
        $height = $height ?? $dim[1];
    }

    if (gettype($files) == 'array') {
        $image = [];
        foreach ($files as $img) {
            $dim = getimagesize($img);
            $width = $width ?? $dim[0];
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
function pushFcmNotes($fcmData, $userIds, $model = '\\App\\Models\\Device')
{
    $send_process = [];
    $fail_process = [];

    if (is_array($userIds) && !empty($userIds)) {
        $number_of_drivers = null;

        $devices = $model::whereIn('user_id', $userIds)->latest()->when($number_of_drivers, function ($q) use ($number_of_drivers) {
            $q->take($number_of_drivers);
        })->get();

        $ios_devices = array_filter($devices->where('type', 'ios')->pluck('device_token')->toArray());
        $android_devices = array_filter($devices->where('type', 'android')->pluck('device_token')->toArray());

        $optionBuilder = new OptionsBuilder();
        $optionBuilder->setTimeToLive(60 * 20);

        $notificationBuilder = new PayloadNotificationBuilder($fcmData['title']);
        $notificationBuilder->setBody($fcmData['body'])->setSound('default');

        $dataBuilder = new PayloadDataBuilder();
        $dataBuilder->addData($fcmData);

        $option       = $optionBuilder->build();
        $data         = $dataBuilder->build();
        if (count($ios_devices)) {
            $notification = $notificationBuilder->build();
            // You must change it to get your tokens
            $downstreamResponse = FCM::sendTo($ios_devices, $option, $notification, $data);
            Device::whereIn('device_token', $downstreamResponse->tokensToDelete() + array_keys($downstreamResponse->tokensWithError()))->delete();
            // return $downstreamResponse;
            $send_process[] = $downstreamResponse->numberSuccess();
        }
        if (count($android_devices)) {
            $notification = null;
            // You must change it to get your tokens
            $downstreamResponse = FCM::sendTo($android_devices, $option, $notification, $data);
            Device::whereIn('device_token', $downstreamResponse->tokensToDelete() + array_keys($downstreamResponse->tokensWithError()))->delete();
            // return $downstreamResponse;
            $send_process[] = $downstreamResponse->numberSuccess();
            // code...
        }
        return count($send_process);
    }
    return "No Users";
}

// HISMS
function send_sms($mobile, $msg)
{
    $sender_name = str_replace(' ', '%20', setting('project_name'));
    $msg = str_replace(' ', '%20', $msg);
    $sender_data = [
        'username' => setting('sms_username'),
        'password' => setting('sms_password'),
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

function generate_unique_code($length, $model, $col = 'code', $type = 'numbers', $letter_type = 'all')
{
    if ($type == 'numbers') {
        $characters = '0123456789';
    } else {
        switch ($letter_type) {
            case 'all':
                $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
                break;
            case 'lower':
                $characters = '0123456789abcdefghijklmnopqrstuvwxyz';
                break;
            case 'upper':
                $characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                break;

            default:
                $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
                break;
        }
    }
    $generate_random_code = '';
    $charactersLength = strlen($characters);
    for ($i = 0; $i < $length; $i++) {
        $generate_random_code .= $characters[rand(0, $charactersLength - 1)];
    }
    if ($model::where($col, $generate_random_code)->exists()) {
        generate_unique_code($length, $model, $col, $type);
    }
    return $generate_random_code;
}
