<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event Confirmation</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #E9F6F4;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            flex-direction: column;
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 90%;
            max-width: 400px;
            margin-bottom: 10px;
            padding: 0 10px;
        }

        .header img {
            width: 50px;
        }

        .header-date {
            font-size: 14px;
            color: #666;
        }

        .container {
            background-color: white;
            width: 90%;
            max-width: 400px;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
        }

        .event-details {
            margin: 20px 0;
            font-size: 16px;
            line-height: 1.5;
        }

        .button {
            background-color: #6BC1B6;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
            margin-top: 10px;
        }

        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: gray;
        }

        .footer a {
            color: #6BC1B6;
            text-decoration: none;
        }

        /* Responsive styles */
        @media (max-width: 480px) {
            .header img {
                width: 40px;
            }

            .header-date {
                font-size: 12px;
            }

            .container {
                padding: 15px;
            }

            .event-details {
                font-size: 14px;
            }

            .button {
                padding: 8px 16px;
                font-size: 14px;
            }

            .footer {
                font-size: 10px;
            }
        }
    </style>
</head>

<body>
    <div class="header">
        <img src="{{asset('assets/images/logo/logo_en.png')}}" alt="darf logo">
        <span class="header-date">{{$data['date']}}</span>
    </div>

    <div class="container">
        <h2>Dear {{$data['guest_name']}}</h2>
        <p>Thank you for confirming your attendance at {{$data['event_name']}}! We are excited to have you join us.</p>

        <div class="event-details">
            <strong>Event Details</strong>
            <p>Date: {{$data['event_date']}}</p>
            <p>Time: {{$data['event_time']}}</p>
            <p>Venue: {{$data['event_address']}}</p>
        </div>

        <a href="{{$data['url']}}" class="button">VIEW QR CODE</a>

        <div class="footer">
            <p>To streamline your entry, please find your unique QR code attached below. Present this code at the entrance to gain quick access to the event.</p>
            <p>If you have any questions, feel free to message us at <a href="mailto:support@darf.co">support@darf.co</a>. All rights reserved. Update email preferences or unsubscribe.</p>
            <!-- <p>5781 King Fahd, Riyadh, Saudi Arabia</p> -->
            <p><a href="#">Terms of use</a> | <a href="#">Privacy Policy</a></p>
        </div>
    </div>
</body>

</html>