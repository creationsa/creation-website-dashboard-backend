<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
        integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
        href="https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@100;200;300;400;500;600;700;800;900&display=swap"
        rel="stylesheet" />
    <title>Email Makhsus</title>
</head>

<body>
    <div
        style="
        width: 768px;
        margin: 0 auto !important;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Times New Roman';
      ">
        <div
            style="
          width: 768px;
          border-bottom: 1px solid #eee;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px 0;
        ">
            <img src="{{ url('dashboardAssets/images/emails/logo.jpeg') }}" style="width: 280px" />
        </div>

        <div
            style="
          text-align: center;
          border-bottom: 1px solid #eee;
          padding: 20px 0;
        ">
            <h1>
                <span> After Greetings </span>
                <i class="fa-solid fa-hand" style="color: orange"></i>
            </h1>

            <p style="color: #838282; font-size: 20px; line-height: 40px">
                {{ $reply }}
            </p>
        </div>

        <div
            style="
          text-align: center;
          border-bottom: 1px solid #eee;
          padding: 20px 0;
          margin-bottom: 80px;
        ">
            <div>
                <a href="{{ setting('instgram') }}"
                    style="
                background: transparent;
                border: 1px solid white;
                font-size: 35px;
                color: white;
                width: 60px;
                height: 60px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                text-decoration: none;
              ">
                    <i class="fa-brands fa-instagram"></i>
                </a>
            </div>

            <div>
                <a href="{{ setting('facebook') }}"
                    style="
                background: transparent;
                border: 1px solid white;
                font-size: 35px;
                color: white;
                width: 60px;
                height: 60px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                text-decoration: none;
              ">
                    <i class="fa-brands fa-facebook"></i>
                </a>
            </div>

            <div>
                <a href="{{ setting('twitter') }}"
                    style="
                background: transparent;
                border: 1px solid white;
                font-size: 35px;
                color: white;
                width: 60px;
                height: 60px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                text-decoration: none;
              ">
                    <i class="fa-brands fa-twitter"></i>
                </a>
            </div>
        </div>

        <div style="text-align: center; color: white">
            <p>&copy Ma5soos. All rights Reserved</p>
        </div>
    </div>
    </div>
</body>

</html>
