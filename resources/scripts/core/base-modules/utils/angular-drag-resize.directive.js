'use strict';
(function () {
    angular.module('app.utils')
        .provider('adrConfig', function () {

            var defaultConfig = {
                iconPosition: [0, 0],
                mode: 'all',
                modes: ['all', 'horizontal', 'vertical', 'square']
            };
            var config = angular.extend({}, defaultConfig);
            this.$get = [function () {
                return {
                    iconPosition: config.iconPosition,
                    mode: config.mode,
                    modes: config.modes
                };
            }];

        }).directive('resize', ['adrConfig', '$document', function (adrConfig, $document) {
        return {
            restrict: 'A',
            replace: 'true',
            link: function (scope, element, attr) {
                console.log('resize');
                let id = attr.id;
                var dimension = {};
                var iconPosition = adrConfig.iconPosition;
                var mode = attr.resize && adrConfig.modes.indexOf(attr.resize) > -1 ? attr.resize : adrConfig.mode;
                var position = {};
                //create button for resizing
                var btn = document.createElement("span");
                if (id) {
                    btn.id = 'resize_' + id;
                }
                btn.style.width = '100%';
                btn.style.height = '5px';
                btn.innerHTML = `<svg style="opacity: 0; height: 1px">\
                    <circle cx='12.5' cy='2.5' r='2' fill='#777777'></circle>\
                    <circle cx='7.5' cy='7.5' r='2' fill='#777777'></circle>\
                    <circle cx='12.5' cy='7.5' r='2' fill='#424242'></circle>\
                    <circle cx='2.5' cy='12.5' r='2' fill='#777777'></circle>\
                    <circle cx='7.5' cy='12.5' r='2' fill='#424242'></circle>\
                    <circle cx='12.5' cy='12.5' r='2' fill='#212121'></circle></svg>`
                ;
                btn.style.bottom = iconPosition[0] + 'px';
                btn.style.left = iconPosition[1] + 'px';
                btn.style.position = 'absolute';
                btn.style.visibility = 'hidden';
                if (mode === 'horizontal') {
                    btn.style.cursor = 'ew-resize';
                } else if (mode === 'vertical') {
                    btn.style.cursor = 'ns-resize';
                } else {
                    btn.style.cursor = 'nwse-resize';
                }
                //bind resize function to button;
                btn.onmousedown = function ($event) {
                    $event.stopImmediatePropagation();
                    position.x = $event.clientX;
                    position.y = $event.clientY;
                    dimension.width = element.prop('offsetWidth');
                    dimension.height = element.prop('offsetHeight');
                    $document.bind('mousemove', mousemove);
                    $document.bind('mouseup', mouseup);
                    return false;
                };

                function mousemove($event) {
                    var deltaWidth = dimension.width - (position.x - $event.clientX);
                    var deltaHeight = dimension.height - (position.y - $event.clientY);
                    var newDimensions = {};
                    if (mode === 'horizontal') {
                        newDimensions = {
                            width: deltaWidth + 'px'
                        };
                    } else if (mode === 'vertical') {
                        newDimensions = {
                            height: deltaHeight + 'px'
                        };
                    } else if (mode === 'square') {
                        newDimensions = {
                            width: 'fit-content',
                            height: deltaHeight + 'px'
                        };
                        let childDimensions = {
                            width: deltaHeight + 'px',
                            height: deltaHeight + 'px'
                        };

                        let id = $(element).attr('id');
                        console.log(childDimensions);
                        $(element).children('#match_field_' + id).css(childDimensions);

                    } else {
                        newDimensions = {
                            width: deltaWidth + 'px',
                            height: deltaHeight + 'px'
                        };
                    }
                    element.css(newDimensions);
                    return false;
                }

                function mouseup() {
                    $document.unbind('mousemove', mousemove);
                    $document.unbind('mouseup', mouseup);
                }

                element.append(btn);
                //show button on hover
                element.bind('mouseover', function () {
                    btn.style.visibility = 'visible';
                });
                element.bind('mouseout', function () {
                    btn.style.visibility = 'hidden';
                });

            }
        };
    }]).directive('customDraggable', ['$document', function ($document) {
        return {
            restrict: 'A',
            scope: {
                onChangeFn: '&?',
            },
            replace: 'true',
            link: function (scope, element, attr) {
                var position = {};
                console.log('customDraggable', attr);

                var pointerX;
                var pointerY;
                let zoom = $('#the-canvas').css('zoom');

                console.log("zoom", zoom);

                element.draggable({
                    'containment': 'the-canvas',
                    tolerance: "fit",
                    scroll: true,
                    scrollSensitivity: 150,
                    drag: function (evt, ui) {
                        var canvasTop = $('#the-canvas').offset().top;
                        var canvasLeft = $('#the-canvas').offset().left;
                        var canvasHeight = $('#the-canvas').height();
                        var canvasWidth = $('#the-canvas').width();

                        // Fix for zoom
                        ui.position.top = Math.round((evt.pageY - canvasTop) / zoom - pointerY);
                        ui.position.left = Math.round((evt.pageX - canvasLeft) / zoom - pointerX);

                        // Check if element is outside canvas
                        if (ui.position.left < 0) ui.position.left = 0;
                        if (ui.position.left + $(this).width() > canvasWidth) {
                            ui.position.left = canvasWidth - $(this).width();
                        }
                        if (ui.position.top < 0) ui.position.top = 0;
                        if (ui.position.top + $(this).height() > canvasHeight) {
                            ui.position.top = canvasHeight - $(this).height();
                        }

                        // Finally, make sure offset aligns with position
                        ui.offset.top = Math.round(ui.position.top + canvasTop);
                        ui.offset.left = Math.round(ui.position.left + canvasLeft);
                    },
                    start: function (evt, ui) {
                        pointerY = (evt.pageY - $('#the-canvas').offset().top) / zoom - parseInt($(evt.target).css('top'));
                        pointerX = (evt.pageX - $('#the-canvas').offset().left) / zoom - parseInt($(evt.target).css('left'));
                    },
                    stop: function (event, ui) {
                        // console.log(event);
                        // console.log($(ui.helper[0]).children().attr('id'));
                        // console.log($(ui.helper[0]).attr('id'));

                        if (angular.isFunction(scope.onChangeFn)) {
                            scope.onChangeFn({
                                params: {
                                    uuid: $(ui.helper[0]).attr('id'),
                                    left: $(ui.helper[0]).position().left,
                                    top: $(ui.helper[0]).position().top
                                }
                            });
                        }
                    }

                });

                // element.bind('mousedown', function($event) {
                //     //element.css({position: 'fixed'});
                //     position.x = element[0].getBoundingClientRect().left;
                //     position.y = element[0].getBoundingClientRect().top;
                //     position.initialMouseX = $event.clientX;
                //     position.initialMouseY = $event.clientY;
                //
                //     console.log('position', position);
                //
                //     $document.bind('mousemove', mousemove);
                //     $document.bind('mouseup', mouseup);
                //     return false;
                // });
                //
                // function mousemove($event) {
                //     var dx = $event.clientX - position.initialMouseX;
                //     var dy = $event.clientY - position.initialMouseY;
                //
                //     console.log('TOP', position.y + dy);
                //     console.log('left', dx);
                //     element.css({
                //         top:  position.y + dy + 'px',
                //         left: dx + 'px'
                //     });
                //     return false;
                // }
                // function mouseup() {
                //     $document.unbind('mousemove', mousemove);
                //     $document.unbind('mouseup', mouseup);
                // }
            }
        };
    }]).directive('cusResize', ['adrConfig', '$document', function (adrConfig, $document) {
        return {
            restrict: 'A',
            scope: {
                onChangeFn: '&?',
            },
            replace: 'true',
            link: function (scope, element, attr) {
                let id = attr.id;
                var dimension = {};
                var iconPosition = adrConfig.iconPosition;
                var mode = attr.cusResize && adrConfig.modes.indexOf(attr.cusResize) > -1 ? attr.cusResize : adrConfig.mode;
                var position = {};
                //create button for resizing
                var btn = document.createElement("span");
                if (id) {
                    btn.id = 'resize_' + id;
                }

                let timer = '';
                btn.style.width = '100%';
                btn.style.height = '5px';
                btn.style.marginBottom = '-3px';
                btn.style.zIndex = '9999';
                btn.style.bottom = iconPosition[0] + 'px';
                btn.style.left = iconPosition[1] + 'px';
                btn.style.position = 'absolute';
                btn.style.visibility = 'hidden';
                if (mode === 'horizontal') {
                    btn.style.cursor = 'ew-resize';
                } else if (mode === 'vertical') {
                    btn.style.cursor = 'ns-resize';
                } else {
                    btn.style.cursor = 'nwse-resize';
                }

                function changeWH(w, h) {
                    if (angular.isFunction(scope.onChangeFn)) {
                        const uuid = attr.id.replace('match_field_', '');

                        clearTimeout(timer);
                        timer = setTimeout(() => {
                            scope.onChangeFn({
                                params: {
                                    uuid: uuid,
                                    width: w,
                                    height: h
                                }
                            });
                        }, 1000);
                    }
                    return;
                }

                function mousemove($event) {
                    var deltaWidth = Math.max(dimension.width - (position.x - $event.clientX), 12);
                    var deltaHeight = Math.max(dimension.height - (position.y - $event.clientY), 12);
                    var newDimensions = {};
                    if (mode === 'horizontal') {
                        deltaHeight = deltaWidth;
                    } else if (mode === 'vertical') {
                        deltaWidth = deltaHeight;
                    } else if (mode === 'square') {
                        newDimensions = {
                            width: deltaHeight + 'px',
                            height: deltaHeight + 'px'
                        };

                        changeWH(deltaHeight, deltaHeight);
                        element.css(newDimensions);
                        return false;
                    }

                    changeWH(deltaWidth, deltaHeight);
                    newDimensions = {
                        width: deltaWidth + 'px',
                        height: deltaHeight + 'px'
                    };
                    element.css(newDimensions);
                    return false;
                }

                function mouseup() {
                    $document.unbind('mousemove', mousemove);
                    $document.unbind('mouseup', mouseup);
                }

                //bind resize function to button;
                btn.onmousedown = function ($event) {
                    $event.stopImmediatePropagation();
                    position.x = $event.clientX;
                    position.y = $event.clientY;
                    dimension.width = element.prop('offsetWidth');
                    dimension.height = element.prop('offsetHeight');
                    $document.bind('mousemove', mousemove);
                    $document.bind('mouseup', mouseup);
                    return false;
                };

                element.append(btn);
                //show button on hover
                element.bind('mouseover', function () {
                    btn.style.visibility = 'visible';
                });
                element.bind('mouseout', function () {
                    btn.style.visibility = 'hidden';
                });

            }
        };
    }]);
})();

