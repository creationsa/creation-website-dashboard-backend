<?php

namespace App\Http\Requests\Api\Dashboard\Admin\Chat;

use App\Http\Requests\Api\ApiMasterRequest;;

class SendMessageRequest extends ApiMasterRequest
{
    public function authorize()
    {
        return true;
    }

    public function validated($key = null, $default = null)
    {
        $validated            = parent::validated();
        $validated['user_id'] = auth('api')->id();
        return $validated;
    }

    public function rules()
    {
        if ($this->message_type == 'image') {
            $file_validation = 'required|image|mimes:png,jpg,jpeg';
        } elseif (in_array($this->message_type, ['file', 'audio'])) {
            $file_validation = 'required|file|mimes:docx,doc,docs,rar,zip,mp3,mp4,wma,aac,wav,flac,m4a,pdf|max:20480';
        } else {
            $file_validation = 'required|string|min:1';
        }

        return [
            'message_type' => 'nullable|in:text,image,file,audio',
            'message'      => $file_validation
        ];
    }
}
