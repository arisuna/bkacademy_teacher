/**
 * Created by anmeo on 11/3/16.
 */

(function () {
    'use strict';

    angular
        .module('app.edit-inline')
        .directive('editInline', editInline);

    function editInline() {
        var directive = {
            restrict: 'A',
            scope: {
                onsave: '&'
            },
            compile: function (tElem, tAttrs) {
                var $inputs = $('[ng-model]', tElem);

                angular.forEach($inputs, function (value, key){
                    var $obj = $(value);
                    $obj.attr('disabled', 'disabled');
                });

                return function(scope, element, attrs) {
                    var isBtnSave = false;

                    $(element).click(function(){
                        angular.forEach($('[ng-model]',element), function (value, key){
                            var $obj = $(value);
                            $obj.removeAttr('disabled');
                        });

                        $(this).addClass('none');

                        if (!isBtnSave) {
                            $(this).append("<div class='btn-save-inline'><button class='btn btn-success btn-sm'><em class='fa fa-check'></em></button>" +
                                "<button class='btn btn-danger btn-sm'><em class='fa fa-remove'></em></button></div>");

                            isBtnSave = true;
                        }

                    });
                };
            },
            controller: function ($scope, $element, $attrs) {

            }
        };

        return directive;
    }

})();