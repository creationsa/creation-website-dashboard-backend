<?php

namespace App\Exports;

use App\Models\SubscriptionPlanUser;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\FromCollection;

class ExportSubscribtion implements FromCollection, WithHeadings
{

    private $from, $to;

    public function __construct($from = '', $to = '')
    {
        $this->from = $from;
        $this->to = $to;
    }

    public function collection()
    {
        $subscribtions = SubscriptionPlanUser::when($this->from != '', function ($q) {
                $q->whereDate('created_at', '>=', $this->from);
            })->when($this->to != '', function ($q) {
                $q->whereDate('created_at', '<=', $this->to);
            })->latest()->get();
            
        $collection = new Collection();
        foreach ($subscribtions as $subscribtion) {

            $collection->push([
                'Transaction ID'         => $subscribtion->transaction_id,
                'Name'                   => $subscribtion->user?->full_name,
                'Plan'                   => $subscribtion->subscriptionPlan?->title,
                'Price'                  => $subscribtion->price,
                'Vat'                    => $subscribtion->vat_price,
                'Discount'               => $subscribtion->discount,
                'Total Price'            => $subscribtion->total_price,
                'invoice'                => $subscribtion->is_company_data == true ? 'Yes' : 'No',
                'created_at'             => $subscribtion->created_at->format('Y-m-d'),
            ]);
        }
        return $collection;
    }


    public function headings(): array
    {
        return ['Transaction ID', 'Name', 'Plan', 'Price', 'Vat', 'Discount', 'Total Price', 'invoice', 'created_at'];
    }
}
