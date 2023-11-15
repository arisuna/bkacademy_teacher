/**
 * Created on dd/mm/yyyy.
 */

(function () {
    'use strict';

    App.controller('WebAclFormController', ['$scope', '$http', '$stateParams', '$state', 'ngDialog', 'urlBase', 'WaitingService', 'AppWebAclService', 
        function ($scope, $http, $stateParams, $state, ngDialog, urlBase, WaitingService, AppWebAclService) {
            $scope.page_loading = false;
            $scope.getDetail = function(){ 
                if (angular.isDefined($scope.ngDialogData) && $scope.ngDialogData.web_acl != undefined) {
                    $scope.web_acl = $scope.ngDialogData.web_acl;
                } 
            }
            $scope.getDetail();

            $scope.saving = false;

            $scope.saveFn = function () {
                $scope.saving = true;

                if ($scope.web_acl.id > 0) {
                    AppWebAclService.updateWebAcl($scope.web_acl).then(function (res) {
                        if (res.success) {
                            WaitingService.popSuccess(res.message);
                            $scope.closeThisDialog(res);
                        } else {
                            WaitingService.error(res.message);
                        }
                        $scope.saving = false;
                    }, function (err) {
                        WaitingService.error(err);
                    })
                }
            }; // End save function

        }]);
})();