<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Illuminate\Support\Collection;

class ExportEmptyGuest implements FromCollection,WithHeadings
{

    public function collection()
    {
        $collection = new Collection();
       
        return $collection;
    }


    public function headings(): array
    {
        return ['Name','Email Or Phone'];
        
    }



}