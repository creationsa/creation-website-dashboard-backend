<?php

namespace App\Services;

use PhpMqtt\Client\Facades\MQTT;

class MqttService
{
    private $prefix          = 'fgt3';
    private $host            = '82.129.198.197';
    private static $instance = null;
    private $mqtt            = null;

    private function __construct()
    {
        $this->mqtt = MQTT::connection();
    }

    public static function getInstance()
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    public static function lock($imei)
    {
        $data = ['elock' => 1];
        self::getInstance()->publish($imei, $data);
    }

    public static function unlock($imei)
    {
        $data = ['elock' => 0];
        self::getInstance()->publish($imei, $data);
    }

    public static function alarmOn($imei)
    {
        $data = ['iotalarm' => 1];
        self::getInstance()->publish($imei, $data);
    }

    public static function alarmOff($imei)
    {
        $data = ['iotalarm' => 0];
        self::getInstance()->publish($imei, $data);
    }

    public static function findCar($imei)
    {
        $data = ['findcar' => 1];
        self::getInstance()->publish($imei, $data);
    }

    public function publish($imei, $data)
    {
        $this->mqtt->publish($this->prefix . '/' . $this->host . '/' . $imei . '/' . 'set', json_encode($data));
    }
}
