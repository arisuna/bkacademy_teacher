(function () {
    'use strict';

    angular
        .module('app.app-directives')
        .directive('appPhoneSelector', appPhoneSelector);

    appPhoneSelector.$inject = ['ngDialog', 'Utils', 'urlBase', '$translate', 'TELEPHONE_PREFIX', 'DataSystem', '$timeout'];

    function appPhoneSelector(ngDialog, Utils, urlBase, $translate, TELEPHONE_PREFIX, DataSystem, $timeout) {
        var directive = {
            restrict: 'EA',
            replace: true,
            scope: {
                model: '=ngModel',
                currency: '@?',
                showLabel: '<?',
                isRequired: '<?',
                isEditable: '<?',
                toolTipText: '@?',
                label: '@?',
                noBorderViewer: '<?',
                isMandatory: '<?',
                countryCode: '=?',
            },
            templateUrl: urlBase.tplApp('app', '_directives_input', 'app-phone-input-selector-item'),
            link: function (scope, element, attrs) {

                if (angular.isUndefined(scope.isMandatory)){
                    scope.isMandatory = false;
                }

                if (angular.isUndefined(scope.hasComment)){
                    scope.hasComment = false;
                }

                if (angular.isUndefined(scope.commentHighlight)){
                    scope.commentHighlight = false;
                }
            },
            controller: function ($scope, $element, $attrs) {

                if (angular.isUndefined($scope.countryCode)){
                    $scope.countryCode = 'VN';
                }

                $scope.highlight = false;
                $scope.prefixHighlight = false;

                $scope.data = {
                    value: null,
                    telephone_number: null,
                    telephone_prefix: null,
                    telephone_country_iso2: null,
                };

                $scope.initFn = function () {
                    if (angular.isString($scope.model)) {
                        let telephoneSplit = _.split($scope.model, "|");

                        $scope.data.value = angular.copy($scope.model);
                        $scope.data.telephone_prefix = angular.isDefined(telephoneSplit[0]) ? telephoneSplit[0] : null;
                        $scope.data.telephone_number = angular.isDefined(telephoneSplit[1]) ? telephoneSplit[1] : null;
                        $scope.data.telephone_country_iso2 = null;

                        if (Utils.isNotEmpty($scope.data.telephone_prefix)) {
                            console.log('empty');
                            let telephonePrefixCountry = _.findLast(TELEPHONE_PREFIX, function (o) {
                                return o.dial_code == $scope.data.telephone_prefix;
                            });
                            if (telephonePrefixCountry) {
                                $scope.data.telephone_country_iso2 = telephonePrefixCountry.code;
                            } else {
                                $scope.data.telephone_prefix = null;
                                $scope.data.telephone_number = telephoneSplit[1];
                            }
                        }else{
                            $scope.initPrefix();
                        }
                    }else{
                        $scope.initPrefix();
                    }
                };

                $scope.initPrefix = function(){
                    console.log('initPrefix', $scope.countryCode);
                    if ($scope.countryCode != '' && $scope.countryCode != null && $scope.countryCode != undefined){
                        let telephonePrefixCountry = _.findLast(TELEPHONE_PREFIX, function (o) {
                            return o.code == $scope.countryCode;
                        });
                        if (telephonePrefixCountry) {
                            $scope.data.telephone_prefix = angular.copy(telephonePrefixCountry.dial_code);
                            $scope.data.telephone_country_iso2 = angular.copy(telephonePrefixCountry.code);
                            $scope.updateValue();
                        }
                    }
                }

                $scope.updateValue = function () {
                    if($scope.data.telephone_number != null && $scope.data.telephone_number != undefined && $scope.data.telephone_number != '') {
                        $scope.model = $scope.data.telephone_prefix + "|" + $scope.data.telephone_number;
                    } else if ($scope.data.telephone_prefix != null && ($scope.data.telephone_number == null || $scope.data.telephone_number == '')) {
                        $scope.model = $scope.data.telephone_prefix;
                    } else if ($scope.data.telephone_number != null && ($scope.data.telephone_prefix == null || $scope.data.telephone_prefix == '')){
                        $scope.model = $scope.data.telephone_number;
                    }
                    console.log('$scope.model', $scope.model);
                };

                $timeout(function () {
                    $scope.initFn();
                });

                $scope.config = {
                    isReadOnly: false,
                };

                $scope.activeFn = function () {
                    $scope.config.isReadOnly = false;
                };

                $scope.desactiveFn = function () {
                    $scope.config.isReadOnly = true;
                };

                $scope.$watch('model', function (newValue, oldValue) {
                    if (newValue != oldValue && _.isString(newValue)) {
                        $scope.initFn();
                    } else if (newValue == '' || newValue == null) {
                        $scope.data.value = null;
                        $scope.data.telephone_number = null;
                        $scope.data.telephone_prefix = null;
                        $scope.data.telephone_country_iso2 = null;
                    }

                    if ((_.isNull(newValue) || newValue == null || newValue == '') && $scope.isMandatory == true){
                        $scope.highlight = true;
                        $scope.prefixHighlight = true;
                    }else if((!_.isNull(newValue) || newValue != null || newValue != '') && $scope.isMandatory == true){
                        let phoneSplit = _.split(newValue, "|");
                        let prefix = phoneSplit[0];
                        let number = phoneSplit[1];

                        if (prefix == 'null' && number == 'null'){
                            $scope.highlight = true;
                            $scope.prefixHighlight = true;
                        }

                        if (number == 'null' || number == null || number == '' &&
                            prefix != 'null' && prefix != null && prefix != ''){
                            $scope.highlight = true;
                            $scope.prefixHighlight = false;
                        }

                        if ((prefix == 'null' || prefix == null || prefix == '') &&
                            number != 'null' && number != null && number != ''){
                            $scope.prefixHighlight = true;
                            $scope.highlight = false;
                        }

                        if (prefix != 'null' && prefix != null && prefix != '' &&
                            number != 'null' && number != null && number != ''){
                            $scope.highlight = false;
                            $scope.prefixHighlight = false;
                        }
                    }
                })


                $scope.openCodeDialog = function ($event) {

                    let dialogPosition = Utils.getPositionDropdownDialog($event, 300, 300, 0)
                    let searchDialog = ngDialog.open({
                        template: urlBase.tplApp('app', '_directives_input', 'app-phone-input-selector-code-dialog'),
                        className: 'ngdialog-custom-position no-background ' + dialogPosition['className'],
                        showClose: false,
                        closeByDocument: true,
                        disableAnimation: true,
                        cache: true,
                        width: 300,
                        data: dialogPosition,
                        controller: ['$scope', '$element', 'TELEPHONE_PREFIX', 'Utils', function ($scope, $element, TELEPHONE_PREFIX, Utils) {
                            $scope.countryCode = $scope.ngDialogData.countryCode;

                            console.log('$scope.countryCode', $scope.countryCode);

                            $scope.telephone_prefix_items = TELEPHONE_PREFIX;

                            Utils.setPositionDropdownDialog(dialogPosition)

                            $scope.searchConfig = {
                                query: null,
                                currentItem: {
                                    id: null,
                                },
                                filterQuery: ""
                            };

                            $scope.applyFilter = function () {
                                $scope.searchConfig.filterQuery = $scope.searchConfig.query;
                            };


                            $scope.selectItem = function (item) {
                                $scope.searchConfig.currentItem = item;
                                $scope.closeThisDialog($scope.searchConfig.currentItem);
                            };


                        }]
                    });

                    searchDialog.closePromise.then(function (returnData) {
                        if (angular.isDefined(returnData.value) && angular.isDefined(returnData.value.dial_code) && returnData.value.dial_code != '') {
                            $scope.data.telephone_prefix = angular.copy(returnData.value.dial_code);
                            $scope.data.telephone_country_iso2 = angular.copy(returnData.value.code);
                            $scope.updateValue();
                        }
                    })
                }
            }
        };
        return directive;
    }


})();
