/**
 * Created on dd/mm/yyyy.
 */

(function () {
    'use strict';

    App.controller('StudentFormController', ['$scope', '$timeout','$http', '$stateParams', '$state', 'ngDialog', 'urlBase', 'WaitingService', 'AppAddressService', 'AppSystem', 'AppAclService', 'AppStudentService',
        function ($scope, $timeout, $http, $stateParams, $state, ngDialog, urlBase, WaitingService, AppAddressService, AppSystem, AppAclService, AppStudentService) {
            $scope.page_loading = true;
            $scope.student = {};
            $scope.canSave = false;
            $scope.isEditable = false;
            $scope.tabActive = 1;

            $scope.statuses = [
                {name: 'UNVERIFIED_TEXT', value: 0, color: 'dark-gray', text: 'UNVERIFIED_TEXT', isSelectable: true},
                {name: 'PENDING_REQUEST_TEXT', value: 1, color: 'yellow', text: 'PENDING_REQUEST_TEXT', isSelectable: true},
                {name: 'VERIFIED_TEXT', value: 2, color: 'green', text: 'VERIFIED_TEXT', isSelectable: true},
                {name: 'CERTIFIED_TEXT', value: 3, color: 'blue', text: 'CERTIFIED_TEXT', isSelectable: false},
            ]

            $scope.canSave =  angular.isDefined($stateParams.id) ? AppAclService.validateAction('student', 'edit') : AppAclService.validateAction('student', 'create');

            $scope.onEditable = ($event, isEditable) => {
                $scope.$evalAsync(function () {
                    $scope.isEditable = !isEditable
                })
            }

            $scope.getDetailFn = function () {
                var id = angular.isDefined($stateParams.id) ? $stateParams.id : 0;
                if (id == 0) {
                    $scope.page_loading = false;
                    return;
                }

                AppStudentService.getStudentDetail(id).then(
                    function (res) {
                        if (res.success) {
                            $scope.student = res.data;
                        } else {
                            WaitingService.error(res.msg);
                        }
                        $scope.page_loading = false;
                    },
                    function (error) {
                        WaitingService.expire(error);
                        $scope.page_loading = false;
                    }
                );
            };
            $scope.getDetailFn();

            $scope.saving = false;

            $scope.saveFn = function () {
                $scope.saving = true;

                if ($scope.student.id > 0) {
                    AppStudentService.updateStudent($scope.student).then(function (res) {
                        if (res.success) {
                            WaitingService.popSuccess(res.message);
                        } else {
                            WaitingService.error(res.message);
                        }
                        $scope.saving = false;
                    }, function (err) {
                        WaitingService.error(err);
                    })
                } else {
                    AppStudentService.createStudent($scope.student).then(function (res) {
                        if (res.success) {
                            // WaitingService.success(res.message, function () {
                            //     $state.go('app.student.list');
                            // });

                            WaitingService.popSuccess(res.message);
                            $state.go('app.student.list');
                        } else {
                            WaitingService.error(res.message);
                        }
                        $scope.saving = false;
                    }, function (err) {
                        WaitingService.error(err);
                    })
                }
            }; // End save function

            $scope.setTab = (tabActive) => {
                $scope.tabActive = tabActive;
            }

            $scope.changeStatus = (item, index) => {
                if(item.value == 2){
                    let mess = 'VERIFICATION_NOT_ALLOW_TEXT';
                    console.log($scope.student.verification_status);

                    if (!$scope.student.id_number ) {
                        mess = 'ID_NUMBER_IS_REQUIRED_TEXT';
                        console.log($scope.student.statusSelected);
                        WaitingService.error(mess);
                        $scope.setTab(3);
                        $timeout(function () {
                            $scope.student.statusSelected = $scope.statuses.find(o => o.value == $scope.student.verification_status)
                        })
                        return;
                    }

                    if ($scope.bankAccounts.length == 0 ) {
                        mess = 'BANK_ACCOUNT_IS_REQUIRED_TEXT';
                        WaitingService.error(mess);
                        $scope.setTab(3);

                        $timeout(function () {
                            $scope.student.statusSelected = $scope.statuses.find(o => o.value == $scope.student.verification_status)
                        })
                        return;
                    }

                    if ($scope.count_attachment_id_back == 0 ) {
                        mess = 'ID_CERTIFICATE_BACK_SIDE_IS_REQUIRED_TEXT';
                        WaitingService.error(mess);
                        $scope.setTab(3);
                        $timeout(function () {
                            $scope.student.statusSelected = $scope.statuses.find(o => o.value == $scope.student.verification_status)
                        })
                        return;
                    }

                    if ($scope.count_attachment_id_front == 0 ) {
                        mess = 'ID_CERTIFICATE_FRONT_SIDE_IS_REQUIRED_TEXT';
                        WaitingService.error(mess);
                        $scope.setTab(3);
                        $timeout(function () {
                            $scope.student.statusSelected = $scope.statuses.find(o => o.value == $scope.student.verification_status)
                        })
                        return;
                    }

                
                    // $scope.student.verification_status = item.value;
                    $scope.upgradeToLvl2();


                    return;
                } else if(item.value == 0){
                    WaitingService.questionWithInputText('YOU_SHOULD_ENTER_CODE_TO_CONFIRM_ACTION_TEXT', 'ENTER_CODE_TO_CONFIRM_UNVERIFIED_TEXT', null,
                        function (confirmText) {
                            let mess = 'VERIFICATION_NOT_ALLOW_TEXT';
                            if (confirmText != 'unverified') {
                                mess = 'CONFIRM_TEXT_INCORRECT_TEXT';
                                WaitingService.error(mess);
                                $timeout(function () {
                                    $scope.student.statusSelected = $scope.statuses.find(o => o.value == $scope.student.verification_status)
                                })
                                return;
                            }
                            // $scope.student.verification_status = item.value;
                            $scope.rejectToLvl2();
                        });
                } else if(item.value == 1){
                    $scope.changeToPending();
                }

            }

            $scope.upgradeToLvl2 = function () {
                $scope.saving = true;
                AppStudentService.upgradeToLvl2($scope.student).then(function (res) {
                    if (res.success) {
                        WaitingService.popSuccess(res.message);
                        $scope.student.lvl = 2;
                        $scope.student.verification_status = 2;
                        // $scope.student.statusSelected = $scope.statuses.find(o => o.value === $scope.student.verification_status);
                    } else {
                        WaitingService.error(res.message);
                    }
                    console.log($scope.student.verification_status);
                    $scope.student.statusSelected = $scope.statuses.find(o => o.value === $scope.student.verification_status);
                    $scope.saving = false;
                }, function (err) {
                    $scope.saving = false;
                    $scope.student.statusSelected = $scope.statuses.find(o => o.value === $scope.student.verification_status);
                    WaitingService.error(err);
                })
            }; 

            $scope.deleteFn = function (id) {
                WaitingService.questionSimple('QUESTION_DELETE_STUDENT_TEXT',
                    function (res) {
                        AppStudentService.deleteStudent(id).then(function (res) {
                            if (res.success) {
                                // WaitingService.success(res.message, function () {
                                //     $state.go('app.student.list');
                                // });

                                WaitingService.popSuccess(res.message);
                                console.log('go', res.message);
                                $state.go('app.student.list');
                            } else {
                                WaitingService.error(res.message);
                            }
                        }, function (err) {
                            WaitingService.error(err);
                        });
                    });
            }; // End delete function
        }]);
})();