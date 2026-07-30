<!DOCTYPE html>
<html lang="ar" dir="rtl">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>تفاصيل الحدث</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: "Cairo", Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #e8f2f0;
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

        .title {
            font-size: 24px;
            color: #333;
            margin-bottom: 20px;
            text-align: center;
        }

        .content {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
        }

        @media (max-width: 640px) {
            .content {
                grid-template-columns: 1fr;
            }
        }

        .info {
            display: flex;
            flex-wrap: wrap;
            gap: 0.25rem;
            background-color: #f8f8f8;
            border: 1px solid #e2e8f0;
            border-radius: 0.375rem;
            align-items: center;
            padding: 8px;
            min-height: 60px;
        }

        .info p {
            font-weight: bold;
        }

        .info span {
            flex-grow: 1;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <div class="logo">
                <img src="{{asset('assets/images/logo/logo_ar.png')}}" alt="شعار دارف" />
            </div>
        </div>

        <h1 class="title">تفاصيل الحدث</h1>
        <div class="content">
            <div class="info">
                <p>اسم العميل:</p>
                <span>{{ $eventDetail->user_name }}</span>
            </div>
            <div class="info">
                <p>رقم الهاتف:</p>
                <span>{{ $eventDetail->phone }}</span>
            </div>
            <div class="info">
                <p>عدد المدعوين:</p>
                <span>{{ $eventDetail->invited_number }}</span>
            </div>
            <div class="info">
                <p>التاريخ:</p>
                <span>{{ $eventDetail->event_date }}</span>
            </div>
        </div>
    </div>
</body>

</html>