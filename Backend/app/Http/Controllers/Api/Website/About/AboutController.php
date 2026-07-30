<?php

namespace App\Http\Controllers\Api\Website\About;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\Website\About\AboutResource;
use App\Http\Resources\Api\Website\Metadata\MetadataResource;
use App\Models\About;
use App\Models\Metadata;
use Illuminate\Http\Request;

class AboutController extends Controller
{
    public function get()
    {
        $about = About::where('is_active', true)->first();

        $metadata = Metadata::where('for', 'about')->first();

        return AboutResource::make($about)->additional(['status' => 'success', 'message' => '', 'metadata' => $metadata ? MetadataResource::make($metadata) : null]);
    }
}
