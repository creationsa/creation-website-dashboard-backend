<?php

namespace App\Jobs;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Cohost;
use App\Models\CohostPoint;
use App\Services\SMSService;
use Illuminate\Bus\Queueable;
use App\Services\GmailService;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use App\Notifications\MinPointNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use App\Notifications\InvitationNotification;
use Illuminate\Contracts\Queue\ShouldBeUnique;

class ScheduleGuestJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    protected $guests;
    protected $sum;
    protected $user;
    protected $cohost;
    protected $cohost_points;
    protected $user_template;

    public function __construct($guests, $sum,$user, $cohost, $cohost_points, $user_template)
    {
        $this->guests = $guests;
        $this->sum = $sum;
        $this->user = $user;
        $this->cohost = $cohost;
        $this->cohost_points = $cohost_points;
        $this->user_template = $user_template;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $data = [];
        if (count($this->guests) > 20) {
            foreach (array_chunk($this->guests, 1000, true) as $guest) {
                if($guest->status == 'schedule'){

                    $guest->update(['status' => 'Sent', 'sent_at' => Carbon::now()]);

                    $data['url']    =  env('APP_URL') . '/invitation' . '/' . $guest->userTemplate->code . "/" . $guest->userTemplate->user->hash_code . "/" . $guest->code ;
                    $data['name']   =  $guest->name;
                    $data['date']   =  Carbon::now()->toFormattedDateString();
                    $data['full_name']   =  $guest->userTemplate->user->full_name;
                    $data['title']   =  $guest->userTemplate->title;
        
                    if ($guest->email != null) {
                        $image = $guest->userTemplate->media()->where('option', 'asset_envelopeBack')->first();
                        $data['image']  = $image ? asset('storage/images/user_templates/' . $image->media) : '';
                        $gmail_service = new GmailService();
                        $htmlBody = view('emails.invitation', compact('data'))->render();
                        $gmail_service->sendEmailViaGmailApi($guest->email, $htmlBody, 'Invitation');
                        // $guest->notify(new InvitationNotification($data, $guest->email, ['mail']));
                    } else {
                        $message = $data['full_name'] . " sent you an invitation to attend " . $data['title'] . " Tap to view and reply: " . $data['url'];
                        $phone   =  $guest->phone;
                        SMSService::sendFccSMS($message, $phone);
                    }
                }
            }
        }else{
            foreach ($this->guests as $guest) {
                if ($guest->status == 'schedule') {
                    $guest->update(['status' => 'Sent']);

                    $data['url']    =  env('APP_URL') . '/invitation' . '/' . $guest->userTemplate->code . "/" . $guest->userTemplate->user->hash_code . "/" . $guest->code;
                    $data['name']   =  $guest->name;
                    $data['date']   =  Carbon::now()->toFormattedDateString();
                    $data['full_name']   =  $guest->userTemplate->user->full_name;
                    $data['title']   =  $guest->userTemplate->title;

                    if ($guest->email != null) {
                        $image = $guest->userTemplate->media()->where('option', 'asset_envelopeBack')->first();
                        $data['image']  = $image ? asset('storage/images/user_templates/' . $image->media) : '';
                        $gmail_service = new GmailService();
                        $htmlBody = view('emails.invitation', compact('data'))->render();
                        $gmail_service->sendEmailViaGmailApi($guest->email, $htmlBody, 'Invitation');
                        // $guest->notify(new InvitationNotification($data, $guest->email, ['mail']));
                    } else {
                        $message = $data['full_name'] . " sent you an invitation to attend " . $data['title'] . " Tap to view and reply: " . $data['url'];
                        $phone   =  $guest->phone;
                        SMSService::sendFccSMS($message, $phone);
                    }
                }
            }
        }

        if ($this->cohost != null) {
            $this->cohost_points->decrement('points', $this->sum);
            $this->cohost->decrement('add_guests', $this->sum);
        } else {
            $this->user->decrement('points', $this->sum);
        }
        $this->user_template->update(['type' => 'sent']);
        $this->user->fresh();
        if ($this->user->points <= 25) {
            $this->user->notify(new MinPointNotification(['database']));
        }
        
    }
}
