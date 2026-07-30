<?php

return [
    "actions" => [
        "created_successfully" => "created successfully",
        "edited_successfully" => "updated successfully",
        "deleted_successfully" => "deleted successfully",
        "cant_do_this_action" => "cant do this action",
        "cant_delete_this_bank_because_user_used" => "You cannot delete this bank because it is used by clients",
        "cant_delete_this_role_because_user_used" => "You cannot delete this role because it is used by clients",
        "cant_delete_this_item" => "cant delete this item",
        "cant_edit_this_item" => "cant edit this item",
    ],
    "auth" => [
        "not_ban" => "account is ban",
        "not_active" => "account is not active",
        "success_login" => "success login",
        "failed_try_again" => "failed in login data",
        "success_logout" => "success logout",
        "success_update" => "success update",
        "Success_login" => "success login",
        "failure_try_again" => "failed in login data",
        "Success_logout" => "success logout",

    ],
    "city" => [
        "updated" => "City updated",
        "created" => "City created successfully",
        "destroy" =>  "City deleted successfully ",
    ],
    "country" => [
        "updated" => "Country updated",
        "created" => "Country created successfully",
        "destroy" =>  "Country deleted successfully ",
    ],
    "district" => [
        "updated" => "District updated",
        "created" => "District created successfully",
        "destroy" =>  "District deleted successfully ",

    ],
    "region" => [
        "updated" => "Region updated",
        "created" => "Region created successfully",
        "destroy" =>  "Region deleted successfully ",

    ],
    "en" => [
        "name" => "name in english ",
        "desc" => "description in english ",
        "title"   => "title in english ",
        "nationality" => "nationality in english ",
        "strategy" => "strategy in english ",
        "vision" => "vision in english ",
        "message" => "message in english ",
        "hero_intro" => "hero intro in english ",
        "about" => "about in english ",
        "question" => "question in english ",
        "goals" => "goals in english ",
    ],
    "ar" => [
        "name" => "name in arabic ",
        "desc" => "description in arabic ",
        "title"   => "title in arabic ",
        "nationality" => "nationality in arabic ",
        "strategy" => "strategy in arabic ",
        "vision" => "vision in arabic ",
        "message" => "message in arabic ",
        "hero_intro" => "hero intro in arabic ",
        "about" => "about in arabic ",
        "question" => "question in arabic ",
        "goals" => "goals in arabic ",
    ],
    'messages' => [
        'saved' => "saved",
        'user_class_not_found' => 'user class not found',
        'add_link_or_provider' => 'You should add provider or external link to offer',
        'email_already_exists_number' => 'Email already exists number :row',
        'phone_already_exists_number' => 'Phone already exists number :row',
        'phone_code_not_found_number' => 'Country code not found :row',
        'brand_not_found' => 'Brand not found',
        'sub_category_not_found' => 'Sub category not found',
        'sub_sub_category_not_found' => 'Sub-Sub category not found',
        'cant_send_this_coupon' => 'cant send this coupon',
    ],
    'key_points' => [
        'national_id'    => 'national id',
        'income'         => 'income value',
        'utility_bill'   => 'utility bill',
        'car_license'    => 'car license',
        'club_id'        => 'club id',
        'join_circle'    => 'join to circle',
        'invite_friends' => 'invite friends',
        'hr_letter'      => 'HR Letter',
        'bank_statement' => 'bank statement',
    ],
    'notifications' => [
        'user_documents'    =>  [
            'title' => [
                'approved' => [
                    'national_id' => 'Congratulations, your data has been verified',
                    'club_id' => 'Congratulations, your data has been verified',
                    'car_license' => 'Congratulations, your data has been verified',
                    'hr_letter' => 'Congratulations, your data has been verified',
                    'income' => 'Congratulations, your data has been verified',
                    'utility_bill' => 'Congratulations, your data has been verified',
                    'bank_statement' => 'Congratulations, your data has been verified',
                ],
                'rejected' => [
                    'national_id' => 'Sorry, the ID card has been rejected',
                    'club_id' => 'Sorry, club membership has been declined',
                    'car_license' => 'Sorry, your car license has been refused',
                    'hr_letter' => 'Sorry, the HR letter was rejected',
                    'income' => 'Sorry, your monthly income has been declined',
                    'utility_bill' => 'Sorry, your utility bill has been declined',
                    'bank_statement' => 'Sorry, the bank statement was rejected',
                ],

            ],
            'body' => [
                'approved' => [
                    'national_id' => 'Congratulations, your ID has been verified',
                    'club_id' => 'Congratulations, your club membership has been verified',
                    'car_license' => 'Congratulations, your car license has been verified',
                    'hr_letter' => 'Congratulations, your HR letter has been verified',
                    'income' => 'Congratulations, your monthly income has been verified',
                    'utility_bill' => 'Congratulations, your utility bill has been verified',
                    'bank_statement' => 'Congratulations, your bank statement has been verified',
                ],
                'rejected' => [
                    'national_id' => 'Make sure that you upload the right document, obvious and not shaky.',
                    'club_id' => 'Make sure that you upload the right document, obvious and not shaky.',
                    'car_license' => 'Make sure that you upload the right document, obvious and not shaky.',
                    'hr_letter' => 'Make sure that you upload the right document, obvious and not shaky.',
                    'income' => 'Make sure that you upload the right document, obvious and not shaky.',
                    'utility_bill' => 'Make sure that you upload the right document, obvious and not shaky.',
                    'bank_statement' => 'Make sure that you upload the right document, obvious and not shaky.',
                ],

            ],
        ],
        'installment'    =>  [
            'title' => [
                'alert' => 'Next Installment for circle :installment_id',
            ],
            'body' => [
                'alert' => 'We remind you of the required installment payment date',
            ]
        ],
        'circle'    =>  [
            'title' => [
                'start' => 'Circle Started number :sub_circle',
            ],
            'body' => [
                'start' => 'We remind you of the beginning of the circle and the commitment to the next payments',
            ]
        ],
    ],

    "excel" => [
        "clients" => [
            "name" => "name",
            "phone_code" => "phone code",
            "phone" => "phone",
            "email" => "email",
        ],
    ],

    "permissions" => [
        'admin' => 'admin',
        'profile' => 'profile',
        'country' => 'country',
        'city' => 'city',
        'category' => 'category',
        'brand' => 'brand',
        'productLabel' => 'productLabel',
        'branch' => 'branch',
        'branchArea' => 'branchArea',
        'nutritionFact' => 'nutritionFact',
        'offer' => 'offer',
        'influencer' => 'influencer',
        'coupon' => 'coupon',
        'employee' => 'employee',
        'potencies' => 'potencies',
        'dietaries' => 'dietaries',
        'lifeStages' => 'lifeStages',
        'flavors' => 'flavors',
        'colors' => 'colors',
        'packageSizes' => 'packageSizes',
        'apparelSizes' => 'apparelSizes',
        'sizes' => 'sizes',
        'products' => 'products',
        'productVariants' => 'productVariants',
        'contacts' => 'contacts',
        'about' => 'about',
        'metadata' => 'metadata',
        'settings' => 'settings',
        'statistics' => 'statistics',
        'slider' => 'slider',
        'cancelReason' => 'cancelReason',
        'rejectReason' => 'rejectReason',
        'transferReasons' => 'transferReasons',
        'comingSoon' => 'comingSoon',
        'suppliers' => 'suppliers',
        'block' => 'block',
        'events' => 'events',
        'sections' => 'sections',
        'homeSections' => 'homeSections',
        'role' => 'role',
        'permission' => 'permission',
        'client' => 'client',

        'staticPage' => 'staticPage',
        'questionCategory' => 'questionCategory',
        'faq' => 'faq',
        'order' => 'order',

    ]
];
