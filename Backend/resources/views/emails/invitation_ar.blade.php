<!DOCTYPE html>
<html lang="ar">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>قالب البريد الإلكتروني</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f8f8;
        }

        .card {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }

        .main-content {
            text-align: center;
        }

        .main-content h1 {
            font-size: 24px;
            color: #101b21;
            margin: 0;
        }

        .main-content p {
            font-size: 16px;
            color: #60676b;
            margin: 10px 0;
        }

        .invitation-image {
            margin: 20px 0;
            position: relative !important;
            background-color: #333;
        }

        .guest-name {
            position: absolute !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            color: #fff;
            font-size: 12px;
            font-weight: bold;
        }

        .button {
            background-color: #55c0a2;
            color: white !important;
            padding: 10px 20px;
            text-align: center;
            border-radius: 5px;
            text-decoration: none;
            display: inline-block;
        }

        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #666;
            text-align: center;
        }

        .footer a {
            color: #55c0a2;
            text-decoration: none;
        }
    </style>
</head>

<body>
    <div class="container">
        <table width="100%" style="margin-bottom: 20px">
            <tr>
                <td align="right">
                    <img
                        src="{{asset('assets/images/logo/logo_ar.png')}}"
                        alt="Darf Logo"
                        style="height: 40px" />
                </td>
                <td align="left" style="font-size: 20px; color: #101b21">
                    {{$data['date']}}
                </td>
            </tr>
        </table>

        <div class="card">
            <div class="main-content">
                <h1>مرحبـــا {{$data['name']}}</h1>
                <p>لقد تم إرسال هذه الدعوة إليك خصيصًا.</p>

                <div class="invitation-image">
                    <img
                        src="{{$data['image']}}"
                        alt="Invitation Image"
                        style="width: 100%; height: 100%" />
                    <div class="guest-name">{{$data['name']}}</div>
                </div>
                <a href="{{$data['url']}}" class="button">عرض البطاقة </a>
            </div>
        </div>

        <div class="footer">
            <p>
                إذا كان لديك أي استفسار، لا تتردد في مراسلتنا على
                <a href="mailto:support@darf.co">support@darf.co</a>. جميع الحقوق
                محفوظة. يمكنك تحديث تفضيلات البريد الإلكتروني أو إلغاء الاشتراك.
            </p>
            <!-- <p>5781 King fahed, Riyadh, Saudi Arabia</p> -->
            <p>
                <a href="{{ env('APP_URL') . '/terms-and-conditions' }}">شروط الاستخدام
                </a>
                |
                <a href="{{ env('APP_URL') . '/privacy-policy' }}">سياسة الخصوصية </a>
            </p>
        </div>
    </div>
</body>

</html>