<?php

namespace Database\Seeders;

use App\Models\City;
use App\Models\Country;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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
                "name" => "الفروانية",
            ],
            'en' => [
                "name" => "Farwaniya",
            ],
            'country_id' => Country::first()->id,
        ]);

        City::create([
            'ar' => [
                "name" => "الكويت",
            ],
            'en' => [
                "name" => "Kuwait",
            ],
            'country_id' => Country::first()->id,
        ]);
    }
}
