/**
 * [wysiwyg directive]
 * @return {[type]}
 */
(function () {
    'use strict';

    angular
        .module('app.app-directives')
        .directive('appWysiwyg', appWysiwyg);

    appWysiwyg.$inject = ['FileUploader', '$http', '$q', 'urlBase', 'mentioUtil',
        'AppDataService', 'GmsMediaService', 'WaitingService', 'GmsSystem', 'GmsMemberService', 'GmsWorkersService', 'GmsAuthService', 'GmsAclService'];

    function appWysiwyg(FileUploader, $http, $q, urlBase, mentioUtil,
                        AppDataService, GmsMediaService, WaitingService, GmsSystem, GmsMemberService, GmsWorkersService, GmsAuthService, GmsAclService) {
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
                mentionOnlyTag: '<?',
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
                isRelocation: '<?',
                employee: '=?'
            },
            templateUrl: urlBase.tplApp('app', '_directives_input', 'wysiwyg'),
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

                if (angular.isUndefined($scope.isRelocation)) {
                    $scope.isRelocation = false;
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

                if (angular.isUndefined($scope.minHeight)) {
                    $scope.minHeight = 200;
                }

                $scope.appCompany = GmsAuthService.getCompany();
                $scope.isManageMediaRelocation = GmsAclService.validateAction('relocation', 'manage_documents');

                $scope.options = {
                    plugins: 'textcolor lists link table paste image uploader',
                    menubar: false,
                    body_class: 'mce-font-nunito-sans',
                    toolbar:
                        $scope.mode == "simple" ? 'bold italic bullist numlist  link unlink image ' + ($scope.uploader ? ' | uploader' : '') + ($scope.isYoutube ? ' youtube' : '') :
                            'formatselect bold italic underline forecolor | bullist numlist | alignleft aligncenter alignright alignjustify | link unlink image | table' + ($scope.uploader ? ' | uploader' : '') + ($scope.isYoutube ? ' youtube' : ''),

                    resize: true,
                    min_height: $scope.minHeight,
                    paste_as_text: true,
                    paste_text_sticky: false,
                    paste_text_sticky_default: false,
                    paste_preprocess: function(plugin, args) {
                        console.log(args.content);
                        let output = '';
                        for (let i = 0; i < args.content.length; i++) {
                            if (args.content.charCodeAt(i) <= 55296) {
                                output += args.content.charAt(i);
                            }
                        }

                        args.content = output;
                    },
                    table_default_attributes: {
                        border: 1,
                        cellpadding: 4
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
                                GmsMediaService.uploadImagePublic(formData).then(function (res) {
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
                    },
                    content_style: "@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,400;0,800;1,400;1,800&display=swap'); body { font-family: 'Nunito Sans' !important; color: #0A142B !important; font-weight: 400; }",
                    formats: {
                        aligncenter: {selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes: 'tinymce-center',
                            styles: {display: 'block', margin: '0px auto', textAlign: 'center'}},
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
                    if (GmsSystem.getUserSettingVariable('communication_signature') != '') {
                        $scope.model = $scope.model + '<div class="signatureCommunication">' + GmsSystem.getUserSettingVariable('communication_signature') + "</div>";
                    }
                }

                /* Start implementation of uploader plugin */
                $scope.toggleUploadZone = function (editorId) {
                    var uploadZone = $('#' + editorId).parent().find('div.upload-zone');
                    if (uploadZone.hasClass('ng-hide')) {
                        uploadZone.removeClass('ng-hide').animo({
                            animation: 'fadeInDown',
                            duration: 0.3
                        });
                    } else {
                        uploadZone.animo({
                            animation: 'fadeOutDown',
                            duration: 0.3
                        }, function () {
                            uploadZone.addClass('ng-hide');
                        });
                    }
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
                        icon: 'fa fa-paperclip fa-flip-horizontal',
                        onclick: function () {
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
                    $scope.persons = [];
                    $scope.members = [];

                    $scope.searchPeople = function (term) {
                        var peopleList = [];
                        angular.forEach($scope.members, function (item) {
                            if (item.firstname.toUpperCase().indexOf(term.toUpperCase()) >= 0) {
                                peopleList.push(item);
                            }
                        });
                        $scope.people = peopleList;
                        return $q.when(peopleList);
                    };

                    $scope.getPeopleText = function (personToTag) {
                        return '[~<i>' + (personToTag.nickname || personToTag.firstname + personToTag.lastname) + '</i>]';
                    };

                    $scope.getPeopleTextRaw = function (personToTag) {
                        var check = true;
                        angular.forEach($scope.persons, function (person) {
                            if (person.uuid == personToTag.uuid) {
                                check = false;
                            }
                        })
                        if (check == true) {
                            $scope.persons.push(personToTag);
                        }
                        // Fix a bug where model won't update with new tag
                        setTimeout(function () {
                            tinymce.activeEditor.insertContent('');
                        }, 0);

                        return '<a href="javascript:void(0);" user-profile-comment="" uuid="' + personToTag.uuid + '">' + personToTag.firstname + ' ' + personToTag.lastname + '</a>';
                        //return '[@' + item.uuid + '|' + item.firstname + ' ' + item.lastname + ']';
                    };

                    $scope.getMemberList = function () {
                        GmsMemberService.getObjectMembersList($scope.uuid).then(function (res) {
                            if (res.success == true) {
                                $scope.members = res.data;
                                if ($scope.tagHrEnabled || (angular.isDefined($scope.mentionOnlyTag) && $scope.mentionOnlyTag  == true)) {
                                    angular.forEach($scope.tagPersons, function (person) {
                                        $scope.members.push(person);
                                    });
                                }
                            }
                        }, function (err) {
                            WaitingService.popExpire();
                        });
                    }

                    $scope.getMemberListWithoutUuid = function () {
                        GmsWorkersService.getGmsContacts().then(function (res) {
                            if (res.success == true) {
                                $scope.members = res.data;
                                if ($scope.tagHrEnabled || angular.isDefined($scope.mentionOnlyTag) && $scope.mentionOnlyTag  == true) {
                                    angular.forEach($scope.tagPersons, function (person) {
                                        $scope.members.push(person);
                                    });
                                }
                            }
                        }, function (err) {
                            WaitingService.popExpire();
                        });
                    }

                    $scope.$watch('uuid', function () {
                        if ($scope.uuid != '' && $scope.uuid != undefined) {
                            $scope.getMemberList();
                        } else {
                            $scope.getMemberListWithoutUuid();
                        }
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
