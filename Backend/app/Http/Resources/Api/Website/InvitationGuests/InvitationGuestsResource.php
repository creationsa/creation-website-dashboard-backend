<?php

namespace App\Http\Resources\Api\Website\InvitationGuests;

use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Api\Website\Question\QuestionResource;
use App\Http\Resources\Api\Dashboard\Admin\Template\TemplateResource;

class InvitationGuestsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $status = 'Pending';
        if ($this->status == 'Sent' && $this->is_attending ===  null) {
            $status = 'Sent';
        } elseif ($this->is_attending == 1) {
            if($this->status == 'Attended'){
                $status = 'Attended';
            }elseif($this->status == 'Inprogress'){
                $status = 'Inprogress';
            }else{
                $status = 'Attending';
            }
        } elseif ($this->is_attending === 0 && $this->status == 'Sent') {
            $status = 'Regrets';
        } elseif ($this->status == 'pending') {
            $status = 'Pending';
        }
        return [
            'id'                    => (int)$this->id,
            'name'                  => $this->name,
            'phone'                 => $this->phone,
            'email'                 => $this->email,
            'guest_token'           => $this->code,
            'qr_code'               => ($this->code && $this->is_attending == 1) ? 'data:image/svg+xml;base64,'.base64_encode(QrCode::generate(env('APP_URL') . '/invitation' . '/' . $this->userTemplate->code . "/" . $this->code)) : '',
            'number_of_invitees'    => $this->number_of_invitees,
            'scanned_number'        => $this->scanned_number,
            'personal_note'         => $this->personal_note,
            'comment'               => $this->comment,
            'attendanceStatus'      => $status,

        ];
    }
}
