<?php

namespace App\Exports;

use App\Models\User;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Illuminate\Support\Collection;

class ExportUser implements FromCollection,WithHeadings
{

    public function collection()
    {
        $users = User::where('user_type','client')
        ->when(request()->from_date, function ($query) {
            $query->whereDate('created_at', '>=', request()->from_date);
        })
        ->when(request()->to_date, function ($query) {
            $query->whereDate('created_at', '<=', request()->to_date);
        })->when(request()->is_active, function ($query) {
            $query->where('is_admin_active_user', request()->is_active);
        })
        ->when(request()->is_ban, function ($query) {
            $query->where('is_ban', request()->is_ban);
        })->latest()->get();

        $collection = new Collection();
        foreach ($users as $user) {
           
            $collection->push([
                'fullname' => $user->full_name,
                'email' =>  $user->email,
                'phone'     =>  $user->phone,
                'created_at' => $user->created_at->format('Y-m-d H:i'),
            ]);
        }
        return $collection;
    }


    public function headings(): array
    {
        return ['full name','email','phone','register_date'];
        
    }



}