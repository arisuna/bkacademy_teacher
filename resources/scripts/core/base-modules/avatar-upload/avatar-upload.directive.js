/**
 * [avatar upload directive]
 * @return {[type]} [created by thinh@expatfinder.com]
 */
(function () {
    'use strict';

    angular
        .module('app.avatar-upload')
        .directive('avatarUpload', avatarUpload);

    avatarUpload.$inject = ['FileUploader', '$http', '$localStorage', '$timeout', 'ngDialog', 'toaster', 'urlBase','$translate','$rootScope','DataService','WaitingService'];

    function avatarUpload( FileUploader, $http, $localStorage, $timeout, ngDialog, toaster, urlBase, $translate, $rootScope, DataService, WaitingService) {
        var avatarUploadZone = {
            restrict: 'E',
            replace: true,
            scope: {
                avatar:'=?avatar',
                uuid:'=uuid',
                groupname:'@groupname',
                buttonText: '@?'
            },
            templateUrl: urlBase.tplBase('base-modules/avatar-upload', 'input'),
            link: function (scope, element, attrs, timeout) {

                if( scope.buttonText == '' || scope.buttonText == 'undefined' ){
                    scope.buttonText = $translate.instant('CHANGE_AVATAR_TEXT');
                }

                if( scope.groupname == '' || scope.groupname == 'undefined' ){
                    scope.groupname = 'avatar';
                }

                $timeout(function () {
                    var uploadBtn = $(':file', element);
                    angular.forEach(uploadBtn, function (value, key) {
                        var default_text = scope.buttonText;
                        $(value).filestyle('buttonText', $translate.instant(default_text));
                        $rootScope.$on('$translateChangeSuccess', function () {
                            $(value).filestyle('buttonText', $translate.instant(default_text));
                        });
                    });
                }, 0);
            },
            controller: function ($scope, $element, $attrs, $timeout) {

                if( angular.isUndefined( $scope.groupname ) || $scope.groupname == '' || $scope.groupname == 'undefined' ){
                    $scope.groupname = 'avatar';
                }

            	var uploader = $scope.uploader = new FileUploader({
                    url: '/media/avatar/upload',
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
                        'Token-Key': window.localStorage.getItem('token_key')
                    },
                    removeAfterUpload: true,
                    queueLimit: 1
                });


            	$scope.getAvatarObject = function(){
                    DataService.getAvatarObject( $scope.uuid ).then(function(res){
                        if(res.success){
                            $scope.avatar = res.data;
                        }
                    },function(err){
                        console.log( err );
                    })
                };

            	$scope.$watch('uuid',function(){
            	    if( $scope.uuid != ''){
                        $scope.getAvatarObject();
                    }
                })
                /**
                 * add Avatar
                 * @param avatar
                 */
            	$scope.addAvatar = function(avatar){
            		$scope.avatar = avatar;
                    if( !angular.isUndefined( $scope.avatar.uuid ) && $scope.avatar.uuid != '' ){
                        DataService.attachAvatar({
                            uuid:$scope.uuid,
                            media:$scope.avatar,
                            type:$scope.groupname
                        }).then(function(res){
                            if( res.success ){
                                WaitingService.popSuccess(res.message);
                            }else{
                                WaitingService.popError(res.message);
                            }
                        },function(err){
                            WaitingService.popExpire();
                        });
                    }
                    
            	}
                var file_items = [];

                uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
                    //console.info('onWhenAddingFileFailed', item, filter, options);
                };
                uploader.onAfterAddingFile = function (fileItem) {
                    //console.info('onAfterAddingFile', fileItem);
                    $scope.uploader.uploadAll();
                };
                uploader.onAfterAddingAll = function (addedFileItems) {
                    //console.info('onAfterAddingAll', addedFileItems);
                };
                uploader.onBeforeUploadItem = function (item) {
                    //console.info('onBeforeUploadItem', item);
                };
                uploader.onProgressItem = function (fileItem, progress) {
                    //console.info('onProgressItem', fileItem, progress);
                };
                uploader.onProgressAll = function (progress) {
                    //console.info('onProgressAll', progress);
                };
                uploader.onSuccessItem = function (fileItem, response, status, headers) {
                    //console.info('onSuccessItem', fileItem);
                    if( response.success == true ){
                        $scope.addAvatar( response.data );
                    }
                };
                uploader.onErrorItem = function (fileItem, response, status, headers) {
                    //console.info('onErrorItem', fileItem, response, status, headers);
                };
                uploader.onCancelItem = function (fileItem, response, status, headers) {
                    //console.info('onCancelItem', fileItem, response, status, headers);
                };
                uploader.onCompleteItem = function (fileItem, response, status, headers) {
                    //console.info('onCompleteItem', fileItem, response, status, headers);
                };
                uploader.onCompleteAll = function () {
                    //console.info('onCompleteAll');
                };
            }
        };

        return avatarUploadZone;
    }

})();