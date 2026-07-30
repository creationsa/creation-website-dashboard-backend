<?php

namespace App\Jobs;

use App\Services\SMSService;
use Illuminate\Bus\Queueable;
use App\Models\InvitationGuests;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Contracts\Queue\ShouldBeUnique;

class RemindNotAttendedGuestJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    protected $user_template;

    public function __construct($user_template)
    {
        $this->user_template = $user_template;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $guests = InvitationGuests::where('user_template_id', $this->user_template->id)
            ->where('status', 'Sent')->where('is_attending', null)
            ->get();

        foreach ($guests as $guest) {
            $message = 'Dear ' . $guest->name . "\n" .
                "We would like to remind you of the “" . $this->user_template->title . "” Please respond with acceptance or not .";
            if ($this->user_template->locale == 'ar') {
                $message = 'المكرمة: ' . $guest->name . "\n" .
                    "نود تذكيركم بمناسبة " . $this->user_template->title . " يرجى الرد بالقبول او الاعتذار .";
            }
            SMSService::sendFccSMS($message, $guest->phone);
        }
        
    }
}
