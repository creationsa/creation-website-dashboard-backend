<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class WhatsappService
{
  protected string $apiUrl;
  protected string $token;
  protected string $sender;
  protected string $templateId;
  protected string $templateIdAr;

  public function __construct()
  {
    $this->apiUrl = env('KARIX_API_URL');
    $this->token = env('KARIX_BEARER_TOKEN');
    $this->sender = env('KARIX_SENDER_WHATSAPP');
    $this->templateId = env('KARIX_INVITE_TEMPLATE_ID');
    $this->templateIdAr = env('KARIX_INVITE_TEMPLATE_ID_AR');
  }

  /**
   * Send invitation template with dynamic header image.
   *
   * @param string $recipientPhone
   * @param array $placeholders [name, event, date]
   * @param string $media
   * @param string $guestToken
   * @return array
   */
  public function sendInvitation(string $recipientPhone, array $placeholders, $media, array $data): array
  {
    // Build payload
    $templateIdAr = $this->templateIdAr;
    if($data[4] == 'male'){
      $templateIdAr = env('KARIX_INVITE_TEMPLATE_ID_AR_MALE');
    }else if($data[4] == 'female'){
      $templateIdAr = env('KARIX_INVITE_TEMPLATE_ID_AR_FEMALE');
    }

    // dd(env('API_URL')."/api/website/accept-invitation?guest_token=".$data[0]."&user_template_token=".$data[1]."&is_attending=1");
    $payload = [
      "message" => [
        "channel" => "WABA",
        "content" => [
          "preview_url" => true,
          "type" => "MEDIA_TEMPLATE",
          "mediaTemplate" => [
            "templateId" => $data[3] == 'ar' ? $templateIdAr : $this->templateId,
            "media" => [
              "type" => "image",
              "url" => $media != "" ? $media : asset('assets/images/templates/template.png')
            ],
            "bodyParameterValues" => (object) [
              "0" => $placeholders[0],
              "1" => $placeholders[1] != null ? $placeholders[1] : 'his event',
              "2" => $placeholders[2] != null ? $placeholders[2] : 'host',
            ],
            "buttons" => [
              "actions" => [
                [
                  "type" => "url",
                  "index" => "0",
                  "payload" => $data[0]
                ],
                // [
                //   "type" => "url",
                //   "index" => "1",
                //   "payload" => $data[0]
                // ]
              ]
            ]
          ],
          "shorten_url" => false
        ],
        "recipient" => [
          "to" => '966' . $recipientPhone,   //todo
          "recipient_type" => "individual",
          "reference" => [
            "cust_ref" => "Some Customer Ref" . uniqid(),
            "messageTag1" => "Message Tag Val" . uniqid(),
            "conversationId" => "Conv_" . uniqid()
          ]
        ],
        "sender" => [
          "from" => $this->sender
        ],
      ],
      "metaData" => [
        "version" => "v1.0.9"
      ]
    ];

    // Send request to Karix
    $response = Http::withHeaders([
      'Accept' => '*/*',
      'Content-Type' => 'application/json',
      // 'Accept-Language' => app()->getLocale() == 'ar' ? 'ar-sa' : 'en-US',
      'Authentication' => 'Bearer ' . $this->token,
    ])->post($this->apiUrl, $payload);
    info($response);
    // Success
    if ($response->successful()) {
      return [
        'status' => 'sent',
        'code'   => $response->status(),
        'data'   => $response->json()
      ];
    }

    // Error (log real body)
    Log::error('Karix invitation failed', [
      'status' => $response->status(),
      'response' => $response
    ]);

    return [
      'status' => 'error',
      'code'   => $response->status(),
      'body'   => $response->json() ?? $response->body()
    ];
  }
}
