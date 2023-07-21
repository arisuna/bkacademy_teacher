<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>{{ company.name }} Invoice</title>
    <style>
        h4 {
            font-size: 20px;
        }

        .invoice-box {
            width: 100%;
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

        .invoice-box table tr.item td {
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
                            {{ constants['INVOICE_TEXT'] }} #: {{ invoice.number }}<br>
                            {{ constants['DATE_TEXT'] }}: {{ invoice.date }}<br>
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
                            <strong>{{ constants['INVOICED_BY_TEXT'] }}</strong><br/>
                            {{ company.name }}<br>
                            {{ company.address }}<br>
                            {{ company.town }}, {{ company.zipcode }},
                            {{ company.country_name }}
                        </td>

                        <td>
                            <strong>{{ constants['INVOICED_TO_TEXT'] }}</strong><br/>
                            {{ client_company.name }}<br>
                            {{ invoice.contact_name }}<br>
                            {{ invoice.email }}<br>
                            {{ invoice.address }}<br>
                            {{ invoice.town }}<br>
                            {{ invoice.country_name }}<br>
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
            <td>{{ invoice.currency }}</td>
            <td>
                {{ invoice.subtotal }}
            </td>
        </tr>
        <tr class="total">
            <td colspan="2">&nbsp;</td>
            <td>{{ constants['DISCOUNT_TEXT'] }}</td>
            <td>%</td>
            <td>
                {{ invoice.discount_value }}
            </td>
        </tr>
        <tr class="total">
            <td colspan="3">&nbsp;</td>
            <td>{{ invoice.currency }}</td>
            <td>
                {{ invoice.discount_amount }}
            </td>
        </tr>
        <tr class="total">
            <td colspan="2">&nbsp;</td>
            <td>{{ constants['TAX_TEXT'] }}</td>
            <td>%</td>
            <td>
                {{ invoice.tax_rate }}
            </td>
        </tr>
        <tr class="total">
            <td colspan="3">&nbsp;</td>
            <td>{{ invoice.currency }}</td>
            <td>
                {{ invoice.tax_amount }}
            </td>
        </tr>
        <tr class="total">
            <td colspan="2">&nbsp;</td>
            <td>{{ constants['TOTAL_TEXT'] }}</td>
            <td>{{ invoice.currency }}</td>
            <td>
                {{ invoice.total }}
            </td>
        </tr>

        <tr class="heading">
            <td colspan="5">
                {{ constants['NOTE_INSTRUCTION_TEXT'] }}
            </td>
        </tr>

        <tr class="details">
            <td colspan="5">
                {{ invoice.note }}
            </td>
        </tr>

        <tr class="heading">
            <td colspan="5">
                {{ constants['PAYMENT_TO_TEXT'] }}
            </td>
        </tr>

        <tr class="item">
            <td>{{ constants['COMPANY_NAME_TEXT'] }}</td>
            <td colspan="4" style="text-align: left;">
                {{ company.name }}
            </td>
        </tr>
        <tr class="item">
            <td>{{  constants['ADDRESS_TEXT'] }}</td>
            <td colspan="4" style="text-align: left;">
                {{ company.address }}, {{ company.town }} , {{ company.zipcode }}, {{ company.country_name }}
            </td>
        </tr>
        <tr class="item">
            <td>
                {{  constants['BANK_ACCOUNT_TEXT'] }}
            </td>
            <td colspan="4" style="text-align: left;">
                {{ payment.invoice_bank_account }}
            </td>
        </tr>
        <tr class="item">
            <td>
                {{  constants['BANK_NAME_TEXT'] }}
            </td>
            <td colspan="4" style="text-align: left;">
                {{ payment.invoice_bank_name }}
            </td>
        </tr>

    </table>
</div>
</body>
</html>