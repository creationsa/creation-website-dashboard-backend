<?php

namespace App\Jobs;

use App\Models\Order;
use App\Services\OrderService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class AutoCancelOrderAcceptance implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $orderId;
    public $driverId;
    public $onTheWayStartedAt;

    public function __construct(int $orderId, int $driverId, string $onTheWayStartedAt)
    {
        $this->orderId = $orderId;
        $this->driverId = $driverId;
        $this->onTheWayStartedAt = $onTheWayStartedAt;
    }

    public function handle(OrderService $orderService): void
    {
        $order = Order::query()
            ->where('id', $this->orderId)
            ->where('driver_id', $this->driverId)
            ->where('status', 'on_the_way')
            ->first();

        if (! $order) {
            return;
        }

        if (! $order->on_the_way_started_at || $order->on_the_way_started_at->format('Y-m-d H:i:s') !== $this->onTheWayStartedAt) {
            return;
        }

        $order->update([
            'status' => 'requested',
            'driver_id' => null,
            'on_the_way_started_at' => null,
            'cancel_reason' => null,
            'cancelled_by' => null,
        ]);
        $order->drivers()->detach($this->driverId);

        $orderService->releaseOrderToAllNearbyDrivers($order->id);
    }
}
