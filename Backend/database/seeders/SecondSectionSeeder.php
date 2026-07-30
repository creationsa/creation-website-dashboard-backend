<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\SecondSection;
use Illuminate\Database\Seeder;

class SecondSectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $category = Category::first();
        $first_second_section = SecondSection::create([
            'category_id' => $category->id,
            'ar' => [
                "title" => "دعوات زفاف",
            ],
            'en' => [
                "title" => "Wedding Invitations",
            ]
        ]);
        $first_second_section->media()->create(['media_type' => 'image', 'option' => 'second_section']);

        $second_second_section = SecondSection::create([
            'category_id' => $category->id,
            'ar' => [
                "title" => "دعوات عمل",
            ],
            'en' => [
                "title" => "Business Invitations",
            ]
        ]);
        $second_second_section->media()->create(['media_type' => 'image', 'option' => 'second_section']);

        $third_second_section = SecondSection::create([
            'category_id' => $category->id,
            'ar' => [
                "title" => "دعوات اطفال",
            ],
            'en' => [
                "title" => "Kids Invitations",
            ]
        ]);
        $third_second_section->media()->create(['media_type' => 'image', 'option' => 'second_section']);

        $forth_second_section = SecondSection::create([
            'category_id' => $category->id,
            'is_wide' => true,
            'ar' => [
                "title" => "دعوات اطفال",
            ],
            'en' => [
                "title" => "Kids Invitations",
            ]
        ]);
        $forth_second_section->media()->create(['media_type' => 'image', 'option' => 'second_section']);
    }
}
