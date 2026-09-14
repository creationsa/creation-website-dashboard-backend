<?php

namespace App\Http\Requests\Api\General\Attachment;

use App\Http\Requests\Api\ApiMasterRequest;
use Illuminate\Support\Facades\DB;

class AttachmentRequest extends ApiMasterRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        $tables = DB::select('SHOW TABLES');
        $res = [] ;
        foreach($tables as $table)
        {
            $res[]=current((Array)$table);
        }
        $res = implode(",",$res) ;

        if ($this->attachment_type == 'image') {
            $file_validation = 'required|image|mimes:png,jpg,jpeg,svg';
        } elseif ($this->attachment_type == 'video') {
            $file_validation = 'required|file|mimes:mp4,mov,webm,avi,quicktime|max:51200';
        } elseif (in_array($this->attachment_type, ['file', 'audio'])) {
            $file_validation = 'required|file|mimes:docx,doc,docs,rar,zip,mp3,mp4,wma,aac,wav,flac,m4a,pdf|max:20480';
        } else {
            $file_validation = 'required';
        }

        return [
            'file'            => $file_validation,
            'attachment_type' => 'required|in:image,file,audio,video',
            'model'           => 'required|in:'.$res
        ];
    }
}
