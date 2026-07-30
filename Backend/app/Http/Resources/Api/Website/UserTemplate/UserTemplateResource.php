<?php

namespace App\Http\Resources\Api\Website\UserTemplate;

use App\Models\Cohost;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Api\Website\Cohost\CohostResource;
use App\Http\Resources\Api\Website\Question\QuestionResource;
use App\Http\Resources\Api\Website\Cohost\SimpleCohostResource;
use App\Http\Resources\Api\Dashboard\Admin\Template\TemplateResource;

class UserTemplateResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $authUser = auth('api')->user();
        $cohost = null;
        if ($authUser) {
            $cohost = Cohost::where([
                'user_template_id' => $this->id,
                'status' => 'accepted',
                'email' => $authUser->email,
            ])->first();
        }

        return [
            'id'        => (int) $this->id,
            'link'      =>  env('APP_URL') . '/invitation' . '/' . $this->code.'/'. optional($this->user)->hash_code,
            'design'    => $this->design,
            'show_guest_list'   => (bool) $this->show_guest_list,
            'location'          => (bool) $this->location,
            'location_name'     => (string) $this->location_name,
            'template'  => TemplateResource::make($this->template),
            'name'      => (string) $this->name,
            'guest_type'=> $this->guest_type,
            'title'     => (string) $this->title,
            'desc'      => (string) $this->desc,
            'address'   => (string) $this->address,
            'type'      => (string) $this->type,
            'checker_token'      =>  $this->checker_token,
            'event_token'      =>  $this->code,
            'date'      =>  $this->date,
            'time'      =>  $this->time,
            'questions' =>  QuestionResource::collection($this->questions),
            'cohost_details' =>  $authUser ? SimpleCohostResource::make($this->cohosts()->where('email', $authUser->email)->first()) : null,
            'template_assets' => $this->getTemplateAssets(),
            'logos'           => $this->logos,
            'locale'         => $this->locale,
            'show_qr'         => (bool) $this->show_qr,
            'reminder_attended_duration'    => $this->reminder_attended_duration,
            'reminder_not_attended_duration' => $this->reminder_not_attended_duration,
            'is_cohost'     => $cohost ? true : false,
        ];
    }
}
