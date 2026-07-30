<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\ThirdSection;
use Illuminate\Database\Seeder;

class ThirdSectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $category = Category::first();
        $first_third_section = ThirdSection::create([
            'category_id' => $category->id,
            'ar' => [
                "title" => "دعوات زفاف",
                "sub_title" => "دعوات زفاف",
                "desc" => "دعوات زفاف",
            ],
            'en' => [
                "title" => "Wedding Invitations",
                "sub_title" => "Wedding Invitations",
                "desc" => "Wedding Invitations",
            ]
        ]);
        $first_third_section->media()->create(['media_type' => 'image', 'option' => 'third_section']);

        $second_third_section = ThirdSection::create([
            'category_id' => $category->id,
            'ar' => [
                "title" => "دعوات عمل",
                "sub_title" => "دعوات عمل",
                "desc" => "دعوات عمل",
            ],
            'en' => [
                "title" => "Business Invitations",
                "sub_title" => "Business Invitations",
                "desc" => "Business Invitations",
            ]
        ]);
        $second_third_section->media()->create(['media_type' => 'image', 'option' => 'third_section']);

    }
}
