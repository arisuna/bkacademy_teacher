/**
 * Created on dd/mm/yyyy.
 */

(function () {
    'use strict';

    App.controller('AdminPageController', ['$scope', '$rootScope', '$timeout', '$http', '$state', '$window', 'urlBase', 'AppAclService', 'AppDataService', 'WaitingService',
        function ($scope, $rootScope,  $timeout, $http, $state, $window, urlBase, AppAclService, AppDataService, WaitingService) {

            $rootScope.menuSettings = [
                {
                    "title": "GENERAL_SETTINGS_TEXT",
                    "icon": "fa-solid fa-gears",
                    "iconType": "icon",
                    "noRender": !(AppAclService.validateAction('admin', 'index')),
                    "acl": "",
                    "subMenu": [
                        // {"title": "LANGUAGES_TEXT", "state": "app.language.list"},
                        {"title": "CONSTANTS_TEXT", "state": "app.constant.list"},
                        {"title": "CURRENCIES_TEXT", "state": "app.currency.list"},
                        {"title": "COUNTRIES_TEXT", "state": "app.country.list"},
                        {"title": "CITIES_TEXT", "state": "app.city.list"},
                        // {"title": "SECTIONS_MODES_TEXT", "state": "app.section-mode.list"},
                        {"title": "SYSTEM_ATTRIBUTES_TEXT", "state": "app.system-attribute.list"},
                    ]
                },
                {
                    "title": "USERS_AND_ACLS_TEXT",
                    "icon": "fa-solid fa-users",
                    "iconType": "icon",
                    "noRender": !(AppAclService.validateAction('admin', 'index')),
                    "acl": "",
                    "subMenu": [
                        {"title": "ACLS_TEXT", "state": "app.setting-acl.list"},
                        {"title": "ACL_GROUPS_ROLES_TEXT", "state": "app.user-group.list"},
                        {"title": "ADMIN_USERS_TEXT ", "state": "app.admin-user.list"},
                    ]
                },
                {
                    "title": "EMAILS_AND_NOTIFICATIONS_TEXT",
                    "icon": "fa-solid fa-envelope",
                    "iconType": "icon",
                    "noRender": !(AppAclService.validateAction('admin', 'index')),
                    "acl": "",
                    "subMenu": [
                        {"title": "SYSTEM_EMAIL_TEMPLATES_TEXT", "state": "app.email-template.list"},
                        {"title": "SYSTEM_NOTIFICATIONS_TEXT", "state": "app.system-notification.list"},
                    ]
                },
                {
                    "title": "BUSINESS_ZONES_AND_WAREHOUSES_PARKS_TEXT",
                    "icon": "fa-solid fa-map-location-dot",
                    "iconType": "icon",
                    "noRender": !(AppAclService.validateAction('admin', 'index')),
                    "acl": "",
                    "subMenu": [
                        {"title": "BUSINESS_ZONES_TEXT", "state": "app.business-zone.list"},
                        {"title": "WAREHOUSES_PARKS_TEXT", "state": "app.business-park.list"},
                    ]
                },
                {
                    "title": "CATEGORIES_AND_PRODUCTS_TEXT",
                    "icon": "fa-solid fa-sitemap",
                    "iconType": "icon",
                    "noRender": !(AppAclService.validateAction('admin', 'index')),
                    "acl": "",
                    "subMenu": [
                        {"title": "CATEGORIES_TEXT", "state": "app.category.list"},
                        {"title": "PRODUCT_FIELDS_TEXT", "state": "app.product-field.list"},
                        {"title": "PRODUCT_FIELD_GROUPS_CATEGORIES_TEXT", "state": "app.product-field-group.list"},
                        {"title": "MAKES_AND_MODELS_TEXT", "state": "app.make.list"},
                    ]
                },
            ];

            $scope.clearCache = function() {
                WaitingService.questionSimple('QUESTION_CLEAR_CACHE_TEXT', function () {
                    AppDataService.clearCache().then(function (res) {
                        if (res.success) {
                            WaitingService.popSuccess(res.message);
                            $timeout(function () {
                                $state.reload();
                            }, 1000);
                            
                        } else {
                            WaitingService.error(res.message);
                        }
                    }, function(err){
                        WaitingService.error(err.message);
                    });
                });
            }
        }]);
})();
