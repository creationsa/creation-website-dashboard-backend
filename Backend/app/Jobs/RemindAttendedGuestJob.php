<?php

namespace App\Jobs;

use Carbon\Carbon;
use App\Models\UserTemplate;
use App\Services\SMSService;
use Illuminate\Bus\Queueable;
use App\Models\InvitationGuests;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Contracts\Queue\ShouldBeUnique;

class RemindAttendedGuestJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    protected $user_template_id;

    public function __construct($user_template_id)
    {
        $this->user_template_id = $user_template_id;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $user_template = UserTemplate::select(['id','title','date','locale'])->find($this->user_template_id);
        if(Carbon::parse($user_template->date)->isTomorrow()){
            $guests = InvitationGuests::where('user_template_id', $user_template->id)
                ->where('status', 'Sent')->where('is_attending', true)
                ->get();

            foreach ($guests as $guest) {
                $message = 'Dear ' . $guest->name . "\n" .
                    "We would like to remind you of the “" . $user_template->title . "” tomorrow, " . $user_template->date . ".";
                if ($user_template->locale == 'ar') {
                    $gender = 'المكرم/المكرمة';
                    if($user_template->templateSetting->message_gender == 'male'){
                        $gender = 'المكرم';
                    }elseif($user_template->templateSetting->message_gender == 'female'){
                        $gender = 'المكرمة';
                    }
                    $message = $gender . ': ' . $guest->name . "\n" .
                        "نود تذكيركم بمناسبة " . $user_template->title . " الموافق " . $user_template->date . ".";
                }
                SMSService::sendFccSMS($message, $guest->phone);
            }
        }
        
    }
}
