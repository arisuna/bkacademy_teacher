(function () {
    'use strict';
    App.controller('MakeEditApiController', ['$scope', '$state', '$timeout', '$rootScope', '$translate',
        'WaitingService', 'AppMakeService', 'ngDialog', 'urlBase',
        function ($scope, $state, $timeout, $rootScope, $translate, WaitingService, AppMakeService, ngDialog, urlBase) {

            $scope.settingActive = 1;
            $scope.object = {};
            $scope.page_loading = true;

            $scope.getDetailFn = function () {
                AppMakeService.detailMake($state.params.uuid).then(
                    function (res) {
                        if (res.success) {
                            $scope.object = res.data;
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

            $scope.saveFn  = function(){
                if($scope.object.id > 0){
                    AppMakeService.updateMake($scope.object).then(function (res) {
                        if (res.success) {
                            $scope.closeThisDialog(res.data);

                            WaitingService.popSuccess(res.message);
                        } else {
                            WaitingService.popError(res.message);
                        }
                        $scope.saving = false;
                    }, function (err) {
                        WaitingService.popError(err);
                    })
                }

            }

            $scope.subscribe('updateLogoUuid', function(data){
                if(data && data.type == 'squared_logo'){
                    $scope.object.squared_logo_uuid = data.logoUuid;
                }

                if(data && data.type == 'rectangular_logo'){
                    $scope.object.rectangular_logo_uuid = data.logoUuid;
                }
            });

        }]);
})();
