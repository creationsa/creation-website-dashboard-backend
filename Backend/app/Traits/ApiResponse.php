<?php

namespace App\Traits;

trait ApiResponse
{
    protected function errorResponse($message, $status = 422)
    {
        return response()->json(['status' => 'fail', 'message' => $message, 'data' => null], $status);
    }

    protected function successResponse($message = "", $data = null)
    {
        return response()->json([
            'status' => 'success',
            'data' => $data,
            "message" => $message
        ]);
    }
}
