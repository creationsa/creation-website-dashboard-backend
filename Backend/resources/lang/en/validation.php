<?php

$attributes = [
    'platform' => 'platform',
    'prescription' => 'prescription',
    'web_images' => 'website image',
    'web_images.*.image' => 'website image',
    'app_images' => 'application images',
    'app_images.*.image' => 'application images',

    'products.*.product_id' => 'product',
    'is_admin_active_user' => 'Activate the user by the administration',
    'is_default' => 'default',
    'is_active' => 'activated',
    'sync_price' => 'sync price',
    'sync_qty' => 'sync_qty',
    'size_id' => 'size',
    'flavor_id' => 'flavor',
    'option_type' => 'option type',
    'barcode' => 'barcode',
    'quantity' => 'quantity',
    'qty' => 'quantity',
    'min_qty' => 'minimum available quantity',
    'price' => 'price',
    'special_price' => 'special price',
    'special_price_type' => 'special price type',
    'special_price_start' => 'Special price has started to apply',
    'special_price_end' => 'Special price application has ended',
    'width' => 'width',
    'height' => 'height',
    'weight' => 'weight',
    'length' => 'length',
    'volumetric_weight' => 'volumetric weight',
    'best_for' => 'best for',
    'is_free_vat' => 'VAT is free',
    'is_free_delivery' => 'Free Delivery',

    'facebook' => 'Facebook link',
    'twitter' => 'link x',
    'youtube' => 'youtube link',
    'instagram' => 'instagram link',
    'whatsapp' => 'Whatsapp link',

    'years_experience' => 'years of experience',
    'numbers_employee' => 'Number of employees',
    'numbers_drivers' => 'Number of drivers',
    'numbers_companies' => 'Number of companies',
    'numbers_completed_order' => 'Numbers of completed orders',
];

foreach (config('translatable.locales') as $locale) {
    $attributes[$locale . '.address'] = "" . trans('dashboard.' . $locale . '.address');
    $attributes[$locale . '.name'] = "" . trans('dashboard.' . $locale . '.name');
    $attributes[$locale . '.desc'] = "" . trans('dashboard.' . $locale . '.desc');
    $attributes[$locale . '.first_desc'] = "" . trans('dashboard.' . $locale . '.first_desc');
    $attributes[$locale . '.slug'] = "" . trans('dashboard.' . $locale . '.slug');
    $attributes[$locale . '.title'] = "" . trans('dashboard.' . $locale . '.title');
    $attributes[$locale . '.nationality'] = "" . trans('dashboard.' . $locale . '.nationality');
    $attributes[$locale . '.strategy'] = "" . trans('dashboard.' . $locale . '.strategy');
    $attributes[$locale . '.vision'] = "" . trans('dashboard.' . $locale . '.vision');
    $attributes[$locale . '.message'] = "" . trans('dashboard.' . $locale . '.message');
    $attributes[$locale . '.hero_intro'] = "" . trans('dashboard.' . $locale . '.hero_intro');
    $attributes[$locale . '.about'] = "" . trans('dashboard.' . $locale . '.about');
    $attributes[$locale . '.question'] = "" . trans('dashboard.' . $locale . '.question');
    $attributes[$locale . '.goals'] = "" . trans('dashboard.' . $locale . '.goals');

    $attributes['main_image.' . $locale . '.alt'] = "" . trans('dashboard.' . $locale . '.alt');
    $attributes['images.*.' . $locale . '.alt'] = "" . trans('dashboard.' . $locale . '.alt');
    $attributes['image.' . $locale . '.alt'] = "" . trans('dashboard.' . $locale . '.alt');
    $attributes['video.' . $locale . '.alt'] = "" . trans('dashboard.' . $locale . '.alt');

    $attributes['metadata.' . $locale . '.title'] = "" . trans('dashboard.' . $locale . '.metadata.title');
    $attributes['metadata.' . $locale . '.canonical_tags'] = "" . trans('dashboard.' . $locale . '.metadata.canonical_tags');
    $attributes['metadata.' . $locale . '.image'] = "" . trans('dashboard.' . $locale . '.metadata.image');
    $attributes['metadata.' . $locale . '.type'] = "" . trans('dashboard.' . $locale . '.metadata.type');
    $attributes['metadata.' . $locale . '.description'] = "" . trans('dashboard.' . $locale . '.metadata.description');
    $attributes['metadata.' . $locale . '.keywords'] = "" . trans('dashboard.' . $locale . '.metadata.keywords');

    $attributes[$locale . '.title'] = "" . trans('dashboard.' . $locale . '.metadata.title');
    $attributes[$locale . '.canonical_tags'] = "" . trans('dashboard.' . $locale . '.metadata.canonical_tags');
    $attributes[$locale . '.image'] = "" . trans('dashboard.' . $locale . '.metadata.image');
    $attributes[$locale . '.type'] = "" . trans('dashboard.' . $locale . '.metadata.type');
    $attributes[$locale . '.description'] = "" . trans('dashboard.' . $locale . '.metadata.description');
    $attributes[$locale . '.keywords'] = "" . trans('dashboard.' . $locale . '.metadata.keywords');
}

