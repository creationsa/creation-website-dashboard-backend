<?php

namespace App\Exports;

use App\Models\EmailSubscribtion;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\FromCollection;

class ExportEmail implements FromCollection, WithHeadings
{

    private $from, $to;

    public function __construct($from = '', $to = '')
    {
        $this->from = $from;
        $this->to = $to;
    }

    public function collection()
    {
        $emails = EmailSubscribtion::when($this->from != '', function ($q) {
                $q->whereDate('created_at', '>=', $this->from);
            })->when($this->to != '', function ($q) {
                $q->whereDate('created_at', '<=', $this->to);
            })->latest()->get();
            
        $collection = new Collection();
        foreach ($emails as $email) {

            $collection->push([
                'email'         => $email->email,
                'status'        => $email->status,
                'created_at'    => $email->created_at->format('Y-m-d'),
            ]);
        }
        return $collection;
    }


    public function headings(): array
    {
        return ['email', 'status', 'created_at'];
    }
}
