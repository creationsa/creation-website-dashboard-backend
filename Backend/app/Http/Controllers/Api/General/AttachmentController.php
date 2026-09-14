<?php

namespace App\Http\Controllers\Api\General;

use App\Http\Controllers\Controller;
use App\Services\UploadFileService;
use App\Http\Requests\Api\General\Attachment\AttachmentRequest;
use App\Models\AppMedia;
use Exception;

class AttachmentController extends Controller
{
    public function store(AttachmentRequest $request)
    {
        $name = null;
        try {
            if ($request->file) {
                if ($request->attachment_type == 'image') {
                    $name = UploadFileService::uploadImg($request->file, $request->model);
                } else {
                    $name = UploadFileService::uploadFile($request->file, $request->model);
                }
            }
            return response()->json([
                'status'  => 'success',
                'data'    => $name,
                'message' => trans('Created successfully'),
            ]);
        } catch (Exception $e) {
            info($e);
            return response()->json(['status' => 'fail', 'message' => trans('Something went wrong, please try again'), 'data' => null], 422);
        }
    }

    public function destroy($id)
    {
        $media = AppMedia::findOrFail($id);

        if (file_exists($media->storage_path)) \File::delete($media->storage_path);

        $media->delete();

        return response()->json(['status' => 'success', 'message' => trans('Deleted successfully')]);
    }
}
