<?php

namespace App\Services;

use Illuminate\Support\Str;
use enshrined\svgSanitize\Sanitizer;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File as File;
use Intervention\Image\Facades\Image as Image;

class  UploadFileService
{
    public static function uploadImg($files, $url = 'images', $key = 'image', $width = null, $height = null)
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
            if($files->getClientOriginalExtension() === 'svg'){
                $fileContent = file_get_contents($files->getPathname());
                // dd($fileContent);
                $width = $height = null;

                if (preg_match('/<svg[^>]* width="(\d+)(px)?"[^>]*>/i', $fileContent, $widthMatch)) {
                    $width = $widthMatch[1];
                }

                if (preg_match('/<svg[^>]* height="(\d+)(px)?"[^>]*>/i', $fileContent, $heightMatch)) {
                    $height = $heightMatch[1];
                }

                // Alternative way: Look for viewBox attribute if width and height aren't specified directly
                if (!$width || !$height) {
                    if (preg_match('/viewBox="(\d+\s+\d+\s+(\d+)\s+(\d+))"/i', $fileContent, $viewBoxMatch)) {
                        $width = $viewBoxMatch[2];
                        $height = $viewBoxMatch[3];
                    }
                }
                $dim = [];
                $dim['mime'] = '';
            }else{
                $dim = getimagesize($files);
                $width = $width ?? $dim[0];
                $height = $height ?? $dim[1];
            }
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
                    $image = self::uploadGIFImg($img, $dist);
                }
            }
        } elseif ($dim && $dim['mime'] == "image/gif") {
            $image = self::uploadGIFImg($files, $dist);
        } else {
            if($files->getClientOriginalExtension() === 'svg'){
                $image = self::sanitizeAndStoreSvg($fileContent, $files, $url);
            }else{
                Image::make($files)->resize($width, $height, function ($cons) {
                    $cons->aspectRatio();
                })->save($dist . $files->hashName());
                $image = $files->hashName();
            }
        }
        return $image;
    }

    public  static function uploadGIFImg($gif_image, $dist)
    {
        $file_name = Str::uuid() . "___" . $gif_image->getClientOriginalName();
        if ($gif_image->move($dist, $file_name)) {
            return $file_name;
        }
    }

    public static function uploadFile($files, $url = 'files', $key = 'file', $model = null)
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
                // $file_name = time() . "___file_" . $new_file->getClientOriginalName();
                $file_name = $new_file->hashName();
                if ($new_file->move($dist, $file_name)) {
                    $file[][$key] = $file_name;
                }
            }
        } else {
            $file = $files;
            // $file_name = time() . "___file_" . $file->getClientOriginalName();
            $file_name = $file->hashName();
            if ($file->move($dist, $file_name)) {
                $file =  $file_name;
            }
        }

        return $file;
    }

    public static function sanitizeAndStoreSvg($svgContent, $fileName, $url)
    {
        $sanitizer = new Sanitizer();
        $cleanSvg = $sanitizer->sanitize($svgContent);
        
        $new_name = $fileName->hashName();
        
        $new_dist = 'images/'. $url .'/'. $new_name;
        Storage::disk('public')->put($new_dist, $cleanSvg);

        return $new_name; // Return the public URL
    }
}
