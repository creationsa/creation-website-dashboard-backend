<?php

namespace App\Jobs;

use App\Models\Trip;
use App\Notifications\Api\App\{AutoStopTripNotification, ReminderStopTripNotification};
use App\Services\{MqttService, PriceService, TripService};
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class AutoStopTrip implements ShouldQueue
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
        $trip         = Trip::where('status', 'started')->with(['scooter', 'user.devices'])->whereHas('scooter')->whereHas('user')->find($this->trip_id);
        $started_time = isset($trip?->status_times['started']) ? Carbon::parse($trip?->status_times['started']) : null;

        if ($trip) {
            $times_by_minutes = PriceService::calculateTimeBasedOnWalletBalance($trip->scooter, $trip->user);
            if (now()->diffInMinutes($started_time) >= $times_by_minutes) {
                $trip->user->notify(new AutoStopTripNotification($trip->id, ['database', 'fcm']));
                TripService::end($trip, 'auto_stop');
                // MqttService::lock($trip->scooter->serial_number);
            } else {
                $reminder_time = $times_by_minutes - now()->diffInMinutes($started_time);
                $trip->user->notify(new ReminderStopTripNotification($trip->id, $reminder_time, ['database', 'fcm']));
                AutoStopTrip::dispatch($this->trip_id)->delay(now()->addMinutes($reminder_time));
                // if ($reminder_time <= 5) MqttService::alarmOn($trip->scooter->serial_number);
            }
        }
    }
}
