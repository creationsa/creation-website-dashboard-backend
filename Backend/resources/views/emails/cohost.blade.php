<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cohost Invitation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #E8F2F0;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }

        .header .logo img {
            height: 40px;
        }

        .header .date {
            font-size: 14px;
            color: #666;
        }

        .card {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }

        .main-content {
            text-align: center;
            margin: 20px 0;
        }

        .main-content h1 {
            font-size: 24px;
            color: #333;
            margin: 0;
        }

        .main-content p {
            font-size: 16px;
            color: #777;
            margin: 10px 0;
        }

        .button {
            background-color: #55C0A2;
            color: white;
            padding: 10px 20px;
            text-align: center;
            border-radius: 5px;
            text-decoration: none;
            display: inline-block;
            margin-top: 20px;
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
        <div class="header">
            <div class="logo">
                <img src="{{asset('assets/images/logo/logo_en.png')}}" alt="darf logo">
            </div>
            <div class="date">{{$data['date']}}</div>
        </div>

        <div class="card">
            <div class="main-content">
                <h1>Hello {{$data['name']}}</h1>
                <p>You have been invited as a co-host to this invitation {{$data['event_name']}}</p>
                <a href="{{$data['url']}}" class="button">ACCEPT</a>
            </div>
        </div>

        <div class="footer">
            <p>If you have any questions, feel free message us at <a href="mailto:support@darf.co">support@darf.co</a>. All right reserved.</p>
            <!-- <p>5781 King Fahed, Riyadh, Saudi Arabia</p> -->
            <p><a href="#">Terms of use</a> | <a href="#">Privacy Policy</a></p>
        </div>
    </div>

</body>

</html>