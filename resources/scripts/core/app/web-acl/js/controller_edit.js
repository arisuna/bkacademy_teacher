/**
 * Created on dd/mm/yyyy.
 */

(function () {
    'use strict';

    App.controller('WebAclEditController', ['$scope', '$http', '$stateParams', '$state', 'ngDialog', 'urlBase', '$timeout', 'WaitingService', 'AppWebAclService', 'AppSystem', 'web_acl',
        function ($scope, $http, $stateParams, $state, ngDialog, urlBase, $timeout,  WaitingService, AppWebAclService, AppSystem, web_acl) {
            $scope.page_loading = false;
            $scope.web_acl = web_acl;

            $scope.getDetail = function () {
                $scope.page_loading = true;
                $scope.showAcl($stateParams.id).then(function (res) {
                        if (res.success) {
                            $scope.web_acl = res.data;
                        } else {
                            WaitingService.popError(res.message);
                        }
                        $scope.page_loading = false;
                    }
                    , function (err) {
                        WaitingService.error(err);
                    });
            };

            $scope.openEditDialogFn = function () {
                $scope.dialog = ngDialog.open({
                    template: urlBase.tplApp('app', 'web-acl', 'form'),
                    className: 'ngdialog-theme-right-box sm-box ng-dialog-btn-close-dark-blue',
                    closeByDocument: true,
                    data: {
                        web_acl: $scope.web_acl,
                    },
                });
                $scope.dialog.closePromise.then(function (data) {
                    $scope.getDetail();
                });
            };

            $scope.saveSubAclItems = function (acls, selectedValue) {
                for (var id in acls) {
                    var acl = acls[id];
                    acl.selected = selectedValue;
                    $scope.saveAclItem(acl);

                    if (acl.sub && Object.keys(acl.sub).length > 0) {
                        $scope.saveSubAclItems(acl.sub, selectedValue);
                    }
                }
            };

            $scope.saveAclItem = function (acl, selectedValue) {
                if (acl.selected) {
                    return AppWebAclService.addAclItem({
                        web_acl_id: $scope.web_acl.id,
                        acl: acl
                    });
                } else {
                    return AppWebAclService.removeAclItem({
                        web_acl_id: $scope.web_acl.id,
                        acl: acl
                    });
                }
            };

            $scope.onAclItemChanged = function (acl) {
                if(!$scope.page_loading){
                console.log(acl);
                $scope.saveAclItem(acl).then(function (res) {
                        if (res.success) {
                            WaitingService.popSuccess(res.message);

                            if (acl.sub && Object.keys(acl.sub).length > 0) {
                                $scope.saveSubAclItems(acl.sub, acl.selected);
                            }
                        } else {
                            WaitingService.popError(res.message);
                        }
                    }
                    , function (err) {
                        WaitingService.error(err);
                    });
                 }
            };

            $scope.onAclItemLevelChanged = function (acl) {
               if(!$scope.page_loading){
                console.log(acl);
                    $scope.saveAclItem(acl).then(function (res) {
                        if (res.success) {
                            WaitingService.popSuccess(res.message);
                        } else {
                            WaitingService.popError(res.message);
                        }
                    }
                    , function (err) {
                        WaitingService.error(err);
                    });
                }
            };

            $scope.page_loading = true;
            $timeout(function () {
                $scope.page_loading = false;
            }, 2000);

        }]);
})();