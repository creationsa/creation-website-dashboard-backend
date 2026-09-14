<?php

namespace App\Console\Commands;

use App\Models\Scooter;
use Illuminate\Console\Command;
use MatanYadaev\EloquentSpatial\Objects\Point;
use PhpMqtt\Client\Facades\MQTT;

class SubscribeToTopic extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'mqtt:subscribe';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Subscribe To MQTT topic';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $mqtt = MQTT::connection();

        try {
            $prefix = 'fgt3';
            $host   = '82.129.198.197';
            $imei   = '864714065881071';

            // $mqtt->publish($prefix . '/' . $host . '/' . $imei . '/' . 'set', json_encode(['getpacket' => 2]));

            $mqtt->subscribe($prefix . '/' . $host . '/' . $imei . '/' . 'post', function (string $topic, string $message) {
                echo sprintf('Received message on topic [%s]: %s', $topic, $message) . PHP_EOL;
            });

            // $mqtt->subscribe($prefix . '/' . 'cmd/' . $host . '/#', function (string $topic, string $message) {
            //     $message  = json_decode($message);
            //     $location = new Point((float) $message['la'], (float) $message['lo']);
            //     Scooter::where(['number' => $message['number']])->update(['location' => $location, 'last_battery_percentage' => $message['soc']]);
            // });

            $mqtt->loop(true);
        } catch (\Throwable $e) {
            echo "Error: " . $e->getMessage() . PHP_EOL;
            return Command::FAILURE;
        }

        return Command::SUCCESS;
    }
}
