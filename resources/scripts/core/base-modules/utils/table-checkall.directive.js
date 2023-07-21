/**=========================================================
 * Module: table-checkall.js
 * Tables check all checkbox
 =========================================================*/
(function () {
    'use strict';

    angular
        .module('app.utils')
        .directive('checkAll', checkAll)
        .directive('checkAllRow', checkAllRow)
        .directive('checkAllSame', checkAllSame);

    function checkAll() {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element) {
            element.on('change', function () {
                var $this = $(this),
                    index = $this.index() + 1,
                    checkbox = $this.find('input[type="checkbox"]'),
                    table = $this.parents('table');
                // Make sure to affect only the correct checkbox column
                table.find('tbody > tr > td:nth-child(' + index + ') input[type="checkbox"]')
                    .prop('checked', checkbox[0].checked);

            });
        }
    }

    function checkAllRow() {
        var directive = {
            link: link,
            restrict: 'A'
        };

        return directive;

        function link(scope, element) {
            element.on('change', function () {
                var $this = $(this),
                    checkbox = $this.find('input[type="checkbox"]'),
                    tr = $this.parent('tr');

                tr.find('input[type="checkbox"]:not(:last)').prop('checked', checkbox[0].checked);
            });

        }
    }

    function checkAllSame() {
        var directive = {
            link: link,
            restrict: 'A'
        };

        return directive;

        function link(scope, element, attr) {
            element.on('change', function () {
                var $this = $(this),
                    checkbox = $this.find('input[type="checkbox"]'),
                    name = checkbox.attr('name');
                angular.element(document).find('input[name="' + name + '"]:not(:last)').prop('checked', checkbox[0].checked);
            });

        }
    }
})();
