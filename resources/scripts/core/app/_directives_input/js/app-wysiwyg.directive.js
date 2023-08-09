/**
 * [wysiwyg directive]
 * @return {[type]}
 */
(function () {
    'use strict';

    angular
        .module('app.app-directives')
        .directive('appWysiwyg', appWysiwyg);

    appWysiwyg.$inject = [ 'FileUploader', '$q', 'urlBase', 'WaitingService', '$http', 'AppHttp'];

    function appWysiwyg( FileUploader, $q, urlBase, WaitingService, $http, AppHttp) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                model: '=ngModel',
                uploader: '=?',
                uuid: '<?',
                quicksave: '=?',
                formattedContent: '=?',
                onaftersave: '&onaftersave'
            },
            templateUrl: urlBase.tplApp('app', '_directives_input', 'wysiwyg'),
            controller: function ($scope, $element, $attrs, $timeout) {

                $scope.options = {
                    plugins: 'image link table lists textcolor code youtube',
                    toolbar1: 'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat | code | youtube',
                    body_class: 'mce-font-nunito-sans',
                    menubar: true,
                    paste_data_images: true,
                    resize: true,
                    min_height: 200,
                    table_default_attributes: {
                        border: 1,
                        cellpadding: 4
                    },
                    table_default_styles: {
                        borderCollapse: 'collapse'
                    },

                    image_upload_handler: function (blobInfo, success, failure) {
                    },

                    // Uploader configuration
                    image_title: true,
                    automatic_uploads: false,
                    file_picker_types: 'image',
                    file_picker_callback: function (callback, value, meta) {
                        if (meta.filetype !== 'image') {
                            return;
                        }

                        $('#upload').on('change', function () {
                            var file = this.files[0];

                            if (file.size > 10485760) { //2MB
                                WaitingService.error('Max File size 2mb');
                                return false;
                            }

                            var reader = new FileReader();
                            reader.onload = function () {
                                var formData = new FormData();
                                formData.append('file', file);
                                WaitingService.begin();
                                AppHttp.post('/app/guide/upload', formData, {
                                    headers: {
                                        'Content-Type': undefined,
                                        'Token-Key': window.localStorage.getItem('app_token')
                                    }
                                }).then(function (res) {
                                    console.log('end', res);
                                    WaitingService.end();
                                    if (res.data.success) {
                                        console.log(res);
                                        callback(res.data.url, { title: file.name });
                                    }
                                });
                            };
                            reader.readAsDataURL(file);
                        });
                        $('#upload').trigger('click');
                    },

                    theme_url: '/app/libraries/tinymce/themes/modern/theme.js',
                    skin_url: '/app/libraries/tinymce/skins/lightgray',
                    external_plugins: {
                        textcolor: '/app/libraries/tinymce/plugins/textcolor/plugin.js',
                        lists: '/app/libraries/tinymce/plugins/lists/plugin.js',
                        link: '/app/libraries/tinymce/plugins/link/plugin.js',
                        table: '/app/libraries/tinymce/plugins/table/plugin.js',
                        paste: '/app/libraries/tinymce/plugins/paste/plugin.js',
                        image: '/app/libraries/tinymce/plugins/image/plugin.js',
                    },
                    content_style: "@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap'); body { font-family: 'Montserrat' !important; font-weight: 400; }"
                };

                /* Start implementation of quicksave */
                if (angular.isDefined($scope.quicksave) && $scope.quicksave) {
                    $scope.showing = false;

                    $scope.enableEdit = function () {
                        $scope.showing = true;
                        $scope.oldModel = $scope.model;
                    };

                    $scope.cancel = function () {
                        $scope.showing = false;
                        $scope.model = $scope.oldModel;
                    };

                    $scope.save = function () {
                        $scope.showing = false;
                        $scope.onaftersave();
                    };
                } else {
                    $scope.showing = true;
                }
                /* End implementation of quicksave */
            }
        };
    }

})();
