<?php

namespace App\Http\Controllers\Api\General;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Google\Service\AIPlatformNotebooks\Event;
use App\Models\{City, Country, EventDetail, Faq};
use App\Services\GmailService;
use App\Http\Resources\Api\Dashboard\Admin\Faq\FaqResource;
use App\Http\Requests\Api\General\EventDetail\EventDetailRequest;
use App\Http\Resources\Api\Dashboard\Admin\City\CityItemResource;
use App\Http\Resources\Api\Dashboard\Admin\Country\CountryItemResource;

class GeneralController extends Controller
{
    public function countries()
    {
        $countries = Country::when(request()->keyword, function ($query) {
            $query->whereTranslationLike('name', '%' . request()->keyword . '%')
            ->orWhereTranslationLike('short_name', '%' . request()->keyword . '%')
            ->orWhereTranslationLike('nationality', '%' . request()->keyword . '%')
            ->orWhereTranslationLike('slug', '%' . request()->keyword . '%');
        })->get();

        return CountryItemResource::collection($countries)->additional(['status' => 'success', 'message' => '']);
    }

    public function cities()
    {
        $cities = City::when(request()->keyword, function ($query) {
            $query->where(function ($query) {
                $query->whereTranslationLike('name', '%' . request()->keyword . '%')
                ->orWhereTranslationLike('slug', '%' . request()->keyword . '%');
            });
        })
        ->when(request()->country_id, function ($query) {
            $query->where('country_id', request()->country_id);
        })
        ->get();

        return CityItemResource::collection($cities)->additional(['status' => 'success', 'message' => '']);
    }

    public function faqs()
    {
        $questions = Faq::latest()->get();
        return response()->json(['status' => 'success', 'message' => '', 'data' => FaqResource::collection($questions)]);
    }

    public function eventDetails(EventDetailRequest $request)
    {
        $email = 'support@darf.co';
        $eventDetail = EventDetail::create($request->validated());
        $gmailService = new GmailService();

        $htmlBody = view('emails.event_details', compact('eventDetail'))->render();
        $gmailService->sendEmailViaGmailApi($email, $htmlBody, 'Event Details');
        return response()->json(['status' => 'success', 'message' => 'Sent successfully', 'data' => null]);
    }
}
