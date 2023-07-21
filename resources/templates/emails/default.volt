<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{{ subject }}</title>
</head>
<body>
<table width="100%" border="0" cellspacing="0" cellpadding="0"
       style="border-collapse:collapse;width:100%;padding:20px 10px;background-color: #F6F7F7;">
    <tr>
        <td style="padding:10px;">
            <table border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td width="32" valign="top" style="width:32px;padding-right:8px;">
                        <img src="https://static.relotalent.com/emails/info_circle_symbol.png" width="32" height="32">
                    </td>
                    <td>
                        <span style="font-size:14px;font-family:Arial,sans-serif;">{{ subject }}</span>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td style="padding:0;">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="width:100%;padding:10px;">
                <tr>
                    <td style="background-color:white;padding:21px 15px 21px 15px;border:1px solid #CCCCCC;border-radius:5px;">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="width:100%;">
                            <tr>
                                <td style="padding:10px 5px 10px 0; border-collapse: collapse;font-family:Arial,sans-serif;">
                                    {{ body }}
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td style="padding:0 15px">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="width:100%">
                <tr>
                    <td style="width:50%">
                        <span style="font-size:12px;font-family:Arial,sans-serif;color:darkgray">Sent by ReloTalent on {{ datetime }} </span>
                    </td>
                    <td align="right" style="padding-top:3px">
                        <img src="https://static.relotalent.com/emails/relotalent_logo_gray_250.png" width="200"
                             alt="SMXD logo">
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
</body>
</html>
