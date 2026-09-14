<?php

namespace App\Http\Requests\Api\Dashboard\Admin\City;

use App\Models\City;
use Illuminate\Validation\Rule;
use App\Http\Requests\Api\ApiMasterRequest;
use MatanYadaev\EloquentSpatial\Enums\Srid;
use MatanYadaev\EloquentSpatial\Objects\Point;
use MatanYadaev\EloquentSpatial\Objects\Polygon;
use MatanYadaev\EloquentSpatial\Objects\LineString;

class CityRequest extends ApiMasterRequest
{
  public function rules()
  {
    $status = isset($this->city) ? City::findOrfail($this->city) : null;
    $rules = [
      'country_id' => 'required|exists:countries,id',
      'governrate_id' => [
        'required',
        Rule::exists('governrates', 'id')->where(function ($query) {
          return $query->where('country_id', $this->input('country_id'));
        }),
      ],
      'postal_code'=> 'nullable|numeric|min:4',
      'is_available_for_orders' => 'nullable|boolean',
    ];

    foreach (config('translatable.locales') as $locale) {
      $rules[$locale . '.slug'] = 'nullable|string|between:2,45';
      $rules[$locale . '.name'] = [
        'required',
        'between:3,100000',
        Rule::unique('city_translations', 'name')->where(function ($query) use ($locale) {
          return $query->where('locale', $locale)->where('city_id', '!=', $this->city);
        })
      ];
    }

    return $rules;
  }

//   public function validated($key = null, $default = null)
//     {
//         $validated = parent::validated();
//         $points    = [];

//         if (isset($validated['area'])) {
//             foreach ($validated['area'] as $area) {
//                 $points[] = new Point((float)$area['lat'], (float)$area['lng'], Srid::WGS84->value);
//             }
//             $first_point = $points[0];
//             $points[] = $first_point;
//             $area = new Polygon([new LineString($points)], Srid::WGS84->value);
//             $validated['area'] = $area;
//         }

//         return $validated;
//     }

}
