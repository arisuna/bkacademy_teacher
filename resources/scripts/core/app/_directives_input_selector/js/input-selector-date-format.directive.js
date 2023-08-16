(function () {
    'use strict';

    angular
        .module('app.input-selector')
        .directive('inputSelectorDateFormat', inputSelectorDateFormat);

    inputSelectorDateFormat.$inject = ['$translate','$http','urlBase'];

    function inputSelectorDateFormat($translate, $http, urlBase ) {
        var directive = {
            restrict: 'E',
            replace: true,
            scope: {
                model: '=ngModel',
                required: '<',
                disabled: '<?',
                label:'@',
                requiredMessage:'@',
                labelFloating:'<?',
                showLabel:'<?',
                step:'@',
                name:'@',
                id:'@',
            },
            templateUrl: urlBase.tplApp('app', '_directives_input_selector', 'date-format'),
            link: function (scope, element, attrs ) {
                scope.realName = scope.name + "_" + parseInt(Math.random()*100).toString();
                if( angular.isUndefined( scope.label) || scope.label == ''){
                    scope.label = 'DATE_FORMAT_TEXT';
                }

                if( angular.isUndefined( scope.requiredMessage) || scope.requiredMessage == ''){
                    scope.requiredMessage = 'FIELD_IS_REQUIRED_TEXT';
                }

                if( angular.isUndefined( scope.labelFloating ) || scope.labelFloating == false ){
                    scope.labelFloating = false;
                    scope.className = ''
                    scope.placeholder = 'SELECT_TEXT';
                }else{
                    scope.className = 'float-label'
                    scope.placeholder = '_';
                }

                if( angular.isUndefined( scope.showLabel ) || scope.showLabel == true ){
                    scope.showLabel = true;
                }else{
                    scope.showLabel = false;
                }
            },

            controller: function ($scope, $element, $attrs) {
                $scope.dateFormat = [
                    {
                        code:'DD/MM/YYYY',
                        name:'DD/MM/YYYY',
                        index: 0
                    },
                    {
                        code:'MM/DD/YYYY',
                        name:'MM/DD/YYYY',
                        index: 1
                    },
                    {
                        code:'YYYY/MM/DD',
                        name:'YYYY/MM/DD',
                        index: 2
                    }
                ];
            }
        };
        return directive;
    }

})();
