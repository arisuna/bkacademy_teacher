/**=========================================================
 * Module panel-tools.js
 * Directive tools to control panels.
 * Allows collapse, refresh and dismiss (remove)
 * Saves panel state in browser storage
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.panels')
        .directive('paneltool', paneltool);

    paneltool.$inject = ['$compile', '$timeout'];
    function paneltool ($compile, $timeout) {
        var directive = {
            link: link,
            restrict: 'E',
            scope: false
        };
        return directive;

        function link(scope, element, attrs) {

          var templates = {
            /* jshint multistr: true */
            collapse:'<a class="btn btn-round text-muted" href="#" ng-show="{{panelId}}" panel-collapse="" uib-tooltip="Collapse" ng-click="{{panelId}} = !{{panelId}}"> \
                        <i class="fa fa-angle-down"></i></a>\
                      <a class="btn btn-round text-muted" href="#" ng-show="!{{panelId}}" panel-collapse="" uib-tooltip="Expand" ng-click="{{panelId}} = !{{panelId}}"> \
                        <i class="fa fa-angle-up"></i></a>',
            dismiss: '<a class="text-muted" href="#" panel-dismiss="" uib-tooltip="Close Panel">\
                       <em class="fa fa-times"></em>\
                     </a>',
            refresh: '<a href="#" panel-refresh="" uib-tooltip="Refresh Panel" ng-show="false">\
                       <em class="fa fa-refresh"></em>\
                     </a>'

          };

          var tools = scope.panelTools || attrs;

          $timeout(function() {
            element.html(getTemplate(element, tools )).show();
            $compile(element.contents())(scope);

            element.addClass('pull-right');
          });

          function getTemplate( elem, attrs ){
            var temp = '';
            attrs = attrs || {};
            if(attrs.toolCollapse)
              temp += templates.collapse.replace(/{{panelId}}/g, (elem.parent().parent().attr('id')) );
            if(attrs.toolUpload)
              temp += templates.upload.replace(/{{panelId}}/g, (elem.parent().parent().attr('id')) );
            if(attrs.toolDismiss)
              temp += templates.dismiss;
            if(attrs.toolRefresh)
              temp += templates.refresh.replace(/{{spinner}}/g, attrs.toolRefresh);

            return temp;
          }
        }// link
    }

})();
