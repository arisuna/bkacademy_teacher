'use strict';

angular.module('app.date-picker-input').directive('datetimeRange', ['urlBase', '$document', '$timeout', function (urlBase, $document, $timeout) {

    return {
        restrict: 'E',
        scope: {
            start: '=startTime',
            end: '=endTime',
            presets: '=?',
            minDate: '=?',
            maxDate: '=?',
            onChange: '&?',
            onChangeStart: '&?',
            onChangeEnd: '&?',
            onClose: '&?',
            closeText: '@',
        },
        replace: true,
        templateUrl: urlBase.tplApp('gms', '_directives_date', 'datetime-range'),
        compile: function () {
            return {
                pre: function preLink() {
                },
                post: function postLink(scope, element) {

                    scope.isStart = false;
                    scope.isEnd = false;
                    // Get current date
                    scope.current = moment();

                    // Convert start datetime to moment.js if its not a moment object yetc
                    console.log(scope.start);
                    console.log(scope.end);

                    if (scope.start && !scope.start._isAMomentObject) {
                        scope.start = moment(scope.start);
                    }

                    // Convert end datetime to moment.js if its not a moment object yet
                    if (scope.end && !scope.end._isAMomentObject) {
                        scope.end = moment(scope.end);
                    }


                    // Get number of weeks in month
                    scope.getNumWeeks = function () {
                        if (!scope.calendar) {
                            return;
                        }

                        var firstDayOfWeek = scope.calendar.clone().startOf('week').weekday();

                        var firstOfMonth = scope.calendar.clone().startOf('month');

                        var lastOfMonth = scope.calendar.clone().endOf('month');

                        var firstWeekDay = (firstOfMonth.weekday() - firstDayOfWeek + 7) % 7;

                        return Math.ceil((firstWeekDay + scope.calendar.daysInMonth()) / 7);
                    }

                    scope.selectStartDate = function () {
                        if (scope.start === undefined || scope.start == null) {
                            scope.start = moment().add(1, 'hours').set('minute', 0);
                        }
                        scope.isStart = true;
                        scope.isEnd = false;
                        scope.selectDate(scope.start);
                    };

                    scope.selectEndDate = function () {
                        if (scope.end === undefined || scope.end == null) {
                            if (scope.start) {
                                scope.end = scope.start.clone().add(1, 'hours').set('minute', 0);
                            } else {
                                scope.end = moment().add(2, 'hours').set('minute', 0);
                            }
                        }
                        scope.isStart = false;
                        scope.isEnd = true;
                        scope.selectDate(scope.end);
                    };

                    // Set selected date
                    scope.selectDate = function (date) {

                        if (scope.selected === date) {
                            scope.selected = undefined;
                        } else {
                            scope.selected = date;
                            scope.calendar = scope.selected.clone();
                            scope.presetsActive = false;
                        }
                    };

                    // Check if date is within bounds of min and max allowed date
                    scope.isWithinBounds = function (date) {
                        return (!scope.minDate || date > scope.minDate) && (!scope.maxDate || date < scope.maxDate);
                    };

                    // Update selected date
                    scope.setDate = function (date, calendar_update) {
                        if (scope.selected.isSame(date) || !scope.isWithinBounds(date)) {
                            return;
                        }

                        scope.selected.year(date.year()).month(date.month()).date(date.date()).hours(date.hours()).minutes(date.minutes()).seconds(0);
                        if ((scope.selected.clone().startOf('week').month() !== scope.calendar.month() && scope.selected.clone().endOf('week').month() !== scope.calendar.month()) || calendar_update) {
                            scope.calendar = scope.selected.clone();
                        }
                        if (scope.isStart) {
                            scope.start = scope.selected.clone();
                            scope.callbackStart();
                        }
                        if (scope.isEnd) {
                            scope.end = scope.selected.clone();
                            scope.callbackEnd();
                        }

                        scope.callbackAll();

                        /*
                        if ((scope.selected === scope.start && date < scope.end) || (scope.selected === scope.end && date > scope.start)) {
                            scope.selected.year(date.year()).month(date.month()).date(date.date()).hours(date.hours()).minutes(date.minutes()).seconds(date.seconds());
                            if ((scope.selected.clone().startOf('week').month() !== scope.calendar.month() && scope.selected.clone().endOf('week').month() !== scope.calendar.month()) || calendar_update) {
                                scope.calendar = scope.selected.clone();
                            }
                            if (scope.selected === scope.start) {
                                scope.callbackStart();
                            }
                            if (scope.selected === scope.end) {
                                scope.callbackEnd();
                            }
                            scope.callbackAll();
                        } else {


                            scope.selected.year(date.year()).month(date.month()).date(date.date()).hours(date.hours()).minutes(date.minutes()).seconds(date.seconds());

                            if ((scope.selected.clone().startOf('week').month() !== scope.calendar.month() &&
                                scope.selected.clone().endOf('week').month() !== scope.calendar.month()) ||
                                calendar_update) {
                                scope.calendar = scope.selected.clone();
                            }
                            if (scope.selected === scope.start) {
                                scope.callbackStart();
                                scope.end = null;
                            }
                            if (scope.selected === scope.end) {
                                scope.callbackEnd();
                                scope.start = null;
                            }
                            scope.callbackAll();

                        }
                        */

                        /*
                        scope.warning = (scope.selected === scope.start) ? 'end' : 'start';
                        $timeout(function () {
                            scope.warning = undefined;
                        }, 250);
                        */
                    };

                    // Set start and end datetime objects to the selected preset
                    scope.selectPreset = function (preset) {
                        // Hide presets menu on select
                        scope.close();

                        // Don't do anything if nothing is changed
                        if (scope.start.isSame(preset.start) && scope.end.isSame(preset.end)) {
                            return;
                        }

                        // Update start datetime object if changed
                        if (!scope.start.isSame(preset.start)) {
                            scope.start = preset.start.clone();
                            scope.callbackStart();
                        }

                        // Update end datetime object if changed
                        if (!scope.end.isSame(preset.end)) {
                            scope.end = preset.end.clone();
                            scope.callbackEnd();
                        }

                        // Something has definitely changed, fire ambiguous callback
                        scope.callbackAll();
                    };

                    // Callbacks fired on change of start datetime object
                    scope.callbackStart = function () {
                        if (!!scope.onChangeStart) {
                            $timeout(function () {
                                scope.onChangeStart();
                            });
                        }
                    };

                    // Callbacks fired on change of end datetime object
                    scope.callbackEnd = function () {
                        if (!!scope.onChangeEnd) {
                            $timeout(function () {
                                scope.onChangeEnd();
                            });
                        }
                    };

                    // Callbacks fired on change of start and/or end datetime objects
                    scope.callbackAll = function () {
                        if (!!scope.onChange) {
                            $timeout(function () {
                                scope.onChange();
                            });
                        }
                    };

                    // Close edit popover
                    scope.close = function () {
                        scope.selected = '';
                        scope.presetsActive = false;
                        scope.calendarActive = false;

                        if (!!scope.onClose) {
                            scope.onClose();
                        }
                    }

                    // Bind click events outside directive to close edit popover
                    $document.on('mousedown', function (e) {
                        if (!element[0].contains(e.target) && (!!scope.presetsActive || !!scope.selected)) {
                            scope.$apply(function () {
                                scope.close();
                            });
                        }
                    });

                    // Bind 'esc' keyup event to close edit popover
                    $document.on('keyup', function (e) {
                        if (e.keyCode === 27 && (!!scope.presetsActive || !!scope.selected)) {
                            scope.$apply(function () {
                                scope.close();
                            });
                        }
                    });
                }
            };
        }
    };
}]);
