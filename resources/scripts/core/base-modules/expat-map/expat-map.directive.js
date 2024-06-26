/**
 * [jvectormap directive]
 * @return {[type]} [created by nhuan@relotalent.com]
 */

/**
    List of country
    1	BD	Bangladesh
    2	BE	Belgium
    3	BF	Burkina Faso
    4	BG	Bulgaria
    5	BA	Bosnia and Herz.
    6	BN	Brunei
    7	BO	Bolivia
    8	JP	Japan
    9	BI	Burundi
    10	BJ	Benin
    11	BT	Bhutan
    12	JM	Jamaica
    13	BW	Botswana
    14	BR	Brazil
    15	BS	Bahamas
    16	BY	Belarus
    17	BZ	Belize
    18	RU	Russia
    19	RW	Rwanda
    20	RS	Serbia
    21	TL	Timor-Leste
    22	TM	Turkmenistan
    23	TJ	Tajikistan
    24	RO	Romania
    25	GW	Guinea-Bissau
    26	GT	Guatemala
    27	GR	Greece
    28	GQ	Eq. Guinea
    29	GY	Guyana
    30	GE	Georgia
    31	GB	United Kingdom
    32	GA	Gabon
    33	GN	Guinea
    34	GM	Gambia
    35	GL	Greenland
    36	GH	Ghana
    37	OM	Oman
    38	TN	Tunisia
    39	JO	Jordan
    40	HR	Croatia
    41	HT	Haiti
    42	HU	Hungary
    43	HN	Honduras
    44	PR	Puerto Rico
    45	PS	Palestine
    46	PT	Portugal
    47	PY	Paraguay
    48	PA	Panama
    49	PG	Papua New Guinea
    50	PE	Peru
    51	PK	Pakistan
    52	PH	Philippines
    53	PL	Poland
    54	ZM	Zambia
    55	EH	W. Sahara
    56	EE	Estonia
    57	EG	Egypt
    58	ZA	South Africa
    59	EC	Ecuador
    60	IT	Italy
    61	VN	Vietnam
    62	SB	Solomon Is.
    63	ET	Ethiopia
    64	SO	Somalia
    65	ZW	Zimbabwe
    66	ES	Spain
    67	ER	Eritrea
    68	ME	Montenegro
    69	MD	Moldova
    70	MG	Madagascar
    71	MA	Morocco
    72	UZ	Uzbekistan
    73	MM	Myanmar
    74	ML	Mali
    75	MN	Mongolia
    76	MK	Macedonia
    77	MW	Malawi
    78	MR	Mauritania
    79	UG	Uganda
    80	MY	Malaysia
    81	MX	Mexico
    82	IL	Israel
    83	FR	France
    84	XS	Somaliland
    85	FI	Finland
    86	FJ	Fiji
    87	FK	Falkland Is.
    88	NI	Nicaragua
    89	NL	Netherlands
    90	NO	Norway
    91	NA	Namibia
    92	VU	Vanuatu
    93	NC	New Caledonia
    94	NE	Niger
    95	NG	Nigeria
    96	NZ	New Zealand
    97	NP	Nepal
    98	XK	Kosovo
    99	CI	Côte d'Ivoire
    100	CH	Switzerland
    101	CO	Colombia
    102	CN	China
    103	CM	Cameroon
    104	CL	Chile
    105	XC	N. Cyprus
    106	CA	Canada
    107	CG	Congo
    108	CF	Central African Rep.
    109	CD	Dem. Rep. Congo
    110	CZ	Czech Rep.
    111	CY	Cyprus
    112	CR	Costa Rica
    113	CU	Cuba
    114	SZ	Swaziland
    115	SY	Syria
    116	KG	Kyrgyzstan
    117	KE	Kenya
    118	SS	S. Sudan
    119	SR	Suriname
    120	KH	Cambodia
    121	SV	El Salvador
    122	SK	Slovakia
    123	KR	Korea
    124	SI	Slovenia
    125	KP	Dem. Rep. Korea
    126	KW	Kuwait
    127	SN	Senegal
    128	SL	Sierra Leone
    129	KZ	Kazakhstan
    130	SA	Saudi Arabia
    131	SE	Sweden
    132	SD	Sudan
    133	DO	Dominican Rep.
    134	DJ	Djibouti
    135	DK	Denmark
    136	DE	Germany
    137	YE	Yemen
    138	DZ	Algeria
    139	US	United States
    140	UY	Uruguay
    141	LB	Lebanon
    142	LA	Lao PDR
    143	TW	Taiwan
    144	TT	Trinidad and Tobago
    145	TR	Turkey
    146	LK	Sri Lanka
    147	LV	Latvia
    148	LT	Lithuania
    149	LU	Luxembourg
    150	LR	Liberia
    151	LS	Lesotho
    152	TH	Thailand
    153	TF	Fr. S. Antarctic Lands
    154	TG	Togo
    155	TD	Chad
    156	LY	Libya
    157	AE	United Arab Emirates
    158	VE	Venezuela
    159	AF	Afghanistan
    160	IQ	Iraq
    161	IS	Iceland
    162	IR	Iran
    163	AM	Armenia
    164	AL	Albania
    165	AO	Angola
    166	AR	Argentina
    167	AU	Australia
    168	AT	Austria
    169	IN	India
    170	TZ	Tanzania
    171	AZ	Azerbaijan
    172	IE	Ireland
    173	ID	Indonesia
    174	UA	Ukraine
    175	QA	Qatar
    176	MZ	Mozambique
 */


(function () {
    'use strict';

    angular
        .module('app.expat-map')
        .directive('expatMap', expatMap);

    expatMap.$inject = ['urlBase', '$window', '$timeout'];

    function expatMap(urlBase, $window, $timeout) {
        var expatMapDirective = {
            restrict: 'E',
            replace: true,
            scope: {
                mapId: '@',
                width: '<',
                height: '<',
                options: '=',
                onRenderedMap: '&',
                module: '<?',
                license:'='
            },
            templateUrl: urlBase.tplBase('base-modules/expat-map', 'index'),
            controller: expatMapController,
            controllerAs: 'vm',
        };
        return expatMapDirective;
    }

    function expatMapController($scope, $window, $timeout) {
        var $ = $window.$;
        var jvm = $window.jvm;
        var map = null;

        $scope.options = angular.extend({
            map: 'world_mill',
            backgroundColor: '#F5F7FA',
            regionsSelectable: false,
            regionStyle: {
                initial: {
                    fill: '#C7C9D0',
                    "fill-opacity": 1,
                    stroke: 'none',
                    "stroke-width": 0,
                    "stroke-opacity": 1
                },

                hover: {
                    fill: '#0a142b',
                    cursor: 'pointer'
                },
                selected: {
                    fill: '#878B99'
                },

            },
            selectedRegions: [],
        }, $scope.options);

        $window.height = $scope.height || 400;
        $window.width = $scope.width || 600;


        if (angular.isUndefined($scope.mapId) || $scope.mapId == ''){
            $scope.mapId = 'expat-map';
        }

        $scope.init = function() {
            // Draw map
            $scope.$evalAsync(function() {
                $scope.options.container = $('#' + $scope.mapId);
                map = new jvm.Map($scope.options);
                if ($scope.onRenderedMap) {
                    $scope.onRenderedMap(map);
                }

                $scope.$watch('options.selectedRegions', function(newRegions) {
                    map.clearSelectedRegions();
                    map.setSelectedRegions(newRegions);
                });
            });
        };

        $timeout($scope.init, 500);
    }

})();
