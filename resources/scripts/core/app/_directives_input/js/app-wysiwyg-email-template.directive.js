(function () {
    'use strict';

    angular
        .module('app.app-directives')
        .directive('appWysiwygEmailTemplate', appWysiwygEmailTemplate);

    appWysiwygEmailTemplate.$inject = ['FileUploader', '$http', '$q', 'urlBase', 'mentioUtil', 'AppDataService', 'AppMediaService', 'WaitingService', 'AppSystem', 'AppMemberService', 'AppAuthService', 'AppAclService', '$translate'];

    function appWysiwygEmailTemplate(FileUploader, $http, $q, urlBase, mentioUtil, AppDataService, AppMediaService, WaitingService, AppSystem, AppMemberService, AppAuthService, AppAclService, $translate) {
        return {
            restrict: 'E',
            replace: false,
            scope: {
                disabled: '=?',
                model: '=ngModel',
                uploader: '=?',
                items: '=?',
                uuid: '<?',
                persons: '=?',
                mention: '=?',
                quicksave: '=?',
                formattedContent: '=?',
                onaftersave: '&onaftersave',
                addMediaLink: '=?',
                showUploadZone: '=?',
                communicationSignature: '=?',
                emptyLabel: '@?',
                showItems: "<",
                mode: "@?", //full or simple,
                optionsToolBar: '@?',
                tagPersons: '<?',
                tagHrEnabled: '<?',
                isYoutube: '<?',
                minHeight: '<?',
                isRequired: '<?',
                requiredMessage: '@?',
                objectMedia: '<?',
                employee: '=?',
                isEmailTemplate: '<?',
                template: '=?',
            },
            templateUrl: urlBase.tplApp('app', '_directives_input', 'wysiwyg-email-template'),
            controller: function ($scope, $element, $attrs, $timeout) {
                if (angular.isUndefined($scope.addMediaLink)) {
                    $scope.addMediaLink = true;
                }
                if (angular.isUndefined($scope.isYoutube)) {
                    $scope.isYoutube = false;
                }

                if (angular.isUndefined($scope.isRequired)) {
                    $scope.isRequired = false;
                }

                if (angular.isUndefined($scope.requiredMessage) || $scope.requiredMessage == '') {
                    $scope.requiredMessage = 'DATA_REQUIRED_TEXT';
                }

                if (angular.isUndefined($scope.emptyLabel) || $scope.emptyLabel == '') {
                    $scope.emptyLabel = 'EMPTY_TEXT';
                }

                if (angular.isUndefined($scope.mode) || $scope.mode == "full") {
                    $scope.mode = "full";
                }

                if (angular.isUndefined($scope.isEmailTemplate)) {
                    $scope.isEmailTemplate = false;
                }

                if (angular.isUndefined($scope.minHeight)) {
                }

                $scope.mediaSetting = {
                    showUploadZone: false
                };


                $scope.appCompany = {};
                $scope.isManageMediaRelocation = AppAclService.validateAction('relocation', 'manage_documents');

                $scope.options = {
                    plugins: 'textcolor lists link table paste image uploader noneditable',
                    menubar: false,
                    body_class: 'mce-font-nunito-sans',
                    toolbar: $scope.mode == "simple" ? 'bold italic bullist numlist  link unlink image ' + ($scope.uploader ? ' | uploader' : '') + ($scope.isYoutube ? ' youtube' : '') : 'formatselect bold italic underline forecolor | bullist numlist | alignleft aligncenter alignright alignjustify | link unlink image | table' + ($scope.uploader ? ' | uploader' : '') + ($scope.isYoutube ? ' youtube' : ''),

                    resize: true,
                    noneditable_leave_contenteditable: true,
                    images_file_types: "jpg,svg,webp",
                    block_unsupported_drop: false,
                    paste_remove_styles_if_webkit: false,
                    paste_as_text: true,
                    paste_text_sticky: false,
                    paste_text_sticky_default: false,
                    paste_preprocess: function (plugin, args) {
                        // console.log(args.content);
                        let output = '';
                        for (let i = 0; i < args.content.length; i++) {
                            if (args.content.charCodeAt(i) <= 55296) {
                                output += args.content.charAt(i);
                            }
                        }

                        args.content = output;
                    },
                    table_default_attributes: {
                        border: 1, cellpadding: 4
                    },
                    image_upload_handler: function (blobInfo, success, failure) {
                    },

                    // Uploader configuration
                    image_title: true,
                    automatic_uploads: false,
                    file_picker_types: 'image',
                    file_picker_callback: function (callback, value, meta) {
                        if (meta.filetype != 'image') {
                            return;
                        }

                        $('#upload').on('change', function () {
                            var file = this.files[0];

                            if (file.size > 10485760) { //2MB
                                WaitingService.error('ALERT_FILE_MAX_SIZE_TEXT');
                                return false;
                            }

                            var reader = new FileReader();
                            reader.onload = function () {
                                var formData = new FormData();
                                formData.append('file', file);
                                WaitingService.begin();
                                AppMediaService.uploadImagePublic(formData).then(function (res) {
                                    WaitingService.end();
                                    if (res.success) {
                                        callback(res.data.url_public, {title: file.name});
                                    }
                                }, function () {
                                    WaitingService.end();
                                    WaitingService.popExpire();
                                });
                            };
                            reader.readAsDataURL(file);
                        });
                        $('#upload').trigger('click');
                    },

                    table_default_styles: {
                        borderCollapse: 'collapse'
                    },

                    statusbar: $scope.mode == "simple" ? false : false,

                    theme_url: '/app/libraries/tinymce/themes/modern/theme.js',
                    skin_url: '/app/assets/themes/tinymce-reloday',
                    external_plugins: {
                        textcolor: '/app/libraries/tinymce/plugins/textcolor/plugin.js',
                        lists: '/app/libraries/tinymce/plugins/lists/plugin.js',
                        link: '/app/libraries/tinymce/plugins/link/plugin.js',
                        table: '/app/libraries/tinymce/plugins/table/plugin.js',
                        paste: '/app/libraries/tinymce/plugins/paste/plugin.js',
                        image: '/app/libraries/tinymce/plugins/image/plugin.js',
                        youtube: '/app/libraries/tinymce/plugins/youtube/plugin.js',
                    }, //https://fonts.googleapis.com/css2?family=Nunito+Sans&display=swap
                    content_style: "@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,800;1,400;1,800&display=swap');html{ height:100% } body { font-family: 'Montserrat' !important; color: #0A142B !important; font-weight: 400; line-height: 1.5em; height: 98%; " + ($scope.showUploadZone ? " padding: 0 5px; " : "padding: 0 20px; ") + " }" + ".mceNonEditable{text-decoration:none !important}" + " body p{ line-height: 1.5em !important;} .custom-line-height { line-height: 1.5em; }; ",
                    formats: {
                        customlineheight: {
                            selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img,audio,video',
                            styles: {lineHeight: '1.5em'},
                            classes: 'custom-line-height'
                        },
                    },
                    style_formats: [{title: 'Custom Line Height', format: 'customlineheight'},],
                    noneditable_regexp: [/\[[^\[\]]*\]/g],
                    setup: function (editor) {
                        var $ = tinymce.dom.DomQuery;
                        var nonEditableClass = editor.getParam('noneditable_noneditable_class', 'mceNonEditable');
                        // Register a event before certain commands run that will turn contenteditable off temporarilly on noneditable fields
                        editor.on('BeforeExecCommand', function (e) {
                            // The commands we want to permit formatting noneditable items for

                            var textFormatCommands = ['mceToggleFormat', 'Bold', 'mceApplyTextcolor', 'mceRemoveTextcolor'];
                            console.log('e.command', e.command);

                            if (textFormatCommands.indexOf(e.command) !== -1) {
                                // Find all elements in the editor body that have the noneditable class on them
                                //  and turn contenteditable off
                                $(editor.getBody()).find('.' + nonEditableClass).attr('contenteditable', null);
                                $(editor.getBody()).find('.' + nonEditableClass).attr('data-mce-contenteditable', null);
                            }
                        });
                        // Turn the contenteditable attribute back to false after the command has executed
                        editor.on('ExecCommand', function (e) {
                            // Find all elements in the editor body that have the noneditable class on them
                            //  and turn contenteditable back to false
                            $(editor.getBody()).find('.' + nonEditableClass).attr('contenteditable', false);
                            $(editor.getBody()).find('.' + nonEditableClass).attr('data-mce-contenteditable', false);
                        });
                    },
                };

                if ($scope.optionsToolBar && $scope.optionsToolBar == 'onlyText') {
                    $scope.options.toolbar = 'formatselect bold italic underline forecolor | bullist numlist | alignleft aligncenter alignright alignjustify';
                }

                $scope.$watch('disabled', function () {
                    if (angular.isDefined($scope.disabled) && $scope.disabled == true) {
                        $scope.options.readonly = 1;
                    } else {
                        delete $scope.options.readonly;
                    }
                })


                $scope.addSignature = function () {
                    $scope.removeSignature();
                    if (AppSystem.getUserSettingVariable('communication_signature') != '') {
                        $scope.model = $scope.model + '<div class="signatureCommunication">' + AppSystem.getUserSettingVariable('communication_signature') + "</div>";
                    }
                }

                /* Start implementation of uploader plugin */
                $scope.toggleUploadZone = function (editorId) {
                    var uploadZone = $('#' + editorId).parent().find('div.upload-zone');
                    if (uploadZone.hasClass('ng-hide')) {
                        uploadZone.removeClass('ng-hide').animo({
                            animation: 'fadeInDown', duration: 0.3
                        });
                    } else {
                        uploadZone.animo({
                            animation: 'fadeOutDown', duration: 0.3
                        }, function () {
                            uploadZone.addClass('ng-hide');
                        });
                    }
                    $scope.$evalAsync(function () {
                        $timeout(function () {
                            $scope.showUploadZone = !$scope.showUploadZone;
                            $scope.mediaSetting.showUploadZone = !$scope.mediaSetting.showUploadZone;
                            $scope.publish('resize_email_template_setting', $scope.showUploadZone);

                        })
                    })

                };

                $scope.$watch('showUploadZone', function () {
                    var uploadZone = $('div.upload-zone');
                    if ($scope.showUploadZone == true) {
                        if (uploadZone.hasClass('ng-hide')) {
                            uploadZone.removeClass('ng-hide').animo({
                                animation: 'fadeInDown',
                                duration: 0.3
                            });
                        }
                    }
                });

                $scope.$watch('model', function () {
                    // console.log('model', $scope.model);
                });

                $scope.removeSignature = function () {
                    var editor = tinymce.activeEditor;
                    tinymce.activeEditor.dom.remove(tinymce.activeEditor.dom.select('div.signatureCommunication'));
                }

                $scope.onAddItem = function (item) {
                    // console.log('item wy', item)
                    var editor = tinymce.activeEditor;
                    if ($scope.addMediaLink == true) {
                        switch (item.file_type) {
                            case 'image':
                                editor.insertContent(editor.dom.createHTML('img', {src: item.image_data.url_thumb}));
                                break;
                            default:
                                editor.insertContent(editor.dom.createHTML('a', {href: item.image_data.url_full}, item.name));
                        }
                    }
                }

                $scope.$watchCollection('items', function () {
                    // console.log('items wy', $scope.items);
                });

                if (angular.isUndefined($scope.items)) {
                    $scope.items = [];
                }

                tinymce.PluginManager.add('uploader', function (editor, url) {
                    editor.addButton('uploader', {
                        icon: 'fa fa-paperclip fa-flip-horizontal', onclick: function () {
                            $scope.toggleUploadZone(editor.id);
                        }
                    });

                    return {
                        getMetadata: function () {
                            return {title: "Uploader plugin"};
                        }
                    };
                });
                /* End implementation of uploader plugin */

                /* Start implementation of mention plugin */
                if (!angular.isUndefined($scope.mention) && $scope.mention) {
                    $scope._map_fields = [];
                    $scope.map_fields = [];

                    $scope.searchField = function (term) {
                        var _list = [];
                        angular.forEach($scope.map_fields, function (item) {
                            if (item.label_translate.toString().toUpperCase().indexOf(term.toString().toUpperCase()) >= 0 || item.table_translate.toString().toUpperCase().indexOf(term.toString().toUpperCase()) >= 0) {
                                _list.push(item);
                            }
                        });
                        $scope.mapField = _list;
                        return $q.when(_list);
                    };

                    $scope.getText = function (tag) {
                        return '[~<i>' + (tag.name) + '</i>]';
                    };

                    $scope.getMapFieldTextRaw = function (tag) {
                        // console.log('tag', tag);
                        var check = true;
                        angular.forEach($scope._map_fields, function (item) {
                            if (item.uuid == tag.uuid) {
                                check = false;
                            }
                        })
                        if (check == true) {
                            $scope._map_fields.push(tag);
                        }
                        // Fix a bug where model won't update with new tag
                        setTimeout(function () {
                            tinymce.activeEditor.insertContent('');
                        }, 0);

                        return '<a contenteditable="false" style="text-decoration: none !important; padding: 0px 5px; border: 1px solid rgba(10, 20, 43, 0.3); background: #f5f7fa; color: #0098FF; border-radius: 5px; line-height: 1.5em; white-space: nowrap; vertical-align: baseline " class="mceNonEditable"  target="' + tag.uuid + '">' + tag.table_translate + ' - ' + tag.label_translate + '</a>';
                        //return '[@' + item.uuid + '|' + item.firstname + ' ' + item.lastname + ']';
                    };

                    $scope.getMapFields = function () {
                        AppDataService.searchMapFields({
                            'is_suggested': 1,
                            'translated_language_id': $scope.template && $scope.template.supported_language_id > 0 ? $scope.template.supported_language_id : null,
                        }).then(function (res) {
                            console.log('res', res);
                            if (res.success == true) {
                                $scope.map_fields = res.data;
                                // _.map($scope.map_fields , function(item){
                                //     item.label_translate = $translate.instant(item.label);
                                // });
                                // console.log('$scope.map_fields', $scope.map_fields);
                                // if ($scope.tagHrEnabled) {
                                //     angular.forEach($scope.tagPersons, function (person) {
                                //         $scope.members.push(person);
                                //     });
                                // }
                            }
                        }, function (err) {
                            WaitingService.popExpire();
                        });
                    }

                    $scope.$watch('template.id', function (newValue) {
                        if (newValue > 0) {
                            $scope.getMapFields();
                        }
                    });

                    $scope.$watch('uuid', function () {
                        // $scope.getMapFields();

                    });

                    $scope.subscribe('refreshMapFields', function () {
                        $scope.getMapFields();
                    });

                    $scope.options.init_instance_callback = function (editor) {
                        $scope.iframeElement = editor.iframeElement;
                    }
                }
                /* End implementation of mention plugin */

                /* Start implementation of quicksave */
                if (angular.isDefined($scope.quicksave) && $scope.quicksave) {
                    $scope.showing = false;

                    $scope.enableEdit = function () {
                        $scope.showing = true;
                        $scope.oldModel = $scope.model;
                    }

                    $scope.cancel = function () {
                        $scope.showing = false;
                        $scope.model = $scope.oldModel;
                    }

                    $scope.save = function () {
                        $scope.showing = false;
                        $scope.onaftersave();
                    }

                    $scope.remove = function () {
                        $scope.showing = true;
                        $scope.model = "";
                    }

                } else {
                    $scope.showing = true;
                }
                /* End implementation of quicksave */
            }
        };
    }

})();
