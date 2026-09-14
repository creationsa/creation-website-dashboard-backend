<?php

namespace Database\Seeders;

use App\Models\City;
use App\Models\Country;
use Illuminate\Database\Seeder;

class CitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        City::create([
            'ar' => [
                "name" => "الرياض",
            ],
            'en' => [
                "name" => "Riyadh",
            ],
            'country_id' => Country::first()->id,
        ]);
    }
}
