<?php

namespace App\Http\Controllers\Api\Website\Metadata;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\Website\Metadata\MetadataResource;
use App\Models\Metadata;
use Illuminate\Http\Request;

class MetadataController extends Controller
{
    public function get($for)
    {
        $metadata = Metadata::where('for', $for)->where(['metadataable_type' => null, 'metadataable_id' => null])->firstOrFail();
        return MetadataResource::make($metadata)->additional(['status' => 'success', 'message' => '']);
    }
}
