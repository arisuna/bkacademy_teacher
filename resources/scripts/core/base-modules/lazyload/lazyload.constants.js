(function () {
    'use strict';


    let currentAppPrefix = '/gms';

    angular
        .module('app.lazyload')
        .constant('APP_REQUIRES', {
            // jQuery based and standalone scripts
            scripts: {
                'whirl': [currentAppPrefix + '/libraries/whirl/dist/whirl.css'],
                'classyloader': [currentAppPrefix + '/libraries/jquery-classyloader/js/jquery.classyloader.min.js'],
                'animo': [currentAppPrefix + '/libraries/animo.js/animo.js'],
                'fastclick': [currentAppPrefix + '/libraries/fastclick/lib/fastclick.js'],
                'modernizr': [currentAppPrefix + '/libraries/modernizr/modernizr.custom.js'],
                'animate': [currentAppPrefix + '/libraries/animate.css/animate.min.css'],
                'skycons': [currentAppPrefix + '/libraries/skycons/skycons.js'],
                'icons': [currentAppPrefix + '/libraries/fontawesome/css/font-awesome.min.css',
                    currentAppPrefix + '/libraries/fontawesome-free-6.4.0-web/css/all.css',
                    currentAppPrefix + '/libraries/simple-line-icons/css/simple-line-icons.css'],
                'sparklines': [currentAppPrefix + '/libraries/sparkline/index.js'],
                'wysiwyg': [currentAppPrefix + '/libraries/bootstrap-wysiwyg/bootstrap-wysiwyg.js',
                    currentAppPrefix + '/libraries/bootstrap-wysiwyg/external/jquery.hotkeys.js'],
                'slimscroll': [currentAppPrefix + '/libraries/slimScroll/jquery.slimscroll.min.js'],
                'screenfull': [currentAppPrefix + '/libraries/screenfull/dist/screenfull.js'],
                'vector-map': [
                    currentAppPrefix + '/libraries/ika.jvectormap/jquery-jvectormap-1.2.2.min.js',
                    currentAppPrefix + '/libraries/ika.jvectormap/jquery-jvectormap-1.2.2.css'],
                'vector-map-maps': [],
                'loadGoogleMapsJS': [currentAppPrefix + '/libraries/load-google-maps/load-google-maps.js'],
                'flot-chart': [currentAppPrefix + '/libraries/Flot/jquery.flot.js'],
                'flot-chart-plugins': [currentAppPrefix + '/libraries/flot.tooltip/js/jquery.flot.tooltip.min.js',
                    currentAppPrefix + '/libraries/Flot/jquery.flot.resize.js',
                    currentAppPrefix + '/libraries/Flot/jquery.flot.pie.js',
                    currentAppPrefix + '/libraries/Flot/jquery.flot.time.js',
                    currentAppPrefix + '/libraries/Flot/jquery.flot.categories.js',
                    currentAppPrefix + '/libraries/flot-spline/js/jquery.flot.spline.min.js'],
                'moment': [currentAppPrefix + '/libraries/moment/min/moment-with-locales.min.js'],
                'inputmask': [currentAppPrefix + '/libraries/jquery.inputmask/dist/jquery.inputmask.bundle.js'],
                'flatdoc': [currentAppPrefix + '/libraries/flatdoc/flatdoc.js'],
                'codemirror': [currentAppPrefix + '/libraries/codemirror/lib/codemirror.js',
                    currentAppPrefix + '/libraries/codemirror/lib/codemirror.css'],
                // modes for common web files
                'codemirror-modes-web': [currentAppPrefix + '/libraries/codemirror/mode/javascript/javascript.js',
                    currentAppPrefix + '/libraries/codemirror/mode/xml/xml.js',
                    currentAppPrefix + '/libraries/codemirror/mode/htmlmixed/htmlmixed.js',
                    currentAppPrefix + '/libraries/codemirror/mode/css/css.js'],
                'taginput': [currentAppPrefix + '/libraries/bootstrap-tagsinput/dist/bootstrap-tagsinput.css',
                    currentAppPrefix + '/libraries/bootstrap-tagsinput/dist/bootstrap-tagsinput.min.js'],
                'filestyle': [currentAppPrefix + '/libraries/bootstrap-filestyle/src/bootstrap-filestyle.js'],
                'chartjs': [currentAppPrefix + '/libraries/Chart.js/dist/Chart.bundle.min.js'],
                'morris': [currentAppPrefix + '/libraries/raphael/raphael.js',
                    currentAppPrefix + '/libraries/morris.js/morris.js',
                    currentAppPrefix + '/libraries/morris.js/morris.css'],
                'loaders.css': [currentAppPrefix + '/libraries/loaders.css/loaders.css'],
                'spinkit': [currentAppPrefix + '/libraries/spinkit/css/spinkit.css'],
                'parsley': [currentAppPrefix + '/libraries/parsleyjs/dist/parsley.min.js'],

                'matchHeight': [currentAppPrefix + '/libraries/matchheight/dist/jquery.matchHeight-min.js'],

                'flexSlider': [currentAppPrefix + '/libraries/flexslider/flexslider.css',
                    currentAppPrefix + '/libraries/flexslider/jquery.flexslider-min.js'],
                'angularPdfViewer': [currentAppPrefix + '/libraries/pdfjs-dist/build/pdf.js',
                    currentAppPrefix + '/libraries/angular-pdf/dist/angular-pdf.js'],

                'pdf-viewer': [
                    //currentAppPrefix + '/libraries/pdfjs-dist/build/pdf.combined.js',
                    currentAppPrefix + '/libraries/pdfjs-dist/build/pdf.js',
                    currentAppPrefix + '/libraries/pdfjs-dist/build/pdf.worker.js',
                    currentAppPrefix + '/libraries/ng-pdf-viewer/src/ng-pdf-viewer.min.js'],

                'pdfjs-viewer': [
                    currentAppPrefix + '/libraries/pdf.js-viewer/pdf.js',
                    currentAppPrefix + '/libraries/pdf.js-viewer/viewer.css',
                    currentAppPrefix + '/libraries/angular-pdfjs-viewer/dist/angular-pdfjs-viewer.js'],

                'ngIntlTelInput': [currentAppPrefix + '/libraries/intl-tel-input/build/css/intlTelInput.css',
                    currentAppPrefix + '/libraries/intl-tel-input/build/js/intlTelInput.min.js',
                    currentAppPrefix + '/libraries/intl-tel-input/build/js/utils.js',
                    currentAppPrefix + '/libraries/ng-intl-tel-input/dist/ng-intl-tel-input.min.js'],

                'ngclipboard': [currentAppPrefix + '/libraries/clipboard/dist/clipboard.min.js',
                    currentAppPrefix + '/libraries/ngclipboard/dist/ngclipboard.min.js'],
                'html-docx-js': [
                    currentAppPrefix + '/libraries/html-docx-js/dist/html-docx.js'
                ],
                'mdTimePicker': [
                    currentAppPrefix + '/libraries/angular-material-time-picker/dist/md-time-picker.js',
                    currentAppPrefix + '/libraries/angular-material-time-picker/dist/md-time-picker.css'
                ],
                'mdPickers': [
                    currentAppPrefix + '/libraries/mdPickers/dist/mdPickers.min.css',
                    currentAppPrefix + '/libraries/mdPickers/dist/mdPickers.min.js'
                ],
                'ngTagsInput': [
                    currentAppPrefix + '/libraries/ng-tags-input/ng-tags-input.min.js',
                    currentAppPrefix + '/libraries/ng-tags-input/ng-tags-input.bootstrap.min.css',
                    currentAppPrefix + '/libraries/ng-tags-input/ng-tags-input.min.css'
                ],
                'angularCaptcha': [
                    currentAppPrefix + '/libraries/angular-recaptcha/release/angular-recaptcha.min.js'
                ],
                'angularTreeGrid': [
                    currentAppPrefix + '/libraries/angular-bootstrap-grid-tree/src/tree-grid-directive.js',
                    currentAppPrefix + '/libraries/angular-bootstrap-grid-tree/src/treeGrid.css'
                ],
                'angularMaterialFormBuilder': [
                    currentAppPrefix + '/libraries/angular-sortable-view/src/angular-sortable-view.min.js',
                    currentAppPrefix + '/libraries/angular-material-form-builder/dist/styles/app.css',
                ],
                'crossStorageClient': [
                    currentAppPrefix + '/libraries/cross-storage/dist/client.js',
                ],
                'crossStorageHub': [
                    currentAppPrefix + '/libraries/cross-storage/dist/hub.js',
                ],
                'angularMaterial': [
                    //currentAppPrefix + '/libraries/angular-material/angular-material.js',
                    currentAppPrefix + '/libraries/angular-material/angular-material.css'
                ],
                'jsZipAndUtils': [
                    currentAppPrefix + '/libraries/jszip/dist/jszip.js',
                    currentAppPrefix + '/libraries/jszip-utils/dist/jszip-utils.js',
                ]
            },
            // Angular based script (use the right module name)
            modules: [
                {
                    name: 'dateRangePicker', files: [
                        currentAppPrefix + '/libraries/angularjs-daterange-picker/daterangepicker.js'
                    ]
                },
                {
                    name: 'toaster', files: [
                        //currentAppPrefix + '/libraries/angularjs-toaster/toaster.js',
                        //currentAppPrefix + '/libraries/angularjs-toaster/toaster.css'
                    ]
                },
                {
                    name: 'localytics.directives',
                    files: [currentAppPrefix + '/libraries/chosen_v1.2.0/chosen.jquery.min.js',
                        currentAppPrefix + '/libraries/chosen_v1.2.0/chosen.min.css',
                        //currentAppPrefix + '/libraries/chosen-material-theme/dist/chosen-material-theme.min.css',
                        currentAppPrefix + '/libraries/angular-chosen-localytics/dist/angular-chosen.js'],
                    serie: true
                },
                {
                    name: 'ngDialog', files: [currentAppPrefix + '/libraries/ngDialog/js/ngDialog.min.js',
                        currentAppPrefix + '/libraries/ngDialog/css/ngDialog.min.css',
                        currentAppPrefix + '/libraries/ngDialog/css/ngDialog-theme-default.min.css']
                },
                {name: 'ngWig', files: [currentAppPrefix + '/libraries/ngWig/dist/ng-wig.min.js']},
                {
                    name: 'ngTable', files: [currentAppPrefix + '/libraries/ng-table/dist/ng-table.min.js',
                        currentAppPrefix + '/libraries/ng-table/dist/ng-table.min.css']
                },
                {name: 'ngTableExport', files: [currentAppPrefix + '/libraries/ng-table-export/ng-table-export.js']},
                {
                    name: 'angularBootstrapNavTree',
                    files: [
                        currentAppPrefix + '/libraries/angular-bootstrap-nav-tree/dist/abn_tree_directive.js',
                        currentAppPrefix + '/libraries/angular-bootstrap-nav-tree/dist/abn_tree.css'
                    ]
                },
                {
                    name: 'xeditable', files: [currentAppPrefix + '/libraries/angular-xeditable/dist/js/xeditable.js',
                        currentAppPrefix + '/libraries/angular-xeditable/dist/css/xeditable.css']
                },
                {
                    name: 'angularFileUpload',
                    files: [currentAppPrefix + '/libraries/angular-file-upload/dist/angular-file-upload.js']
                },
                {
                    name: 'ngImgCrop',
                    files: [currentAppPrefix + '/libraries/ng-img-crop/compile/unminified/ng-img-crop.js',
                        currentAppPrefix + '/libraries/ng-img-crop/compile/unminified/ng-img-crop.css']
                },
                {
                    name: 'ui.select', files: [currentAppPrefix + '/libraries/angular-ui-select/dist/select.js',
                        currentAppPrefix + '/libraries/angular-ui-select/dist/select.css']
                },
                {
                    name: 'ui.codemirror',
                    files: [currentAppPrefix + '/libraries/angular-ui-codemirror/ui-codemirror.js']
                },
                {
                    name: 'angular-carousel',
                    files: [currentAppPrefix + '/libraries/angular-carousel/dist/angular-carousel.css',
                        currentAppPrefix + '/libraries/angular-carousel/dist/angular-carousel.js']
                },
                {
                    name: 'infinite-scroll',
                    files: [currentAppPrefix + '/libraries/ngInfiniteScroll/build/ng-infinite-scroll.js']
                },
                {
                    name: 'ui.bootstrap-slider',
                    files: [currentAppPrefix + '/libraries/seiyria-bootstrap-slider/dist/bootstrap-slider.min.js',
                        currentAppPrefix + '/libraries/seiyria-bootstrap-slider/dist/css/bootstrap-slider.min.css',
                        currentAppPrefix + '/libraries/angular-bootstrap-slider/slider.js'],
                    serie: true
                },
                {
                    name: 'ui.grid', files: [currentAppPrefix + '/libraries/angular-ui-grid/ui-grid.min.css',
                        currentAppPrefix + '/libraries/angular-ui-grid/ui-grid.min.js']
                },
                {
                    name: 'summernote', files: [currentAppPrefix + '/libraries/bootstrap/js/modal.js',
                        currentAppPrefix + '/libraries/bootstrap/js/dropdown.js',
                        currentAppPrefix + '/libraries/bootstrap/js/tooltip.js',
                        currentAppPrefix + '/libraries/summernote/dist/summernote.css',
                        currentAppPrefix + '/libraries/summernote/dist/summernote.js',
                        currentAppPrefix + '/libraries/angular-summernote/dist/angular-summernote.js'
                    ], serie: true
                },
                {
                    name: 'angular-rickshaw', files: [currentAppPrefix + '/libraries/d3/d3.min.js',
                        currentAppPrefix + '/libraries/rickshaw/rickshaw.js',
                        currentAppPrefix + '/libraries/rickshaw/rickshaw.min.css',
                        currentAppPrefix + '/libraries/angular-rickshaw/rickshaw.js'], serie: true
                },
                {
                    name: 'angular-chartist', files: [currentAppPrefix + '/libraries/chartist/dist/chartist.min.css',
                        currentAppPrefix + '/libraries/chartist/dist/chartist.js',
                        currentAppPrefix + '/libraries/angular-chartist.js/dist/angular-chartist.js'], serie: true
                },
                {name: 'ui.map', files: [currentAppPrefix + '/libraries/angular-ui-map/ui-map.js']},
                {
                    name: 'datatables',
                    files: [
                        currentAppPrefix + '/libraries/datatables/media/js/jquery.dataTables.min.js',
                        currentAppPrefix + '/libraries/angular-datatables/dist/angular-datatables.min.js',
                        currentAppPrefix + '/libraries/angular-datatables/dist/plugins/buttons/angular-datatables.buttons.js',
                        currentAppPrefix + '/libraries/angular-datatables/dist/plugins/bootstrap/angular-datatables.bootstrap.min.js',
                        currentAppPrefix + '/libraries/datatables-scroller/js/dataTables.scroller.js',
                        currentAppPrefix + '/libraries/angular-datatables/dist/plugins/scroller/angular-datatables.scroller.js',
                        currentAppPrefix + '/libraries/datatables-buttons/js/dataTables.buttons.js',
                        currentAppPrefix + '/libraries/datatables-buttons/js/buttons.bootstrap.js',
                        currentAppPrefix + '/libraries/datatables-buttons/js/buttons.colVis.js',
                        currentAppPrefix + '/libraries/datatables-buttons/js/buttons.flash.js',
                        currentAppPrefix + '/libraries/datatables-buttons/js/buttons.html5.js',
                        currentAppPrefix + '/libraries/datatables-buttons/js/buttons.print.js',

                        currentAppPrefix + '/libraries/datatables/media/css/jquery.dataTables.min.css',
                        //currentAppPrefix + '/libraries/datatables/media/css/dataTables.material.min.css',
                        currentAppPrefix + '/libraries/angular-datatables/dist/plugins/bootstrap/datatables.bootstrap.min.css',
                        currentAppPrefix + '/libraries/datatables.net-buttons-bs/css/buttons.bootstrap.min.css',

                        /*

                        currentAppPrefix + '/libraries/datatables/media/js/jquery.dataTables.js',
                        currentAppPrefix + '/libraries/datatables.net-buttons/js/dataTables.buttons.js',
                        currentAppPrefix + '/libraries/datatables.net-buttons-bs/js/buttons.bootstrap.js',
                        currentAppPrefix + '/libraries/datatables.net-buttons/js/buttons.colVis.js',
                        currentAppPrefix + '/libraries/datatables.net-buttons/js/buttons.flash.js',
                        currentAppPrefix + '/libraries/datatables.net-buttons/js/buttons.html5.js',
                        currentAppPrefix + '/libraries/datatables.net-buttons/js/buttons.print.js',
                        currentAppPrefix + '/libraries/angular-datatables/dist/angular-datatables.js',
                        currentAppPrefix + '/libraries/angular-datatables/dist/plugins/buttons/angular-datatables.buttons.js'

                        //TODO in old file in base
                         /*

                          */

                    ],
                    serie: true
                },
                {
                    name: 'angular-jqcloud', files: [currentAppPrefix + '/libraries/jqcloud2/dist/jqcloud.css',
                        currentAppPrefix + '/libraries/jqcloud2/dist/jqcloud.js',
                        currentAppPrefix + '/libraries/angular-jqcloud/angular-jqcloud.js']
                },
                {
                    name: 'angularGrid', files: [
                        currentAppPrefix + '/libraries/ag-grid-community/dist/ag-grid-community.min.js',
                        currentAppPrefix + '/libraries/ag-grid-community/dist/styles/ag-grid.css',
                        currentAppPrefix + '/libraries/ag-grid-community/dist/styles/ag-theme-dark.css',
                        currentAppPrefix + '/libraries/ag-grid-community/dist/styles/ag-theme-fresh.css',
                        currentAppPrefix + '/libraries/ag-grid-community/dist/styles/ag-theme-balham.css'
                    ]
                },
                {
                    name: 'ng-nestable', files: [currentAppPrefix + '/libraries/ng-nestable/src/angular-nestable.js',
                        currentAppPrefix + '/libraries/nestable/jquery.nestable.js']
                },
                {
                    name: 'akoenig.deckgrid',
                    files: [currentAppPrefix + '/libraries/angular-deckgrid/angular-deckgrid.js']
                },
                {
                    name: 'oitozero.ngSweetAlert', files: [
                        currentAppPrefix + '/libraries/sweetalert/dist/sweetalert.css',
                        currentAppPrefix + '/libraries/sweetalert/dist/sweetalert.min.js']
                },
                {
                    name: 'ngSweetAlert', files: [
                        currentAppPrefix + '/libraries/sweetalert/dist/sweetalert.css',
                        currentAppPrefix + '/libraries/sweetalert/dist/sweetalert.min.js']
                },
                {
                    name: 'ngSweetAlert2', files: [
                        currentAppPrefix + '/libraries/sweetalert2/dist/sweetalert2.min.css',
                        currentAppPrefix + '/libraries/sweetalert2/dist/sweetalert2.min.js']
                },
                {
                    name: 'bm.bsTour',
                    files: [currentAppPrefix + '/libraries/bootstrap-tour/build/css/bootstrap-tour.css',
                        currentAppPrefix + '/libraries/bootstrap-tour/build/js/bootstrap-tour-standalone.js',
                        currentAppPrefix + '/libraries/angular-bootstrap-tour/dist/angular-bootstrap-tour.js'],
                    serie: true
                },
                {
                    name: 'ui.knob', files: [currentAppPrefix + '/libraries/angular-knob/src/angular-knob.js',
                        currentAppPrefix + '/libraries/jquery-knob/dist/jquery.knob.min.js']
                },
                {
                    name: 'easypiechart',
                    files: [currentAppPrefix + '/libraries/jquery.easy-pie-chart/dist/angular.easypiechart.min.js']
                },
                {
                    name: 'colorpicker.module',
                    files: [currentAppPrefix + '/libraries/angular-bootstrap-colorpicker/css/colorpicker.css',
                        currentAppPrefix + '/libraries/angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.js']
                },
                {
                    name: 'ui.sortable', files: [currentAppPrefix + '/libraries/jquery-ui/jquery-ui.min.js',
                        currentAppPrefix + '/libraries/angular-ui-sortable/sortable.js'], serie: true
                },
                {
                    name: 'ui.calendar', files: [currentAppPrefix + '/libraries/jquery-ui/jquery-ui.min.js',
                        currentAppPrefix + '/libraries/fullcalendar/dist/fullcalendar.min.js',
                        currentAppPrefix + '/libraries/fullcalendar/dist/gcal.js',
                        currentAppPrefix + '/libraries/fullcalendar/dist/fullcalendar.css',
                        currentAppPrefix + '/libraries/angular-ui-calendar/src/calendar.js'], serie: true
                },
                {
                    name: 'pdfmake',
                    files: [
                        currentAppPrefix + '/libraries/pdfmake/build/pdfmake.min.js',
                        currentAppPrefix + '/libraries/pdfmake/build/vfs_fonts.js',
                        currentAppPrefix + '/libraries/html-to-pdfmake/browser.js'
                    ],
                    serie: true
                },
                {
                    name: 'jspdf',
                    files: [
                        currentAppPrefix + '/libraries/html2canvas/build/html2canvas.min.js',
                        currentAppPrefix + '/libraries/jspdf/dist/jspdf.min.js',
                        currentAppPrefix + '/libraries/jspdf/dist/jspdf.debug.js',
                        currentAppPrefix + '/libraries/jspdf-autotable/dist/jspdf.plugin.autotable.min.js'
                    ],
                    serie: true
                },
                {
                    name: 'file-saver',
                    files: [
                        currentAppPrefix + '/libraries/file-saver.js/FileSaver.js',
                        currentAppPrefix + '/libraries/angular-file-saver/dist/angular-file-saver.bundle.min.js',
                        currentAppPrefix + '/libraries/angular-file-saver/dist/angular-file-saver.min.js',
                    ],
                    serie: true
                },
                {
                    name: 'pusherNotification',
                    files: [
                        currentAppPrefix + '/libraries/pusher-js/dist/web/pusher.min.js',
                        currentAppPrefix + '/libraries/pusher-angular/lib/pusher-angular.min.js'
                    ],
                    serie: true
                },
                {
                    name: 'alasql',
                    files: [
                        currentAppPrefix + '/libraries/alasql/dist/alasql.min.js'
                    ],
                    serie: true
                },
                {
                    name: 'xlsx',
                    files: [
                        currentAppPrefix + '/libraries/js-xlsx/dist/xlsx.core.min.js'
                    ]
                },
                {
                    name: 'ng-sortable',
                    files: [
                        currentAppPrefix + '/libraries/ng-sortable/dist/ng-sortable.min.js',
                        currentAppPrefix + '/libraries/ng-sortable/dist/ng-sortable.min.css'
                    ]
                },
                {
                    name: 'ng-file-upload',
                    files: [
                        currentAppPrefix + '/libraries/ng-file-upload/ng-file-upload.min.js'
                    ],
                    serie: true
                },
                {
                    name: 'perfect_scrollbar',
                    files: [
                        currentAppPrefix + '/libraries/perfect-scrollbar/css/perfect-scrollbar.min.css',
                        currentAppPrefix + '/libraries/perfect-scrollbar/js/perfect-scrollbar.jquery.min.js',
                        currentAppPrefix + '/libraries/angular-perfect-scrollbar/src/angular-perfect-scrollbar.js'
                    ],
                    serie: true
                },
                {
                    name: 'expat-jvectormap',
                    files: [
                        currentAppPrefix + '/libraries/expat-jvectormap/jquery-jvectormap-2.0.3.css',
                        currentAppPrefix + '/libraries/expat-jvectormap/jquery-jvectormap-2.0.3.min.js',
                        currentAppPrefix + '/libraries/expat-jvectormap/jquery-jvectormap-world-mill.js'
                    ],
                    serie: true
                },
                {
                    name: 'tinyMce',
                    files: [
                        currentAppPrefix + '/libraries/tinymce/tinymce.jquery.min.js',
                        currentAppPrefix + '/libraries/tinymce/jquery.tinymce.min.js',
                        currentAppPrefix + '/libraries/angular-ui-tinymce/dist/tinymce.min.js',
                    ],
                    serie: true
                },
                {
                    name: 'expat-scroll',
                    files: [
                        currentAppPrefix + '/libraries/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.min.css',
                        currentAppPrefix + '/libraries/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js',
                        currentAppPrefix + '/libraries/ng-scrollbars/dist/scrollbars.min.js'
                    ],
                    serie: true
                },
                {
                    name: 'expat-calendar',
                    files: [
                        currentAppPrefix + '/libraries/angular-bootstrap-calendar/dist/css/angular-bootstrap-calendar.min.css',
                        currentAppPrefix + '/libraries/angular-bootstrap-calendar/dist/js/angular-bootstrap-calendar-tpls.min.js'
                    ],
                    serie: true
                },
                {
                    name: 'interact',
                    files: [
                        currentAppPrefix + '/libraries/interactjs/dist/interact.min.js',
                        currentAppPrefix + '/libraries/interactjs/dist/interact.min.js.map'
                    ],
                    serie: true
                },
                {
                    name: 'contextMenu',
                    files: [
                        currentAppPrefix + '/libraries/angular-bootstrap-contextmenu/contextMenu.js'
                    ],
                    serie: true
                },
                {
                    name: 'jsZipAndUtils',
                    files: [
                        currentAppPrefix + '/libraries/jszip/dist/jszip.js',
                        currentAppPrefix + '/libraries/jszip-utils/dist/jszip-utils.js',
                    ],
                    serie: true
                }
            ]
        });
})();
