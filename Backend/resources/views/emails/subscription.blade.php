<!doctype html>
<html lang="{{ app()->getLocale() }}">

<head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title>Email Title</title>
    <meta name="description" content="New Account Email Template.">
    <style type="text/css">
        a:hover {
            text-decoration: none !important;
        }
    </style>
</head>

<body marginheight="0" topmargin="0" marginwidth="0" style="margin: 50px 0; background-color: #f2f3f8;" leftmargin="0">
    <!-- 100% body table -->
    <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
        style="max-width:700px;margin: auto; border-radius:3px; -webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);"
        style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
        <tr>
            <td>
                <table width="100%" height="100vh"
                    style="position: relative;;border-radius: 15px;background: linear-gradient(163.07deg, #29398C 2.04%, #2996B8 175.72%)"
                    border="0" cellspacing="0" cellpadding="0">
                    <tr style="z-index: 2;position: absolute;top: 0px; right: 40px;">
                        <td>
                            <img src="{{ asset('dashboardAssets/images/mail/back.png') }}" width="250" height=""
                                alt="back" style="z-index: 2;position: absolute;top: 0px; right: 0px;" />
                        </td>
                    </tr>
                    <tr>
                        <td style="height:80px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td style="text-align:center;">
                            <a title="logo" target="_blank">
                                <img width="240" src="{{ asset('dashboardAssets/images/mail/logo.jpeg') }}"
                                    title="logo" alt="logo">
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td style="height:20px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td>
                            <table width="100%" border="0" cellpadding="0" cellspacing="0"
                                style="max-width:670px;margin-inline: auto;  border-radius:3px;gap:15px;display: flex;flex-direction: column;justify-content: center; align-items: center;">
                                <tr>
                                    <td style="height:40px;">
                                        <div
                                            style="color:#555555;font-family:Poppins;line-height:1.2;padding-bottom:10px;">
                                            <div
                                                style="text-align:center;line-height:1.2;font-size:12px;color:#555555;font-family:Montserrat,Trebuchet MS,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Tahoma,sans-serif">
                                                <p
                                                    style="text-align:center;font-size:30px;line-height:1.2;word-break:break-word;margin:0">
                                                    <span
                                                        style="font-size:25px;color:#fff"><strong>{!! $data['title'] ?? '' !!}</strong></span>
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div
                                            style="line-height:1.5;font-size:12px;margin-block:5px 20px;font-family:Poppins;color:#fff">
                                            <img src="{{ $data['image'] ?? asset('dashboardAssets/images/mail/blog_image.png') }}"
                                                width="240" height="" alt="blog_image"
                                                style="border-radius: 10px ; width: 100%;display: block;font-size:15px;line-height:1.5;word-break:break-word;font-family:Poppins;margin:0" />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style="line-height:1.5;font-size:12px;font-family:Poppins;color:#fff">
                                            <p
                                                style="text-align:center;font-size:15px;line-height:1.5;word-break:break-word;font-family:Poppins;;margin:0">
                                                <span style="color:#fff;font-size:15px">{!! Str::limit($data['body'], $limit = 100, $end = '...') ?? '' !!}</span>
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 15px 0; ">
                                        <hr style="width:100%;color: #fff;" />
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 15px 0 30px; ">
                                        <div style="line-height:1.5;font-size:12px;font-family:Poppins;color:#fff">
                                            <a href="{{ $data['route'] ?? '' }}" target="_blank"
                                                style="place-content: center;
                                                        text-align: center;
                                                        border-radius:8px;
                                                        line-height: 45px;
                                                        overflow: hidden;
                                                        display: block;
                                                        background: #fff;
                                                        color:#29398C;
                                                        width: 100%;
                                                        height: 45px;
                                                        font-size: 18px;
                                                        text-decoration:none">
                                                continue reading
                                            </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="word-break:break-word;vertical-align:top;padding-bottom:0;padding-right:5px;padding-left:5px;place-content: center;margin: auto; display:flex;column-gap: 10px;"
                            valign="top">
                            <a href="https://www.whatsapp.com/" target="_blank"
                                style="place-content: center;
                                        display: flex;
                                        justify-content: center;
                                        align-items: center;
                                        padding: 5px;
                                        border-radius: 50%;
                                        border: 1px solid #fff;
                                        overflow: hidden;
                                        width: 30px;
                                        height: 30px;">
                                <img width="16" height=""
                                    src="{{ asset('dashboardAssets/images/mail/whatsapp.png') }}" alt="Facebook"
                                    title="Whatsapp" style="text-decoration:none;height:auto;border:none;display:block;"
                                    class="CToWUd">
                            </a>
                            <a href="https://www.facebook.com/" target="_blank"
                                style="place-content: center;
                                        display: flex;
                                        justify-content: center;
                                        align-items: center;
                                        padding: 5px;
                                        border-radius: 50%;
                                        border: 1px solid #fff;
                                        overflow: hidden;
                                        width: 30px;
                                        height: 30px;">
                                <img width="10" height=""
                                    src="{{ asset('dashboardAssets/images/mail/facebook.png') }}" alt="Facebook"
                                    title="Facebook" style="text-decoration:none;height:auto;border:none;display:block;"
                                    class="CToWUd">
                            </a>

                            <a href="https://www.linkedin.com/" target="_blank"
                                style="place-content: center;
                                        display: flex;
                                        justify-content: center;
                                        align-items: center;
                                        padding: 5px;
                                        border-radius: 50%;
                                        border: 1px solid #fff;
                                        overflow: hidden;
                                        width: 30px;
                                        height: 30px;">
                                <img width="16" height=""
                                    src="{{ asset('dashboardAssets/images/mail/linkedin.png') }}" alt="Facebook"
                                    title="Linkedin" style="text-decoration:none;height:auto;border:none;display:block;"
                                    class="CToWUd">
                            </a>
                            <a href="https://www.twitter.com/" target="_blank"
                                style="place-content: center;
                                        display: flex;
                                        justify-content: center;
                                        align-items: center;
                                        padding: 5px;
                                        border-radius: 50%;
                                        border: 1px solid #fff;
                                        overflow: hidden;
                                        width: 30px;
                                        height: 30px;">
                                <img width="16" height=""
                                    src="{{ asset('dashboardAssets/images/mail/twitter.png') }}" alt="Facebook"
                                    title="Twitter"
                                    style="text-decoration:none;height:auto;border:none;display:block;"
                                    class="CToWUd">
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td style="height:80px;">
                            <div
                                style="color:#fff;font-family:Montserrat,Trebuchet MS,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Tahoma,sans-serif;line-height:1.2;padding-top:20px;padding-right:40px;padding-bottom:30px;padding-left:40px">
                                <div
                                    style="line-height:1.2;font-size:15px;font-family:Montserrat,Trebuchet MS,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Tahoma,sans-serif;color:#555555">
                                    <p
                                        style="font-size:15px;line-height:1.2;word-break:break-word;text-align:left;font-family:Montserrat,Trebuchet MS,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Tahoma,sans-serif;margin:0;text-align: center;">
                                        <span style="text-align: center;color:#fff;font-size:16px">© 2023 Al Almiya Al
                                            Hura. All Rights Reserved </span>
                                    </p>
                                </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <!--/100% body table-->
</body>

</html>