return [

    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines contain the default error messages used by
    | the validator class. Some of these rules have multiple versions such
    | as the size rules. Feel free to tweak each of these messages here.
    |
    */

    'accepted' => 'The :attribute must be accepted.',
    'active_url' => 'The :attribute is not a valid URL.',
    'after' => 'The :attribute must be a date after :date.',
    'after_or_equal' => 'The :attribute must be a date after or equal to :date.',
    'alpha' => 'The :attribute must only contain letters.',
    'alpha_dash' => 'The :attribute must only contain letters, numbers, dashes and underscores.',
    'alpha_num' => 'The :attribute must only contain letters and numbers.',
    'array' => 'The :attribute must be an array.',
    'before' => 'The :attribute must be a date before :date.',
    'before_or_equal' => 'The :attribute must be a date before or equal to :date.',
    'between' => [
        'numeric' => 'The :attribute must be between :min and :max.',
        'file' => 'The :attribute must be between :min and :max kilobytes.',
        'string' => 'The :attribute must be between :min and :max characters.',
        'array' => 'The :attribute must have between :min and :max items.',
    ],
    'boolean' => 'The :attribute field must be true or false.',
    'confirmed' => 'The :attribute confirmation does not match.',
    'date' => 'The :attribute is not a valid date.',
    'date_equals' => 'The :attribute must be a date equal to :date.',
    'date_format' => 'The :attribute does not match the format :format.',
    'different' => 'The :attribute and :other must be different.',
    'digits' => 'The :attribute must be :digits digits.',
    'digits_between' => 'The :attribute must be between :min and :max digits.',
    'dimensions' => 'The :attribute has invalid image dimensions.',
    'distinct' => 'The :attribute field has a duplicate value.',
    'email' => 'The :attribute must be a valid email address.',
    'ends_with' => 'The :attribute must end with one of the following: :values.',
    'exists' => 'The selected :attribute is invalid.',
    'file' => 'The :attribute must be a file.',
    'filled' => 'The :attribute field must have a value.',
    'gt' => [
        'numeric' => 'The :attribute must be greater than :value.',
        'file' => 'The :attribute must be greater than :value kilobytes.',
        'string' => 'The :attribute must be greater than :value characters.',
        'array' => 'The :attribute must have more than :value items.',
    ],
    'gte' => [
        'numeric' => 'The :attribute must be greater than or equal :value.',
        'file' => 'The :attribute must be greater than or equal :value kilobytes.',
        'string' => 'The :attribute must be greater than or equal :value characters.',
        'array' => 'The :attribute must have :value items or more.',
    ],
    'image' => 'The :attribute must be an image.',
    'in' => 'The selected :attribute is invalid.',
    'in_array' => 'The :attribute field does not exist in :other.',
    'integer' => 'The :attribute must be an integer.',
    'ip' => 'The :attribute must be a valid IP address.',
    'ipv4' => 'The :attribute must be a valid IPv4 address.',
    'ipv6' => 'The :attribute must be a valid IPv6 address.',
    'json' => 'The :attribute must be a valid JSON string.',
    'lt' => [
        'numeric' => 'The :attribute must be less than :value.',
        'file' => 'The :attribute must be less than :value kilobytes.',
        'string' => 'The :attribute must be less than :value characters.',
        'array' => 'The :attribute must have less than :value items.',
    ],
    'lte' => [
        'numeric' => 'The :attribute must be less than or equal :value.',
        'file' => 'The :attribute must be less than or equal :value kilobytes.',
        'string' => 'The :attribute must be less than or equal :value characters.',
        'array' => 'The :attribute must not have more than :value items.',
    ],
    'max' => [
        'numeric' => 'The :attribute must not be greater than :max.',
        'file' => 'The :attribute must not be greater than :max kilobytes.',
        'string' => 'The :attribute must not be greater than :max characters.',
        'array' => 'The :attribute must not have more than :max items.',
    ],
    'mimes' => 'The :attribute must be a file of type: :values.',
    'mimetypes' => 'The :attribute must be a file of type: :values.',
    'min' => [
        'numeric' => 'The :attribute must be at least :min.',
        'file' => 'The :attribute must be at least :min kilobytes.',
        'string' => 'The :attribute must be at least :min characters.',
        'array' => 'The :attribute must have at least :min items.',
    ],
    'multiple_of' => 'The :attribute must be a multiple of :value.',
    'not_in' => 'The selected :attribute is invalid.',
    'not_regex' => 'The :attribute format is invalid.',
    'numeric' => 'The :attribute must be a number.',
    'password' => 'The password is incorrect.',
    'present' => 'The :attribute field must be present.',
    'regex' => 'The :attribute format is invalid.',
    'required' => 'The :attribute field is required.',
    'required_if' => 'The :attribute field is required when :other is :value.',
    'required_unless' => 'The :attribute field is required unless :other is in :values.',
    'required_with' => 'The :attribute field is required when :values is present.',
    'required_with_all' => 'The :attribute field is required when :values are present.',
    'required_without' => 'The :attribute field is required when :values is not present.',
    'required_without_all' => 'The :attribute field is required when none of :values are present.',
    'prohibited' => 'The :attribute field is prohibited.',
    'prohibited_if' => 'The :attribute field is prohibited when :other is :value.',
    'prohibited_unless' => 'The :attribute field is prohibited unless :other is in :values.',
    'same' => 'The :attribute and :other must match.',
    'size' => [
        'numeric' => 'The :attribute must be :size.',
        'file' => 'The :attribute must be :size kilobytes.',
        'string' => 'The :attribute must be :size characters.',
        'array' => 'The :attribute must contain :size items.',
    ],
    'starts_with' => 'The :attribute must start with one of the following: :values.',
    'string' => 'The :attribute must be a string.',
    'timezone' => 'The :attribute must be a valid zone.',
    'unique' => 'The :attribute has already been taken.',
    'uploaded' => 'The :attribute failed to upload.',
    'url' => 'The :attribute format is invalid.',
    'uuid' => 'The :attribute must be a valid UUID.',

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using the
    | convention "attribute.rule" to name the lines. This makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
    */

    'custom' => [
        'attribute-name' => [
            'rule-name' => 'custom-message',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | The following language lines are used to swap our attribute placeholder
    | with something more reader friendly such as "E-Mail Address" instead
    | of "email". This simply helps us make our message more expressive.
    |
    */

    'attributes' => [
        'from_day' => 'from day',
        'to_day' => 'to day',
        'from_time' => 'from hour',
        'to_time' => 'to hour',
        'main_image' => 'main image',
        'main_image.media' => 'image',
        'image.media' => 'image',
        'video.media' => 'video',
        'short_name' => 'short name',
        'postal_code' => 'postal code',

        'barth_date' => 'barth date',
        'national_id' => 'national id',

        'national_id_expire_date' => 'National_id_expire_date',
        'phone_type' => 'Phone type',
        'job' => 'occupation',
        'car_brand_id' => 'Car brand',
        'manufacture_year' => 'car year of manufacture',
        'is_not_owner' => 'I am not the owner',
        'personal_image' => 'personal image',
        'national_id_image' => 'national_id_image',
        'driver_license_image' => 'Drivers license image',
        'car_insurance_image' => 'Car insurance image',
        'car_license_image' => 'car license image',
        'car_authorization_image' => 'Car authorization image',

        'second_phone_code' => 'Country code',
        'second_phone' => 'The facility managers phone number',
        'second_email' => 'The owners email',
        'action_city_id' => 'Action city',
        'commercial_register' => 'commercial register',
        'bank_number' => 'Bank account number',
        'drivers_number' => 'Number of drivers',
        'cars_number' => 'Number of cars',
        'license_expire_date' => 'license expiry date',
        'national_id_image' => 'national_id_image',
        'commercial_register_image' => 'commercial register image',
        'tax_certificate_image' => 'Tax certificate image',
        'ministry_transport_license_image' => 'Ministry of Transport license image',

        'is_not_owner' => 'You are not the owner',
        'name' => 'name',
        'full_name' => 'full name',
        'username' => 'Username',
        'email' => 'email',
        'first_name' => 'first name',
        'last_name' => 'Last name',
        'password' => 'password',
        'password_confirmation' => 'Password confirmation',
        'city_id' => 'city',
        'country_id' => 'Country',
        'address' => 'address',
        'phone_code' => 'country code',
        'phone' => 'phone',
        'mobile' => 'mobile phone',
        'age' => 'age',
        'sex' => 'sex',
        'gender' => 'the gender',
        'day' => 'today',
        'month' => 'month',
        'year' => 'year',
        'hour' => 'hour',
        'minute' => 'minute',
        'second' => 'second',
        'title' => 'title',
        'content' => 'content',
        'description' => 'description',
        'desc' => 'Description',
        'excerpt' => 'excerpt',
        'date' => 'date',
        'time' => 'time',
        'available' => 'available',
        'size' => 'size',
        'ban_reason' => 'ban reason',
        'is_ban' => 'Status from ban',
        'is_active' => 'is active',
        // new attr
        //dashboard
        'role_id' => 'admin level',

        'message_type' => 'message type',
        'message' => 'message',
        'user_id' => 'User',
        'link' => 'link',
        'project_name' => 'Project name',
        'map_api' => 'map code',
        'host' => 'hostname of the server',
        'driver_mail' => 'mail server',
        'from_address' => 'from address',
        'from_name' => 'sender name',
        'phones' => 'Mobile Numbers',
        'port' => 'server port',
        'encry' => "encryption protocol",
        'user_type' => 'user type',
        'title' => "title",
        'body' => "content",
        // Provider
        'image' => 'the image',
        'images.*' => 'images',
        'id_number' => 'ID number',
        'contact_id' => 'Contact message',
        'reply' => 'reply',
        'send_vai' => 'send vai',

        'date' => 'date',
        'from_time' => 'from',
        'to_time' => 'to_time',
        'bio' => 'brief',

        'permissions' => 'permissions',
        'permissions.*' => 'Permissions',
        'permissions.*.*' => 'Permissions',
        'city_list' => 'Cities',
        'city_list.*' => 'Cities',
        'category_id' => 'Main section',
        'start_date' => 'start date',
        'finish_date' => 'finish date',

        // client
        'client_id' => 'client',
        'chat_id' => 'chat',

        'app_files' => 'files',
        'app_files.*' => 'files',

        // Consultant
        'old_password' => 'old password',
        'duration' => 'duration',

        'note' => 'notes',
        'notes' => 'notes',

        'status' => 'status',

        'mark_id' => 'mark',
        'car_model_id' => 'model',
        'car_part_id' => 'Part',
        'car_part_id' => 'Part',
        'parts.*.car_part_id' => 'Part',
        'parts.*.car_part_price' => 'Part price',
        'order_status' => 'order status',
        'ordering' => 'ordering',
        'address_title' => 'Address',
        'nearest_place' => 'Nearest landmark',
        'address_type_id' => 'Address type',
        'address_id' => 'address',
        'location' => 'location on the map',
        'lat' => 'coordinates',
        'lng' => 'Coordinates',
        'code' => 'code',
        'products' => 'pieces',
        'products.*' => 'pieces',
        'products.*.car_part_image' => 'Part image',
        'products.*.part_name' => 'Part name',
        'products.*.m_country_id' => 'Country of origin',
        'products.*.qty' => 'quantity',
        'm_country_id' => 'Country of origin',

        'car_brand_id' => 'Car Brand',
        'brand_id' => 'Brand',
        'car_model_id' => 'Car Model',
        'car_type_id' => 'Car Classification',
        'package_id' => "package",
        'car_licence_image' => 'Car License Image',
        'car_form_image' => 'Car Form Image',
        'car_back_image' => 'car back image',
        'car_insurance_image' => "car front image",
        'diving_licence_no' => "Driving License Copy",
        'car_number' => 'car number',
        'car_number' => 'car number',
        'receiver_id' => 'Receiver',
        'sender_id' => 'sender',
        'order_id' => 'order number',
        'transaction_id' => 'Payment ID',
        'offer_id' => 'offer price',
        'cancel_reason_id' => 'Reason for cancellation',
        'order_status' => 'order status',
        'offer_price' => 'offer price',
        'cost_reason' => 'The reason for the price change',
        'start_location' => 'starting point',
        'start_location.*' => 'starting point',
        'end_location.*' => 'going point',
        'budget' => 'your budget',
        'order_type' => 'Order type',
        'distance' => 'distance',
        'expected_time' => 'expected time of arrival',
        'expected_route' => 'Route',
        'rate' => 'rate',
        'review' => 'reviews',
        'images.*.gallery_category_id' => 'image category',
        'images.*.gallery_category_id' => 'category image',
        'images.*.is_active' => 'active image',

        'images.*.media' => 'image',
        'image' => 'image'
    ] + $attributes,

    'values' => [
        'send_vai' => [
            'sms' => 'sms',
            'email' => 'email'
        ],
        'platform' => [
            'website' => 'website',
            'app'     => 'application',
            'both'    => 'both'
        ]
    ]

];
