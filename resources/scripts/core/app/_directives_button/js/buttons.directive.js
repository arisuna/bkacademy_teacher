/**
 * number-input.js
 * author: Cohen Adair
 * license: GNU GPL v2
 */

(function () {
    'use strict';

    angular
        .module('app.input-selector')
        .directive('addButton', addButton);

    addButton.$inject = ['$state', 'urlBase'];

    function addButton($state, urlBase) {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: urlBase.tplBase('base-modules/input-selector', 'add-button'),
            scope: {
                ngClick: "&ngClick",
                ngIf: "<?",
                state: "@?"
            },
            link: function (scope, element, attrs) {
                if (angular.isUndefined(scope.ngIf) || scope.ngIf == '') scope.ngIf = true;
            },
            controller: function ($scope, $element, $attrs) {
            },
        };
    }


    angular
        .module('app.input-selector')
        .directive('addButtonState', addButtonState);

    addButtonState.$inject = ['urlBase'];

    function addButtonState(urlBase) {
        return {
            restrict: 'EA',
            replace: true,
            template: `
                <button class="btn btn-round-32 relo-bg-bright-blue"
                        ng-show="ngIf"
                        style="padding: 0; line-height: 30px;"
                        type="button" ui-sref="{{ state }}"
                        uib-tooltip="{{ label | translate }}"
                        tooltip-placement="bottom"
                        ngClick="&ngClick()">
                    <em class="fa-solid fa-plus"></em>
                </button>
            `,
            scope: {
                ngIf: "<?",
                state: "@?",
                label: "@?"
            },
            link: function (scope, element, attrs) {
                if (angular.isUndefined(scope.ngIf) || scope.ngIf == '') scope.ngIf = true;
                if (angular.isUndefined(scope.label) || scope.label == '') scope.label = 'ADD_NEW_BTN_TEXT';
            },
        };
    }


    angular
        .module('app.input-selector')
        .directive('addButtonClick', addButtonClick);

    addButtonClick.$inject = ['urlBase'];

    function addButtonClick(urlBase) {
        return {
            restrict: 'EA',
            replace: true,
            template: `
            <button class="btn btn-circle relo-bg-bright-blue"
                    ng-show="ngIf" type="button"
                    uib-tooltip="{{ label | translate }}"
                    tooltip-placement="bottom"
                    ngClick="&ngClick()">
                     <em class="fas fa-plus"></em>
                    </button>
            `,
            scope: {
                ngIf: "<?",
                label: "@",
                ngClick: "&ngClick",
            },
            link: function (scope, element, attrs) {
                if (angular.isUndefined(scope.ngIf) || scope.ngIf == '') scope.ngIf = true;
                if (angular.isUndefined(scope.label) || scope.label == '' || scope.label == null) {
                    scope.label = 'ADD_NEW_BTN_TEXT';
                }
            },
        };
    }




    angular
        .module('app.input-selector')
        .directive('saveButtonSubmit', saveButtonSubmit);

    function saveButtonSubmit() {
        return {
            restrict: 'E',
            replace: true,
            template:
            '<button class="btn" ng-class="[classcolor, class, classOval]" type="submit" ng-click="clickFn()" title="{{ label | translate }}">' +
            '    <em class="fa fa-floppy-o mr-sm"></em>' +
            '    {{ label | translate }}' +
            '</button>',
            scope: {
                class: '@?',
                color: '@?',
                label: '@?',
                isOval: '<?',
                clickFn: '&?clickFn',
            },

            link: function (scope, element, attrs) {
                if (scope.label == '' || scope.title == undefined) {
                    scope.label = "SAVE_BTN_TEXT";
                }
                if (scope.color == '' || scope.color == undefined) {
                    scope.classcolor = "relo-bg-green";
                } else if (scope.color == "yellow") {
                    scope.classcolor = "relo-bg-yellow";
                } else if (scope.color == "green") {
                    scope.classcolor = "relo-bg-green";
                }

                if(angular.isUndefined(scope.isOval)){
                    scope.classOval = '';
                }else{
                    if(scope.isOval){
                        scope.classOval = 'btn-oval';
                    }else{
                        scope.classOval = '';
                    }
                }
            }
        };
    }


    angular
        .module('app.input-selector')
        .directive('saveButtonClick', saveButtonClick);

    function saveButtonClick() {
        return {
            restrict: 'E',
            replace: true,
            template: `
                <button class="btn btn-oval" ng-class="[classcolor, class]" type="button" title="{{ label | translate }}">
                    <em class="fa fa-floppy-o mr-sm"></em>
                    {{ label | translate }}
                </button>
            `,
            scope: {
                class: '@?',
                color: '@?',
                text: '@?',
                label: '@?',
            },

            link: function (scope, element, attrs) {
                if (scope.label == '' || scope.label == undefined) {
                    scope.label = "SAVE_BTN_TEXT";
                }
                if (scope.color == '' || scope.color == undefined) {
                    scope.classcolor = "relo-bg-green";
                } else if (scope.color == "yellow") {
                    scope.classcolor = "relo-bg-yellow";
                } else if (scope.color == "green") {
                    scope.classcolor = "relo-bg-green";
                }
            }
        };
    }


    angular
        .module('app.input-selector')
        .directive('removeButton', removeButton);

    function removeButton() {
        return {
            restrict: 'E',
            replace: true,
            template: '<button type="button" class="btn btn-oval relo-bg-red" ng-class="[class]" ng-click="clickFn()" >' +
            '    <em class="fa fa-trash mr-sm"></em>' +
            '    {{ text | translate }}' +
            '</button>',
            scope: {
                class: '@?',
                text: '@?',
                clickFn: '&?clickFn',
            },
            link: function (scope, element, attrs) {
                if (scope.text == '' || scope.text == undefined) {
                    scope.text = "REMOVE_BTN_TEXT";
                }
            }
        };
    }


    angular
        .module('app.input-selector')
        .directive('deleteButtonClick', deleteButtonClick);

    deleteButtonClick.$inject = ['urlBase'];

    function deleteButtonClick(urlBase) {
        return {
            restrict: 'EA',
            replace: true,
            template: '<button class="btn relo-bg-red" ng-show="ngIf" type="button" ngClick="&ngClick()" title=" {{ \'DELETE_BTN_TEXT\'|translate }}">' +
            '<em class="fa {{ iconClass }} {{ label != \'\' ? \'mr-sm\' : \'\' }}"></em>' +
            '{{ label != \'\' ? ( label | translate ) : \'\' }}' +
            '</button>',

            scope: {
                ngIf: "<?",
                iconClass: '@?',
                ngClick: "&ngClick",
                label: "@?"
            },
            link: function (scope, element, attrs) {
                if (angular.isUndefined(scope.ngIf) || scope.ngIf == '') scope.ngIf = true;
                if (angular.isUndefined(scope.iconClass) || scope.iconClass == '') scope.iconClass = 'fa-trash';
            },
        };
    }

    angular
        .module('app.input-selector')
        .directive('deleteButtonState', deleteButtonState);

    deleteButtonState.$inject = ['urlBase'];

    function deleteButtonState(urlBase) {
        return {
            restrict: 'EA',
            replace: true,
            template: '<button class="btn btn-oval relo-bg-red" ng-if="ngIf" type="button" ui-sref="{{ state }}" title=" {{ \'DELETE_BTN_TEXT\'|translate }}">' +
            '<em class="fa fa-trash"></em>' +
            '{{ text ? (text | translate) : "" }}' +
            '</button>',

            scope: {
                ngIf: "<?",
                text: "@?",
                state: "@?",
            },
            link: function (scope, element, attrs) {
                if (angular.isUndefined(scope.ngIf) || scope.ngIf == '') scope.ngIf = true;
            },
        };
    }

    angular
        .module('app.input-selector')
        .directive('viewButton', viewButton);

    viewButton.$inject = ['urlBase'];

    function viewButton(urlBase) {
        return {
            restrict: 'EA',
            replace: true,
            template: '<button class="btn btn-oval relo-bg-bright-blue" ng-show="ngIf" type="button" ui-sref="{{ state }}" ngClick="&ngClick()" title=" {{ \'VIEW_TEXT\'|translate }}"><em class="fa fa-search-plus"></em></button>',
            scope: {
                ngIf: "<?",
                state: "@?",
                ngClick: "&?",
            },
            link: function (scope, element, attrs) {
                if (angular.isUndefined(scope.ngIf) || scope.ngIf == '') scope.ngIf = true;
            },
        };
    }


    angular
        .module('app.input-selector')
        .directive('defaultButtonClick', defaultButtonClick);


    function defaultButtonClick() {
        return {
            restrict: 'EA',
            replace: true,
            template: '<button class="btn btn-oval" ng-show="ngIf" type="button" title=" {{ label |translate }}">' +
            '<em class="fa {{ iconClass }} {{ label != \'\' ? \'mr-sm\' : \'\' }}"></em>' +
            '{{ label != \'\' ? ( label | translate ) : \'\' }}' +
            '</button>',

            scope: {
                ngIf: "<?",
                iconClass: '@?',
                ngClick: "&ngClick",
                label: "@?",
                disable: "<?"
            },
            link: function (scope, element, attrs) {
                if (angular.isUndefined(scope.ngIf) || scope.ngIf == '') scope.ngIf = true;
                if (angular.isUndefined(scope.iconClass) || scope.iconClass == '') scope.iconClass = 'fa-refresh';
                if (scope.iconClass == 'none') scope.iconClass = '';
            },
        };
    }


})();
