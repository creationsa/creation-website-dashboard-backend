<?php

namespace App\Jobs;

use App\Models\{Trip};
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use App\Notifications\Api\App\CancelTripNotification;
use App\Notifications\Api\App\AutoCancelTripNotification;

class AutoCancelTrip implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $trip_id;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($trip_id)
    {
        $this->trip_id = $trip_id;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $trip = Trip::where('status', 'coming')
            ->where('date', '<=', now()->format('Y-m-d'))
            ->where('time', '<=', now()->format('H:i:s'))
            ->find($this->trip_id);

        if ($trip) {
            $trip->update([
                'status'       => 'cancelled',
                'cancelled_by' => 'auto_cancel',
                'cancel_reason' => 'Auto cancelled due to timeout'
            ]);

            if($trip->plan->trips()->where('status', 'cancelled')->count() == $trip->plan->trips()->count()) {
                $trip->plan->update(['status' => 'cancelled', 'cancelled_by' => 'auto_cancel']);
            }

            $trip->plan->user->notify(new CancelTripNotification($trip, 'auto_cancel'));
        }
    }
}
