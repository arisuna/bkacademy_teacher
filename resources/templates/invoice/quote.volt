<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>{{ company.name }} Invoice</title>
    <style>
        h4{
            font-size:20px;
        }
        .invoice-box {
            width:100%;
            margin: auto;
            padding: 0px;
            border: 1px solid #eee;
            font-size: 16px;
            line-height: 24px;
            font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
            color: #555;
        }

        .invoice-box table {
            width: 100%;
            line-height: inherit;
            text-align: left;
        }

        .invoice-box table td {
            padding: 5px;
            vertical-align: top;
        }

        .invoice-box table tr td:nth-child(2) {
            text-align: right;
        }

        .invoice-box table tr.top table td {
            padding-bottom: 20px;
        }

        .invoice-box table tr.top table td.title {
            font-size: 45px;
            line-height: 45px;
            color: #333;
        }

        .invoice-box table tr.information table td {
            padding-bottom: 40px;
        }

        .invoice-box table tr.heading td {
            background: #eee;
            border-bottom: 1px solid #ddd;
            font-weight: bold;
        }

        .invoice-box table tr.details td {
            padding-bottom: 20px;
        }

        .invoice-box table tr.item td{
            border-bottom: 1px solid #eee;
        }

        .invoice-box table tr.item.last td {
            border-bottom: none;
        }

        .invoice-box table tr.total td:nth-child(2) {
            border-top: 2px solid #eee;
            font-weight: bold;
        }

        @media only screen and (max-width: 600px) {
            .invoice-box table tr.top table td {
                width: 100%;
                display: block;
                text-align: center;
            }

            .invoice-box table tr.information table td {
                width: 100%;
                display: block;
                text-align: center;
            }
        }

        /** RTL **/
        .rtl {
            direction: rtl;
            font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
        }

        .rtl table {
            text-align: right;
        }

        .rtl table tr td:nth-child(2) {
            text-align: left;
        }
    </style>
</head>

<body>
<div class="invoice-box">
    <table cellpadding="0" cellspacing="0">
        <tr class="top">
            <td colspan="5">
                <table>
                    <tr>

                        <td class="title">
                            {% if logoSource != '' %}
                                <img src="{{ logoSource }}" style="width:100%; max-width:200px;">
                            {% else %}
                                <h4>{{ company.name }}</h4>
                            {% endif %}
                        </td>

                        <td>
                            {{ constants['QUOTE_TEXT'] }} #: {{ quote.number }}<br>
                            {{ constants['DATE_TEXT'] }}: {{ quote.date }}<br>
                            {{ constants['REFERENCE_TEXT'] }}: {{ quote.reference }}<br>
                            {{ constants['ORIGIN_TEXT'] }}: {{ quote.origin }}<br>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>

        <tr class="information">
            <td colspan="5">
                <table>
                    <tr>
                        <td>
                            {{ company.name }}<br>
                            {{ company.address }}<br>
                            {{ company.town }}, {{ company.zipcode }},
                            {{ company.country_name }}
                        </td>

                        <td>
                            <strong>{{ constants['REQUESTER_TEXT'] }}</strong><br/>
                            {{ quote.contact_name }}<br>
                            {{ quote.email }}<br>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr class="heading">
            <td>
                {{ constants['ITEM_TEXT'] }}
            </td>
            <td>
                {{ constants['QUANTITY_TEXT'] }}
            </td>
            <td>
                {{ constants['PRICE_TEXT'] }}
            </td>
            <td>
                {{ constants['CURRENCY_TEXT'] }}
            </td>
            <td>
                {{ constants['AMOUNT_TEXT'] }}
            </td>
        </tr>
        {% for item  in dataItems %}
            <tr class="item">
                <td>
                    {{ item['name'] }}
                </td>
                <td>
                    {{ item['quantity'] }}
                </td>
                <td>
                    {{ item['price'] }}
                </td>
                <td>
                    {{ item['currency'] }}
                </td>
                <td>
                    {{ item['total'] }}
                </td>
            </tr>
        {% endfor %}


        <tr class="total">
            <td colspan="2">&nbsp;</td>
            <td>{{ constants['SUBTOTAL_TEXT'] }}</td>
            <td>{{  quote.currency }}</td>
            <td>
                {{ quote.subtotal }}
            </td>
        </tr>
        {%  if quote.discount_value > 0 or quote.discount_value != '0.00'  %}
        <tr class="total">
            <td colspan="2">&nbsp;</td>
            <td>{{ constants['DISCOUNT_TEXT'] }}</td>
            <td>%</td>
            <td>
                {{ quote.discount_value }}
            </td>
        </tr>
        <tr class="total">
            <td colspan="3">&nbsp;</td>
            <td>{{ quote.currency }}</td>
            <td>
                {{ quote.discount_amount }}
            </td>
        </tr>
        {%  endif %}
        {%  if quote.tax_rate > 0 or quote.tax_rate != '0.00'  %}
        <tr class="total">
            <td colspan="2">&nbsp;</td>
            <td>{{ constants['TAX_TEXT'] }}</td>
            <td>%</td>
            <td>
                {{ quote.tax_rate }}
            </td>
        </tr>
        <tr class="total">
            <td colspan="3">&nbsp;</td>
            <td>{{ quote.currency }}</td>
            <td>
                {{ quote.tax_amount }}
            </td>
        </tr>
        {%  endif  %}
        <tr class="total">
            <td colspan="2">&nbsp;</td>
            <td>{{ constants['TOTAL_TEXT'] }}</td>
            <td>{{ quote.currency }}</td>
            <td>
                {{ quote.total }}
            </td>
        </tr>


        <tr class="heading">
            <td colspan="5">
                {{ constants['NOTE_INSTRUCTION_TEXT'] }}
            </td>
        </tr>

        <tr class="details">
            <td colspan="5">
                {{ quote.note }}
            </td>
        </tr>

        <tr class="heading">
            <td colspan="5">
                {{ constants['QUOTE_MESSAGE_TEXT'] }}
            </td>
        </tr>

        <tr class="details">
            <td colspan="5">
                {{ quote.invoice_note }}
            </td>
        </tr>

    </table>
</div>
</body>
</html>
