<?php

namespace App\Http\Resources\Api\Website\Question;

use Illuminate\Http\Resources\Json\JsonResource;

class QuestionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id'                   => (int) $this->id,
            'title'                => (string) $this->title,
            'type'                 => (string) $this->type,
            'created_at'           =>  $this->created_at->format('Y-m-d'),
            'answers'              =>  AnswerResource::collection($this->answers),
        ];
    }
}
