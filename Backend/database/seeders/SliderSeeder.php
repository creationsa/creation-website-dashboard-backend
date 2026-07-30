<?php

namespace Database\Seeders;

use App\Models\Slider;
use Illuminate\Database\Seeder;

class SliderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $first_slider = Slider::create();
        $first_slider->media()->create(['media_type' => 'image', 'option' => 'slider']);

        $second_slider = Slider::create();
        $second_slider->media()->create(['media_type' => 'image', 'option' => 'slider']);

        $third_slider = Slider::create();
        $third_slider->media()->create(['media_type' => 'image', 'option' => 'slider']);

    }
}
