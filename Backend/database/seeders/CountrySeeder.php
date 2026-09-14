<?php

namespace Database\Seeders;

use App\Models\Country;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CountrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Country::create([
            'ar' => [
                "name"        => "السعودية",
                "short_name"  => "السعودية",
                "nationality" => "سعودي",
            ],
            'en' => [
                "name"        => "Saudi Arabia",
                "short_name"  => "Saudi Arabia",
                "nationality" => "Saudi",
            ],
            'phone_code'         => '966',
            'continent'          => 'asia',
            'phone_number_limit' => 8,
        ]);
    }
}
