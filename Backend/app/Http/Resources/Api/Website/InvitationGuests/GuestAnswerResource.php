<?php

namespace App\Http\Resources\Api\Website\InvitationGuests;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Api\Website\Question\AnswerResource;
use App\Http\Resources\Api\Website\Question\QuestionResource;

class GuestAnswerResource extends JsonResource
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
            'id' => (int)$this->id,
            'answer_id' => $this->answer_id,
            'answer' => (string) $this->answer,
        ];
    }
}
