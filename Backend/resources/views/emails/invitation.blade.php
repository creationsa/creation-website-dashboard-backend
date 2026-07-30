<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Template</title>
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
            background-color: #F8F8F8;

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
            background-color: #55C0A2;
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
            color: #55C0A2;
            text-decoration: none;
        }
    </style>
</head>

<body>

    <div class="container">
        <table width="100%" style="margin-bottom: 20px;">
            <tr>
                <td align="left">
                    <img src="{{asset('assets/images/logo/logo_en.png')}}" alt="Darf Logo" style="height: 40px;">
                </td>
                <td align="right" style="font-size: 20px; color: #101b21;">
                    {{$data['date']}}
                </td>
            </tr>
        </table>

        <div class="card">
            <div class="main-content">

                <h1>Hello {{$data['name']}}</h1>
                <p>This invitation has been sent especially to you.</p>

                <div class="invitation-image">
                    <img src="{{$data['image']}}" alt="Invitation Image" style="width:100%; height:100%;">
                    <div class="guest-name">{{$data['name']}}</div>
                </div>
                <a href="{{$data['url']}}" class="button">VIEW THE CARD</a>
            </div>
        </div>

        <div class="footer">
            <p>If you have any questions, feel free message us at <a href="mailto:support@darf.co">support@darf.co</a>. All right reserved. Update email preferences or unsubscribe.</p>
            <!-- <p>5781 King fahed, Riyadh, Saudi Arabia</p> -->
            <p><a href="{{ env('APP_URL') . '/terms-and-conditions' }}">Terms of use</a> | <a href="{{ env('APP_URL') . '/privacy-policy' }}">Privacy Policy</a></p>
        </div>
    </div>

</body>

</html>