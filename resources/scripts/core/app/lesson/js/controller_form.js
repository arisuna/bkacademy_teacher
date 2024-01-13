/**
 * Created on dd/mm/yyyy.
 */

(function () {
    'use strict';

    App.controller('LessonFormController', ['$scope', '$timeout','$http', '$stateParams', '$state', 'ngDialog', 'urlBase', 'WaitingService', 'AppAddressService', 'AppSystem', 'AppAclService', 'AppLessonService',
        function ($scope, $timeout, $http, $stateParams, $state, ngDialog, urlBase, WaitingService, AppAddressService, AppSystem, AppAclService, AppLessonService) {
            $scope.page_loading = true;
            $scope.lesson = {};
            $scope.canSave = false;
            $scope.isEditable = false;
            $scope.tabActive = 1;

            $scope.statuses = [
                {name: 'UNVERIFIED_TEXT', value: 0, color: 'dark-gray', text: 'UNVERIFIED_TEXT', isSelectable: true},
                {name: 'PENDING_REQUEST_TEXT', value: 1, color: 'yellow', text: 'PENDING_REQUEST_TEXT', isSelectable: true},
                {name: 'VERIFIED_TEXT', value: 2, color: 'green', text: 'VERIFIED_TEXT', isSelectable: true},
                {name: 'CERTIFIED_TEXT', value: 3, color: 'blue', text: 'CERTIFIED_TEXT', isSelectable: false},
            ]

            $scope.canSave =  angular.isDefined($stateParams.id) ? AppAclService.validateAction('lesson', 'edit') : AppAclService.validateAction('lesson', 'create');

            $scope.onEditable = ($event, isEditable) => {
                $scope.$evalAsync(function () {
                    $scope.isEditable = !isEditable
                })
            }

            $scope.getDetailFn = function () {
                var id = angular.isDefined($stateParams.id) ? $stateParams.id : 0;
                if (id == 0) {
                    $scope.page_loading = false;
                    $scope.lesson = {
                        date: null,
                        categories: [],
                        category_ids: []
                    };
                    return;
                }

                AppLessonService.detailLesson(id).then(
                    function (res) {
                        if (res.success) {
                            $scope.lesson = res.data;
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

                if ($scope.lesson.id > 0) {
                    AppLessonService.updateLesson($scope.lesson).then(function (res) {
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
                    AppLessonService.createLesson($scope.lesson).then(function (res) {
                        if (res.success) {
                            // WaitingService.success(res.message, function () {
                            //     $state.go('app.lesson.list');
                            // });

                            WaitingService.popSuccess(res.message);
                            $state.go('app.lesson.edit', {id: res.data.id});
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

            $scope.deleteFn = function (id) {
                WaitingService.questionSimple('QUESTION_DELETE_LESSON_TEXT',
                    function (res) {
                        AppLessonService.deleteLesson(id).then(function (res) {
                            if (res.success) {
                                // WaitingService.success(res.message, function () {
                                //     $state.go('app.lesson.list');
                                // });

                                WaitingService.popSuccess(res.message);
                                console.log('go', res.message);
                                $state.go('app.lesson.list');
                            } else {
                                WaitingService.error(res.message);
                            }
                        }, function (err) {
                            WaitingService.error(err);
                        });
                    });
            }; // End delete function

            $scope.editStudentScoreFn = function (object) {
                $scope.currentClassroom = {id: 0};
                $scope.createClassroomDialog = ngDialog.open({
                    template: urlBase.tplApp('app', 'lesson', 'edit-score-right-dialog', '_=' + Math.random()),
                    className: 'ngdialog-theme-right-box sm-box ng-dialog-btn-close-dark-blue no-background',
                    scope: $scope,
                    closeByDocument: true,
                    resolve:{
                        student_score: function () {
                            return object
                        }
                    },

                    controller: 'EditStudentScoreFormController'
                });

                $scope.createClassroomDialog.closePromise.then(function (data) {
                    $scope.getDetailFn();
                });
            }
        }]);
})();