/**
 * Created on dd/mm/yyyy.
 */

(function () {
    'use strict';
    App.controller('EditStudentScoreFormController', ['$scope', '$state', '$http', '$stateParams', '$timeout', '$rootScope', '$translate', 'ngDialog', 'urlBase', 'WaitingService', 'AppDataService', 'AppClassroomService', 'AppLessonService', 'student_score',
        function ($scope, $state, $http, $stateParams, $timeout, $rootScope, $translate, ngDialog, urlBase, WaitingService, AppDataService, AppClassroomService, AppLessonService, student_score) {
            $scope.student_score = student_score;
            $scope.student = student_score.student;
            $scope.student_score.lesson_id = $scope.lesson.id;
            console.log($scope.student_score, $scope.lesson.categories);


            $scope.saveFn = function ($event) {

                AppLessonService.updateScore($scope.student_score).then(function (res) {
                    $scope.saving = false;
                    if (res.success) {
                        WaitingService.popSuccess(res.message);
                        $scope.closeThisDialog({student_score: res});
                    } else {
                        WaitingService.error(res.message);
                    }
                }, (err) => {
                    $scope.saving = false;
                    WaitingService.error(err);
                })

            }; // End save function

            
        }]);

})();