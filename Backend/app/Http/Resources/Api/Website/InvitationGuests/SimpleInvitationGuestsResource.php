<?php

namespace App\Http\Resources\Api\Website\InvitationGuests;

use App\Http\Resources\Api\Dashboard\Admin\Contact\SimpleUserResource;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Api\Website\Question\QuestionResource;
use App\Http\Resources\Api\Dashboard\Admin\Template\TemplateResource;

class SimpleInvitationGuestsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        
        return [
            'id'                    => (int)$this->id,
            'name'                  => $this->name,
            'phone'                 => $this->phone,
            'email'                 => $this->email,
            'number_of_invitees'    => $this->number_of_invitees,
            'personal_note'         => $this->personal_note,
            'added_by'              => SimpleUserResource::make($this->addedBy)
        ];
    }
}
