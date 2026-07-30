<?php

namespace App\Http\Controllers\Api\Website\Home;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\Api\Website\Slider\SliderResource;
use App\Http\Requests\Api\Dashboard\Admin\Home\HomeRequest;
use App\Http\Resources\Api\Dashboard\Admin\ChooseUs\ChooseUsResource;
use App\Http\Resources\Api\Dashboard\Admin\Template\TemplateResource;
use App\Http\Requests\Api\Website\EmailSubscribtion\EmailSubscribtionRequest;
use App\Http\Resources\Api\Dashboard\Admin\ThirdSection\ThirdSectionResource;
use App\Http\Resources\Api\Dashboard\Admin\SecondSection\SecondSectionResource;
use App\Models\{ChooseUs, EmailSubscribtion, SecondSection, User, Slider, ThirdSection, HomeTemplate, Template};

class HomeController extends Controller
{

    public function home(Request $request)
    {
        $data = [];

        $sliders = Slider::where('is_active', true)->take(3)->get();
        $data['sliders'] = SliderResource::collection($sliders);

        $choose_us = ChooseUs::latest()->get();
        $data['choose_us'] = ChooseUsResource::collection($choose_us);

        $second_sections = SecondSection::latest()->take(4)->get();
        $data['second_sections'] = SecondSectionResource::collection($second_sections);

        $third_sections = ThirdSection::latest()->take(2)->get();
        $data['third_sections'] = ThirdSectionResource::collection($third_sections);

        $home_templates = HomeTemplate::pluck('template_id')->toArray();
        $templates = Template::whereIn('id', $home_templates)->orderBy('ordering','asc')->get();
        $data['templates'] = TemplateResource::collection($templates);

        return response()->json(['status' => 'success', 'data' => $data, 'message' => '']);
    }

    public function emailSubscribtion(EmailSubscribtionRequest $request)
    {
        $email = EmailSubscribtion::create($request->validated()+['status' => 'Subscribed']);
        return response()->json(['status' => 'success', 'data' => null, 'message' => 'Saved Successfully']);
    }

}
