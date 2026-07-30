<?php

namespace Database\Seeders;

use App\Models\{City, Country, Profile, User};
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::create([
            'full_name'            => 'admin',
            'email'                => 'admin@' . env('APP_NAME') . '.com',
            'phone_code'           => '965',
            'phone'                => '501234567',
            'password'             => '123456789',
            'is_admin_active_user' => true,
            'user_type'            => 'super_admin',
            'gender'               => 'male',
        ]);

        // $country = Country::first();
        // $city    = City::where('country_id', $country->id)->first();
        Profile::create([
            'user_id'       => $user->id,
            // 'country_id'    => $country->id,
            // 'city_id'       => $city->id,
            'last_login_at' => now()
        ]);
    }
}
