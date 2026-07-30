<?php

namespace App\Http\Controllers\Api\Dashboard\Admin\Home;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Dashboard\Admin\Home\HomeRequest;
use App\Http\Resources\Api\Dashboard\Admin\Slider\SliderResource;
use App\Http\Resources\Api\Dashboard\Admin\ChooseUs\ChooseUsResource;
use App\Http\Resources\Api\Dashboard\Admin\Template\TemplateResource;
use App\Http\Resources\Api\Dashboard\Admin\ThirdSection\ThirdSectionResource;
use App\Http\Resources\Api\Dashboard\Admin\SecondSection\SecondSectionResource;
use App\Models\{ChooseUs, SecondSection, User, Slider, ThirdSection, HomeTemplate, Template};

class HomeController extends Controller
{

    public function home(Request $request)
    {
        $data = [];

        $sliders = Slider::latest()->take(3)->get();
        $data['sliders'] = SliderResource::collection($sliders);

        $choose_us = ChooseUs::latest()->get();
        $data['choose_us'] = ChooseUsResource::collection($choose_us);

        $second_sections = SecondSection::latest()->take(4)->get();
        $data['second_sections'] = SecondSectionResource::collection($second_sections);

        $third_sections = ThirdSection::latest()->take(2)->get();
        $data['third_sections'] = ThirdSectionResource::collection($third_sections);

        $home_templates = HomeTemplate::pluck('template_id')->toArray();
        $templates = Template::whereIn('id' , $home_templates)->get();
        $data['templates'] = TemplateResource::collection($templates);

        return response()->json(['status' => 'success', 'data' => $data, 'message' => '']);
    }

    public function updateHome(HomeRequest $request)
    {
        $data = [];
        if($request->sliders){
            foreach($request->sliders as $slider){
                $slider_model = Slider::findOrFail($slider['id']);
                $slider_model->update($slider);
                if (isset($slider['image_ar']) && $slider['image_ar']) {
                    $image_ar = $slider_model->media()->whereIn('option', ['slider_ar', 'slider'])->first();
                    if (file_exists(storage_path('app/public/images/sliders/' . $image_ar->media))) {                        
                        \File::delete(storage_path('app/public/images/sliders/' . $image_ar->media));
                    }
                    $image_ar->update(['media' => $slider['image_ar']]);
                }
                if (isset($slider['image_en']) && $slider['image_en']) {
                    $image_en = $slider_model->media()->whereIn('option', ['slider_en', 'slider'])->first();
                    if (file_exists(storage_path('app/public/images/sliders/' . $image_en->media))) {
                        \File::delete(storage_path('app/public/images/sliders/' . $image_en->media));
                    }
                    $image_en->update(['media' => $slider['image_en']]);
                }
                // $media_type = isset($slider['is_video']) || $slider['is_video'] === true ? 'file' : 'image';
                // $slider_model->media()->create(['media' => $slider['image_ar'], 'media_type' => 'image', 'option' => 'slider_ar']);
                // $slider_model->media()->create(['media' => $slider['image_en'], 'media_type' => 'image', 'option' => 'slider_en']);
            }
        }

        if ($request->second_section) {
            foreach ($request->second_section as $second_section) {
                $second_section_model = SecondSection::findOrFail($second_section['id']);
                $second_section_model->update($second_section);
                if (isset($second_section['media']) && $second_section['media']) {
                    if (file_exists(storage_path('app/public/images/second_sections/' . $second_section_model->media->media))) {
                        \File::delete(storage_path('app/public/images/second_sections/' . $second_section_model->media->media));
                    }
                    $second_section_model->media()->update(['media' => $second_section['media']]);
                }
            }
        }

        if ($request->third_section) {
            foreach ($request->third_section as $third_section) {
                $third_section_model = ThirdSection::findOrFail($third_section['id']);
                $third_section_model->update($third_section);
                if (isset($third_section['media']) && $third_section['media']) {
                    if (file_exists(storage_path('app/public/images/third_sections/' . $third_section_model->media->media))) {
                        \File::delete(storage_path('app/public/images/third_sections/' . $third_section_model->media->media));
                    }
                    $third_section_model->media()->update(['media' => $third_section['media']]);
                }
            }
        }

        if($request->templates){
            $home_templates = HomeTemplate::where('id', '>', 0)->delete();
            foreach($request->templates as $template_id){
                $home_templates = HomeTemplate::create(['template_id' => $template_id]);
            }
        }

        return response()->json(['status' => 'success', 'data' => $data, 'message' => 'Updated successfully']);
        
    }

    public function deleteSlider(Request $request)
    {
        if($request->slider_ids)
        {
            foreach ($request->slider_ids as $slider_id)
            {
                $slider = Slider::findOrFail($slider_id);
                $slider->delete();
            }
            return response()->json(['status' => 'success', 'data' => null, 'message' => 'Deleted Successfully']);
        }
        return response()->json(['status' => 'fail', 'data' => null, 'message' => 'slider ids is required'],422);
    }
}
