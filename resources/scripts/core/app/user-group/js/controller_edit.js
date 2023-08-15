/**
 * Created on dd/mm/yyyy.
 */

(function () {
    'use strict';

    App.controller('UserGroupEditController', ['$scope', '$http', '$stateParams', '$state', 'ngDialog', 'urlBase', 'WaitingService', 'AppDataService', 'AppSystem', 'group_acls', 'controller_action_items', 'user_groups', 'acls', 'user_group',
        function ($scope, $http, $stateParams, $state, ngDialog, urlBase, WaitingService, AppDataService, AppSystem, group_acls, controller_action_items, user_groups, acls, user_group) {
            $scope.page_loading = false;
            $scope.user_groups = user_groups;
            $scope.acls = acls;
            $scope.acl_role = [];
            $scope.controller_action_items = controller_action_items;
            $scope.user_group = user_group;
            $scope.group_acls = group_acls;

            $scope.settingActive = 0;

            $scope.clickActive = function (index) {
                $scope.settingActive = index;
            }

            $scope.initAclsValue = function (acls) {
                for (var index in acls) {
                    var acl = acls[index];
                    var id = acl.id;
                    acl.selected = ($scope.group_acls[id] && $scope.group_acls[id].accessible);
                    if (acl.sub && Object.keys(acl.sub).length > 0) {
                        $scope.initAclsValue(acl.sub);
                    }
                }
            };
            $scope.initAclsValue($scope.controller_action_items);

            $scope.openEditDialogFn = function () {
                $scope.dialog = ngDialog.open({
                    template: urlBase.tplApp('app', 'user-group', 'form'),
                    className: 'ngdialog-theme-right-box sm-box ng-dialog-btn-close-dark-blue',
                    closeByDocument: true,
                    data: {
                        user_group: $scope.user_group,
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
                    return AppDataService.addAclItem({
                        user_group_id: $scope.user_group.id,
                        acl: acl
                    });
                } else {
                    return AppDataService.removeAclItem({
                        user_group_id: $scope.user_group.id,
                        acl: acl
                    });
                }
            };

            $scope.onAclItemChanged = function (acl) {
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
                    })
                    .catch(function (err) {
                        WaitingService.expire();
                    });
            };

        }]);
})();