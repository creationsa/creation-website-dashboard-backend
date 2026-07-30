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
          padding: 20px 0;
          margin: 0 auto;
          justify-content: center;
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
                There is a new blog
            </p>
        </div>

        <div
            style="
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 20px;
            margin: 50px 0;
            padding: 10px;
            box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
            border-radius: 15px;
            ">
            <div>
                <img src="{{ $blog['main_image']['media'] }}" alt="marsol"
                    style="width: 300px;" />
            </div>

            <div style="margin-left: 35px">
                <h1>{{ $blog['title'] }}</h1>
                <p style="color: #838282">{{ \Carbon\Carbon::parse($blog['created_at'])->format('Y M d') }}</p>
                <p style="color: #838282">
                    {!! substr($blog['first_desc'], 50) !!}
                </p>
            </div>
        </div>

        <div
            style="display: flex; justify-content: center; align-items: center; text-align: center; margin-block: 50px">
            <a href="https://ma5sos.ui.aait-d.com/en/blogs/{{ $blog['slug'] }}"
                style="
            background: linear-gradient(
              270deg,
              #f83600 1.94%,
              #fe8c00 66.97%
            ) !important;
            line-height: 34px;
            color: white;
            border: none;
            font-size: 20px;
            font-weight: bold;
            display: block;
            text-decoration:none;
            padding: 20px;
            width: 300px;
            border-radius: 15px;
            cursor: pointer;
            margin: 0 auto;
            justify-content: center;
          ">
                Read The News
            </a>
        </div>

        <div
            style="
          background-image: url({{ url('dashboardAssets/images/emails/intersect.png') }});
          background-repeat: no-repeat;
          background-position: top;
          background-size: 100%;
          height: 300px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        ">
            <div
                style="
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 30px;
                margin-bottom: 10px;">

                {{-- @if (setting('instagram')) --}}
                    <div>
                        <a href="{{setting('instagram')}}"
                            style="
                            text-decoration: none;
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
                            cursor: pointer;">
                            <i class="fa-brands fa-instagram"></i>
                        </a>
                    </div>
                {{-- @endif --}}

                {{-- @if (setting('facebook')) --}}
                    <div>
                        <a href="{{setting('facebook')}}"
                            style="
                            text-decoration: none;
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
                            cursor: pointer;">
                            <i class="fa-brands fa-facebook"></i>
                        </a>
                    </div>
                {{-- @endif --}}

                {{-- @if (setting('twitter')) --}}
                    <div>
                        <a href="{{ setting('twitter') }}"
                            style="
                            text-decoration: none;
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
                            cursor: pointer;">

                            <i class="fa-brands fa-twitter"></i>
                        </a>
                    </div>
                {{-- @endif --}}
            </div>

            <div style="text-align: center; color: white">
                <p>&copy Ma5soos. All rights Reserved</p>
            </div>
        </div>
    </div>
</body>

</html>
