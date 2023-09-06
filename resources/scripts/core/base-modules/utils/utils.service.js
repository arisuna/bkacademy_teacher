/**=========================================================
 * Module: utils.js
 * Utility library to use across the theme
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('app.utils')
        .service('Utils', Utils);

    Utils.$inject = ['$window', 'APP_MEDIAQUERY', 'moment', '$q'];

    function Utils($window, APP_MEDIAQUERY, moment) {

        var $html = angular.element('html'),
            $win = angular.element($window),
            $body = angular.element('body');

        var pdfData = {
            pages: [],
            heights: [],
            width: 0,
            height: 0,
            currentPage: 1,
            scale: 1.33385,
            pageSize: ''
        };

        return {
            // DETECTION
            support: {
                transition: (function () {
                    var transitionEnd = (function () {

                        var element = document.body || document.documentElement,
                            transEndEventNames = {
                                WebkitTransition: 'webkitTransitionEnd',
                                MozTransition: 'transitionend',
                                OTransition: 'oTransitionEnd otransitionend',
                                transition: 'transitionend'
                            }, name;

                        for (name in transEndEventNames) {
                            if (element.style[name] !== undefined) return transEndEventNames[name];
                        }
                    }());

                    return transitionEnd && {end: transitionEnd};
                })(),
                animation: (function () {

                    var animationEnd = (function () {

                        var element = document.body || document.documentElement,
                            animEndEventNames = {
                                WebkitAnimation: 'webkitAnimationEnd',
                                MozAnimation: 'animationend',
                                OAnimation: 'oAnimationEnd oanimationend',
                                animation: 'animationend'
                            }, name;

                        for (name in animEndEventNames) {
                            if (element.style[name] !== undefined) return animEndEventNames[name];
                        }
                    }());

                    return animationEnd && {end: animationEnd};
                })(),
                requestAnimationFrame: window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.msRequestAnimationFrame ||
                    window.oRequestAnimationFrame ||
                    function (callback) {
                        window.setTimeout(callback, 1000 / 60);
                    },
                /*jshint -W069*/
                touch: (
                    ('ontouchstart' in window && navigator.userAgent.toLowerCase().match(/mobile|tablet/)) ||
                    (window.DocumentTouch && document instanceof window.DocumentTouch) ||
                    (window.navigator['msPointerEnabled'] && window.navigator['msMaxTouchPoints'] > 0) || //IE 10
                    (window.navigator['pointerEnabled'] && window.navigator['maxTouchPoints'] > 0) || //IE >=11
                    false
                ),
                mutationobserver: (window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver || null)
            },
            // UTILITIES
            isInView: function (element, options) {
                /*jshint -W106*/
                var $element = $(element);

                if (!$element.is(':visible')) {
                    return false;
                }

                var window_left = $win.scrollLeft(),
                    window_top = $win.scrollTop(),
                    offset = $element.offset(),
                    left = offset.left,
                    top = offset.top;

                options = $.extend({topoffset: 0, leftoffset: 0}, options);

                if (top + $element.height() >= window_top && top - options.topoffset <= window_top + $win.height() &&
                    left + $element.width() >= window_left && left - options.leftoffset <= window_left + $win.width()) {
                    return true;
                } else {
                    return false;
                }
            },

            langdirection: $html.attr('dir') === 'rtl' ? 'right' : 'left',

            isTouch: function () {
                return $html.hasClass('touch');
            },

            isSidebarCollapsed: function () {
                return $body.hasClass('aside-collapsed') || $body.hasClass('aside-collapsed-text');
            },

            isSidebarToggled: function () {
                return $body.hasClass('aside-toggled');
            },

            isMobile: function () {
                return $win.width() < APP_MEDIAQUERY.tablet;
            },

            isEmail: function (email) {
                var EMAIL_REGEXP = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
                var isMatchRegex = EMAIL_REGEXP.test(email);
                if (isMatchRegex) return true;
                else return false;
            },

            isImage: function (src) {

                var deferred = $q.defer();

                var image = new Image();
                image.onerror = function () {
                    deferred.resolve(false);
                };
                image.onload = function () {
                    deferred.resolve(true);
                };
                image.src = src;

                return deferred.promise;
            },

            isUndefinedOrNull: function (obj) {
                return !angular.isDefined(obj) || obj === null;
            },

            setRange: function (start, end) {
                return [...Array(end - start + 1)].map((_, i) => start + i);
            },

            getInitials: function (name, delimeter = " ") {
                if (name) {
                    var array = name.split(delimeter);
                    switch (array.length) {
                        case 1:
                            return array[0].charAt(0).toUpperCase();
                            break;
                        default:
                            return array[0].charAt(0).toUpperCase() + array[array.length - 1].charAt(0).toUpperCase();
                    }
                }
                return false;
            },
            removeNbspTags: function (content) {
                var html = content;
                html = html.replace(/\s|&nbsp;/g, '');
                html = html.replace(/<(\w+)\b(?:\s+[\w\-.:]+(?:\s*=\s*(?:"[^"]*"|"[^"]*"|[\w\-.:]+))?)*\s*\/?>\s*<\/\1\s*>/g, '');
                return html;
            },
            removeParagraphNbspTags: function (content) {
                content.replace(/<p>&nbsp;<\/p>/g, '');
                return content;
            },
            alertScam: function () {
                console.log('%cStop!', 'color: red; font-size: 30px; font-weight: bold;');
                console.log('%cThis is a browser feature intended for developers. If someone told you to copy and paste something here to enable a Relotalent feature or "hack" someone\'s account, it is a scam and will give them access to your Relotalent account.', 'color: black; font-size: 18px; font-weight: bold;');
            },
            scrollToBottom: function (element, callback) {
                angular.element("section-body").bind("scroll", function () {
                    let windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
                    let body = document.body,
                        html = document.documentElement;
                    let docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
                    let windowBottom = Math.round(windowHeight + window.pageYOffset) + 1;
                    if (windowBottom >= docHeight) {
                        if (angular.isFunction(callback)) {
                            callback();
                        }
                    }
                });
            },

            scrollToBottom2: function (element, callback) {
                angular.element(element).bind("scroll", function () {
                    let windowHeight = "innerHeight" in element ? element.innerHeight : element.documentElement.offsetHeight;
                    let docHeight = Math.max(element.scrollHeight, element.offsetHeight);
                    let windowBottom = Math.round(windowHeight + element.pageYOffset) + 1;
                    if (windowBottom >= docHeight) {
                        if (angular.isFunction(callback)) {
                            callback();
                        }
                    }
                });
            },

            getOffsetPosition: function (elm) {
                try {
                    return elm.offset();
                } catch (e) {

                }
                var rawDom = elm[0];
                var _x = 0;
                var _y = 0;
                var body = document.documentElement || document.body;
                var scrollX = window.pageXOffset || body.scrollLeft;
                var scrollY = window.pageYOffset || body.scrollTop;
                _x = rawDom.getBoundingClientRect().left + scrollX;
                _y = rawDom.getBoundingClientRect().top + scrollY;
                return {left: _x, top: _y};
            },
            arrayBufferToBase64: function (buffer) {
                var binary = '';
                var bytes = new Uint8Array(buffer);
                var len = bytes.byteLength;
                for (var i = 0; i < len; i++) {
                    binary += String.fromCharCode(bytes[i]);
                }
                return window.btoa(binary);
            },

            downloadCSV: function (args) {

                var arrayData, data, filename, link;

                arrayData = args.data || null;

                var csv = this.convertArrayOfObjectsToCSV({
                    data: arrayData,
                    columnDelimiter: angular.isDefined(args.delimiter) ? args.delimiter : ";"
                });

                if (csv == null) return;

                filename = args.filename || 'export.csv';

                if (!csv.match(/^data:text\/csv/i)) {
                    csv = 'data:text/csv;charset=utf-8,' + csv;
                }
                data = encodeURI(csv);

                link = document.createElement('a');
                link.setAttribute('href', data);
                link.setAttribute('download', filename);
                link.click();
            },

            convertArrayOfObjectsToCSV: function (args) {
                var result, ctr, keys, columnDelimiter, lineDelimiter, data;
                data = args.data || null;
                if (data == null || !data.length) {
                    return null;
                }

                columnDelimiter = args.columnDelimiter || ',';
                lineDelimiter = args.lineDelimiter || '\n';

                keys = Object.keys(data[0]);

                result = '';
                result += keys.join(columnDelimiter);
                result += lineDelimiter;

                data.forEach(function (item) {
                    ctr = 0;
                    keys.forEach(function (key) {
                        if (ctr > 0) result += columnDelimiter;

                        result += item[key];
                        ctr++;
                    });
                    result += lineDelimiter;
                });

                return result;
            },

            transformStringToKey: function slugify(string) {
                const a = 'àáäâãåèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_:;'
                const b = 'aaaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh-----'
                const p = new RegExp(a.split('').join('|'), 'g')
                return string.toString().toLowerCase()
                    .trim()
                    .replace(/\s+/g, '-') // Replace spaces with
                    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
                    .replace(/&/g, '-and-') // Replace & with ‘and’
                    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
                    .replace(/\-\-+/g, '-') // Replace multiple — with single -
                    .replace(/^-+/, '') // Trim — from start of text .replace(/-+$/, '') // Trim — from end of text
                    .replace(/^-+/, '') // Trim — from start of text .replace(/-+$/, '') // Trim — from end of text
                    .replace(/\-/g, '_') // Replace  — with _
                    .replace(/^_+/, '') // Trim — from start of text .replace(/-+$/, '') // Trim — from end of text
            },


            transformHeardersLinesCSV: function slugify(string) {
                const a = 'àáäâãåèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_:'
                const b = 'aaaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh----'
                const p = new RegExp(a.split('').join('|'), 'g')
                return string.toString().toLowerCase()
                    .trim()
                    .replace(/\s+/g, '-') // Replace spaces with
                    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
                    .replace(/&/g, '-and-') // Replace & with ‘and’
                    .replace(/[^\w\-\;\,]+/g, '') // Remove all non-word characters
                    .replace(/\-\-+/g, '-') // Replace multiple — with single -
                    .replace(/^-+/, '') // Trim — from start of text .replace(/-+$/, '') // Trim — from end of text
                    .replace(/^-+/, '') // Trim — from start of text .replace(/-+$/, '') // Trim — from end of text
                    .replace(/\-/g, '_') // Replace  — with _
                    .replace(/^_+/, '') // Trim — from start of text .replace(/-+$/, '') // Trim — from end of text
            },

            csvGetHeaders: function (csvString, args) {
                var vm = this;
                var lineDelimiter = args.lineDelimiter || '\n';
                var columnDelimiter = args.columnDelimiter || ',';
                var textDelimiter = args.textDelimiter || '"';

                var lines = csvString.split(lineDelimiter);
                var headerValues = lines[0].split(columnDelimiter);
                var headers = [];
                headerValues.forEach(function (headerValue, index) {
                    headerValue = vm.transformStringToKey(headerValue);
                    headers.push({name: headerValue});
                });
                return headers;
            },

            csvToArray: function (csvString, args) {
                csvString = csvString.trim();

                console.log(csvString);

                var vm = this;
                let lineDelimiter = '\n';
                if (args.lineDelimiter == 'RN') {
                    lineDelimiter = '\r\n';
                } else if (args.lineDelimiter == 'N') {
                    lineDelimiter = '\n';
                }

                var columnDelimiter = args.columnDelimiter || ';';
                var textDelimiter = args.textDelimiter || '"';

                var lines = csvString.split(lineDelimiter);
                var headerValues = lines[0].split(columnDelimiter);
                var dataValues = lines.splice(1).map(function (dataLine) {
                    return dataLine.split(columnDelimiter);
                });


                return dataValues.map(function (rowValues) {
                    var row = {};
                    headerValues.forEach(function (headerValue, index) {
                        headerValue = vm.transformStringToKey(headerValue);
                        row[headerValue] = (index < rowValues.length) ? rowValues[index] : null;
                    });
                    return row;
                });
            },
            /**
             * @param strData
             * @param argDialect
             */
            csvToArrayFormat2: function (strData, argDialect = {}) {
                let vm = this;

                argDialect.header = true;
                argDialect.skipEmptyLines = true;
                argDialect.trimHeaders = true;
                argDialect.encoding = "UTF-8";

                argDialect.beforeFirstChunk = function (chunk) {
                    var rows = chunk.split(/\r\n|\r|\n/);
                    var headings = rows[0].toLowerCase();
                    headings = vm.transformHeardersLinesCSV(headings);
                    rows[0] = headings;
                    return rows.join("\r\n");
                };

                let result = Papa.parse(strData, argDialect);
                return result.data;
            },
            stripTags: function (text) {
                //remove tag
                text = text ? String(text).replace(/<[^>]+>/gm, '') : '';

                //remove code space
                text = text.replace(/&nbsp;/g, '');

                return text;

            },
            isPassword: function (password) {
                if (password == '' || password.length > 16 || password.length < 6) {
                    return false;
                }
                var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/;
                var isMatchRegex = passwordRegex.test(password);
                if (isMatchRegex) return true;
                else return false;
            },

            convertArrayToObject: function (array, keyField) {
                return array.reduce((obj, item) => {
                    obj[item[keyField]] = item
                    return obj
                }, {});
            },

            convertImageUrlToBase64: function (url, callback) {
                var image = new Image();

                image.onload = function () {
                    var canvas = document.createElement('canvas');
                    canvas.id = "canvas";
                    canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
                    canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size

                    canvas.getContext('2d').drawImage(this, 0, 0);

                    // Get raw image data
                    callback(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));

                    // ... or get as Data URI
                    callback(canvas.toDataURL('image/png'));
                };
                image.src = url;
            },

            uuid: function () {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
            },


            isUuid: function (value) {
                var UUID_V5_MATCH = /^[0-9A-F]{8}-[0-9A-F]{4}-[1-5][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
                var isMatchRegex = UUID_V5_MATCH.test(value);
                if (isMatchRegex) return true;
                else return false;
            },

            getBrowsers: function () {
                let array;
                return array = [
                    {
                        identity: 'chrome',
                        label: 'BROWSER_CHROME_TEXT',
                        link: 'https://www.google.com/intl/en/chrome/'
                    },
                    {
                        identity: 'firefox',
                        label: 'BROWSER_FIREFOX_TEXT',
                        link: 'https://www.mozilla.org/en-US/firefox/new/'
                    },
                    {
                        identity: 'edge',
                        label: 'BROWSER_EDGE_TEXT',
                        link: 'https://www.microsoft.com/en-US/windows/microsoft-edge'
                    },
                    {
                        identity: 'safari',
                        label: 'BROWSER_SAFARI_TEXT',
                        link: 'https://www.apple.com/safari/'
                    }
                ];
            },

            checkBrowser: function () {
                var agl = angular || {};
                var ua = navigator.userAgent;

                agl.ISFF = ua.indexOf('Firefox') != -1;
                agl.ISOPERA = ua.indexOf('Opera') != -1;
                agl.ISCHROME = ua.indexOf('Chrome') != -1;
                agl.ISSAFARI = ua.indexOf('Safari') != -1 && !agl.ISCHROME;
                agl.ISWEBKIT = ua.indexOf('WebKit') != -1;

                agl.ISIE = ua.indexOf('Trident') > 0 || navigator.userAgent.indexOf('MSIE') > 0;
                agl.ISIE6 = ua.indexOf('MSIE 6') > 0;
                agl.ISIE7 = ua.indexOf('MSIE 7') > 0;
                agl.ISIE8 = ua.indexOf('MSIE 8') > 0;
                agl.ISIE9 = ua.indexOf('MSIE 9') > 0;
                agl.ISIE10 = ua.indexOf('MSIE 10') > 0;
                agl.ISOLD = agl.ISIE6 || agl.ISIE7 || agl.ISIE8; // MUST be here

                agl.ISIE11UP = ua.indexOf('MSIE') == -1 && ua.indexOf('Trident') > 0;
                agl.ISIE10UP = agl.ISIE10 || agl.ISIE11UP;
                agl.ISIE9UP = agl.ISIE9 || agl.ISIE10UP;

                if (angular.ISIE) {
                    return 1;
                } else {
                    return 0;
                }
            },
            getNumber: function (number) {
                return number ? number : 0;
            },

            removeObjectProperty: function (obj, propertyName) {
                if (_.has(obj, propertyName)) {
                    delete obj[propertyName]
                }
            },

            parseDate: function (dateString) {
                if (_.isString(dateString)) {
                    var b = dateString.split(/\D/);
                    if (dateString.length > 10) {
                        return new Date(b[0], b[1] - 1, b[2], b[3], b[4], b[5]);
                    } else {
                        return new Date(b[0], b[1] - 1, b[2], b[3]);
                    }
                }
            },

            isUrl: function (string) {

                let protocolAndDomainRE = /^(?:\w+:)?\/\/(\S+)$/;
                let localhostDomainRE = /^localhost[\:?\d]*(?:[^\:?\d]\S*)?$/
                let nonLocalhostDomainRE = /^[^\s\.]+\.\S{2,}$/;


                if (typeof string !== 'string') {
                    return false;
                }

                var match = string.match(protocolAndDomainRE);
                if (!match) {
                    return false;
                }

                var everythingAfterProtocol = match[1];
                if (!everythingAfterProtocol) {
                    return false;
                }

                if (localhostDomainRE.test(everythingAfterProtocol) ||
                    nonLocalhostDomainRE.test(everythingAfterProtocol)) {
                    return true;
                }

                return false;
            },

            comparePercentValue: function (num1, num2) {
                return (100 * (_.round((num1 - num2) / (num2), 2)));
            },

            comparePercentString: function (num1, num2) {
                if (num1 == num2) return "0%";
                return (num1 > num2 ? " + " : " - ") + (100 * (Math.abs(_.round((num1 - num2) / (num2), 2)))).toFixed(0) + "%";
            },

            isDateValid: function (value, format = "DD/MM/YYYY") {
                return moment(value, format, true).isValid();
            },

            isUtc: function (value) {
                if (_.isNumber(value) && (value) * 1000 > Math.abs(Date.UTC(1970, 1, 1))) {
                    return true;
                }
                return false;
            },
            isNotEmpty: function (value) {
                if (angular.isUndefined(value) || _.isNull(value) || value == '') {
                    return false;
                }
                return true;
            },
            getPositionDropdownDialog: function ($event, width, height, placeX = 35, placeY = 40, position = 'left') {
                let element = $event.currentTarget;
                let place = element.getBoundingClientRect();
                let className = 'bottom';
                let dialogTop = 0, dialogBottom = 0, dialogRight = 0, dialogLeft = 0,
                    dialogHeight = height, dialogWidth = width;

                if ($window.innerHeight - _.parseInt(place.y) < height) {
                    className = 'top';
                    dialogBottom = ($window.innerHeight - _.parseInt(place.y) - 1).toString() + 'px';
                    dialogLeft = (_.parseInt(place.x) - placeX).toString() + 'px';
                    dialogHeight = 0;
                    dialogWidth = 0;

                } else {
                    className = 'bottom';
                    dialogTop = (_.parseInt(place.y) + placeY).toString() + 'px';
                    dialogLeft = (_.parseInt(place.x) - placeX).toString() + 'px';
                    dialogRight = 'inherit';
                    dialogHeight = 0;
                    dialogWidth = 0;
                }

                if (position == 'right') {
                    className = 'custom-right';
                    // dialogLeft = (_.parseInt(place.x) - width + 5).toString() + 'px';
                    // dialogRigh$window.innerWidtht = 'inherit';
                    let right = 0;
                    if(element.offsetParent){
                        let placeParent = element.offsetParent.getBoundingClientRect();
                        right = parseInt(placeParent.right);
                    }else{
                        right = parseInt(place.right);
                    }

                    dialogRight = ($window.innerWidth - parseInt(right)).toString() + 'px';
                    dialogLeft = 'inherit';
                    dialogHeight = 0;
                    dialogWidth = 0;

                    if ($window.innerHeight / 2 < place.y){
                        dialogTop = 'inherit';
                        dialogBottom = ($window.innerHeight - _.parseInt(place.y) - 1).toString() + 'px';
                    }else{
                        dialogBottom = 'inherit';
                        dialogTop = (_.parseInt(place.y) + placeY).toString() + 'px';

                    }
                }

                return {
                    top: dialogTop,
                    bottom: dialogBottom,
                    right: dialogRight,
                    left: dialogLeft,
                    width: dialogWidth,
                    height: dialogHeight,
                    className: className,
                };
            },

            setPositionDropdownDialog: function (position) {

                let dialogTop = position['top'];

                let dialogLeft = position['left'];

                let dialogRight = position['right'];

                let dialogBottom = position['bottom'];

                if (dialogTop != 0) {
                    document.documentElement.style.setProperty('--ng-dialog-custom-position-top', dialogTop);
                }

                if (dialogLeft != 0) {
                    document.documentElement.style.setProperty('--ng-dialog-custom-position-left', dialogLeft);
                }

                if (dialogRight != 0) {
                    document.documentElement.style.setProperty('--ng-dialog-custom-position-right', dialogRight);
                }

                if (dialogBottom != 0) {
                    document.documentElement.style.setProperty('--ng-dialog-custom-position-bottom', dialogBottom);
                }
            },

            isAlphabetic: function (s) {
                return s.match("^[a-zA-Z\(\)]+$");
            },
            addSlashes: function (str) {
                var a = {};
                a[str] = 1;
                return JSON.stringify(a).slice(2, -4);
            },
            pdfSizes: function () {
                return [
                    // ISO 216 A Series + 2 SIS 014711 extensions
                    {size: 'A0', x: 2383.937, y: 3370.394}, //= (  841 x 1189 ) mm  = ( 33.11 x 46.81 ) in
                    {size: 'A1', x: 1683.780, y: 2383.937}, //= (  594 x 841  ) mm  = ( 23.39 x 33.11 ) in
                    {size: 'A2', x: 1190.551, y: 1683.780}, //= (  420 x 594  ) mm  = ( 16.54 x 23.39 ) in
                    {size: 'A3', x: 841.890, y: 1190.551}, //= (  297 x 420  ) mm  = ( 11.69 x 16.54 ) in
                    {size: 'A4', x: 595.276, y: 841.890}, //= (  210 x 297  ) mm  = (  8.27 x 11.69 ) in
                    {size: 'A5', x: 419.528, y: 595.276}, //= (  148 x 210  ) mm  = (  5.83 x 8.27  ) in
                    {size: 'A6', x: 297.638, y: 419.528}, //= (  105 x 148  ) mm  = (  4.13 x 5.83  ) in
                    {size: 'A7', x: 209.764, y: 297.638}, //= (   74 x 105  ) mm  = (  2.91 x 4.13  ) in
                    {size: 'A8', x: 147.402, y: 209.764}, //= (   52 x 74   ) mm  = (  2.05 x 2.91  ) in
                    {size: 'A9', x: 104.882, y: 147.402}, //= (   37 x 52   ) mm  = (  1.46 x 2.05  ) in
                    {size: 'A10', x: 73.701, y: 104.882}, //= (   26 x 37   ) mm  = (  1.02 x 1.46  ) in
                    {size: 'A11', x: 51.024, y: 73.701}, //= (   18 x 26   ) mm  = (  0.71 x 1.02  ) in
                    {size: 'A12', x: 36.850, y: 51.024}, //= (   13 x 18   ) mm  = (  0.51 x 0.71  ) in
                    // ISO 216 B Series + 2 SIS 014711 extensions
                    {size: 'B0', x: 2834.646, y: 4008.189}, //= ( 1000 x 1414 ) mm  = ( 39.37 x 55.67 ) in
                    {size: 'B1', x: 2004.094, y: 2834.646}, //= (  707 x 1000 ) mm  = ( 27.83 x 39.37 ) in
                    {size: 'B2', x: 1417.323, y: 2004.094}, //= (  500 x 707  ) mm  = ( 19.69 x 27.83 ) in
                    {size: 'B3', x: 1000.630, y: 1417.323}, //= (  353 x 500  ) mm  = ( 13.90 x 19.69 ) in
                    {size: 'B4', x: 708.661, y: 1000.630}, //= (  250 x 353  ) mm  = (  9.84 x 13.90 ) in
                    {size: 'B5', x: 498.898, y: 708.661}, //= (  176 x 250  ) mm  = (  6.93 x 9.84  ) in
                    {size: 'B6', x: 354.331, y: 498.898}, //= (  125 x 176  ) mm  = (  4.92 x 6.93  ) in
                    {size: 'B7', x: 249.449, y: 354.331}, //= (   88 x 125  ) mm  = (  3.46 x 4.92  ) in
                    {size: 'B8', x: 175.748, y: 249.449}, //= (   62 x 88   ) mm  = (  2.44 x 3.46  ) in
                    {size: 'B9', x: 124.724, y: 175.748}, //= (   44 x 62   ) mm  = (  1.73 x 2.44  ) in
                    {size: 'B10', x: 87.874, y: 124.724}, //= (   31 x 44   ) mm  = (  1.22 x 1.73  ) in
                    {size: 'B11', x: 62.362, y: 87.874}, //= (   22 x 31   ) mm  = (  0.87 x 1.22  ) in
                    {size: 'B12', x: 42.520, y: 62.362}, //= (   15 x 22   ) mm  = (  0.59 x 0.87  ) in
                    // ISO 216 C Series + 2 SIS 014711 extensions + 5 EXTENSION
                    {size: 'C0', x: 2599.370, y: 3676.535}, //= (  917 x 1297 ) mm  = ( 36.10 x 51.06 ) in
                    {size: 'C1', x: 1836.850, y: 2599.370}, //= (  648 x 917  ) mm  = ( 25.51 x 36.10 ) in
                    {size: 'C2', x: 1298.268, y: 1836.850}, //= (  458 x 648  ) mm  = ( 18.03 x 25.51 ) in
                    {size: 'C3', x: 918.425, y: 1298.268}, //= (  324 x 458  ) mm  = ( 12.76 x 18.03 ) in
                    {size: 'C4', x: 649.134, y: 918.425}, //= (  229 x 324  ) mm  = (  9.02 x 12.76 ) in
                    {size: 'C5', x: 459.213, y: 649.134}, //= (  162 x 229  ) mm  = (  6.38 x 9.02  ) in
                    {size: 'C6', x: 323.150, y: 459.213}, //= (  114 x 162  ) mm  = (  4.49 x 6.38  ) in
                    {size: 'C7', x: 229.606, y: 323.150}, //= (   81 x 114  ) mm  = (  3.19 x 4.49  ) in
                    {size: 'C8', x: 161.575, y: 229.606}, //= (   57 x 81   ) mm  = (  2.24 x 3.19  ) in
                    {size: 'C9', x: 113.386, y: 161.575}, //= (   40 x 57   ) mm  = (  1.57 x 2.24  ) in
                    {size: 'C10', x: 79.370, y: 113.386}, //= (   28 x 40   ) mm  = (  1.10 x 1.57  ) in
                    {size: 'C11', x: 56.693, y: 79.370}, //= (   20 x 28   ) mm  = (  0.79 x 1.10  ) in
                    {size: 'C12', x: 39.685, y: 56.693}, //= (   14 x 20   ) mm  = (  0.55 x 0.79  ) in
                    {size: 'C76', x: 229.606, y: 459.213}, //= (   81 x 162  ) mm  = (  3.19 x 6.38  ) in
                    {size: 'DL', x: 311.811, y: 623.622}, //= (  110 x 220  ) mm  = (  4.33 x 8.66  ) in
                    {size: 'DLE', x: 323.150, y: 637.795}, //= (  114 x 225  ) mm  = (  4.49 x 8.86  ) in
                    {size: 'DLX', x: 340.158, y: 666.142}, //= (  120 x 235  ) mm  = (  4.72 x 9.25  ) in
                    {size: 'DLP', x: 280.630, y: 595.276}, //= (   99 x 210  ) mm  = (  3.90 x 8.27  ) in (1/3 A4)
                    // SIS 014711 E Series
                    {size: 'E0', x: 2491.654, y: 3517.795}, //= (  879 x 1241 ) mm  = ( 34.61 x 48.86 ) in
                    {size: 'E1', x: 1757.480, y: 2491.654}, //= (  620 x 879  ) mm  = ( 24.41 x 34.61 ) in
                    {size: 'E2', x: 1247.244, y: 1757.480}, //= (  440 x 620  ) mm  = ( 17.32 x 24.41 ) in
                    {size: 'E3', x: 878.740, y: 1247.244}, //= (  310 x 440  ) mm  = ( 12.20 x 17.32 ) in
                    {size: 'E4', x: 623.622, y: 878.740}, //= (  220 x 310  ) mm  = (  8.66 x 12.20 ) in
                    {size: 'E5', x: 439.370, y: 623.622}, //= (  155 x 220  ) mm  = (  6.10 x 8.66  ) in
                    {size: 'E6', x: 311.811, y: 439.370}, //= (  110 x 155  ) mm  = (  4.33 x 6.10  ) in
                    {size: 'E7', x: 221.102, y: 311.811}, //= (   78 x 110  ) mm  = (  3.07 x 4.33  ) in
                    {size: 'E8', x: 155.906, y: 221.102}, //= (   55 x 78   ) mm  = (  2.17 x 3.07  ) in
                    {size: 'E9', x: 110.551, y: 155.906}, //= (   39 x 55   ) mm  = (  1.54 x 2.17  ) in
                    {size: 'E10', x: 76.535, y: 110.551}, //= (   27 x 39   ) mm  = (  1.06 x 1.54  ) in
                    {size: 'E11', x: 53.858, y: 76.535}, //= (   19 x 27   ) mm  = (  0.75 x 1.06  ) in
                    {size: 'E12', x: 36.850, y: 53.858}, //= (   13 x 19   ) mm  = (  0.51 x 0.75  ) in
                    // SIS 014711 G Series
                    {size: 'G0', x: 2715.591, y: 3838.110}, //= (  958 x 1354 ) mm  = ( 37.72 x 53.31 ) in
                    {size: 'G1', x: 1919.055, y: 2715.591}, //= (  677 x 958  ) mm  = ( 26.65 x 37.72 ) in
                    {size: 'G2', x: 1357.795, y: 1919.055}, //= (  479 x 677  ) mm  = ( 18.86 x 26.65 ) in
                    {size: 'G3', x: 958.110, y: 1357.795}, //= (  338 x 479  ) mm  = ( 13.31 x 18.86 ) in
                    {size: 'G4', x: 677.480, y: 958.110}, //= (  239 x 338  ) mm  = (  9.41 x 13.31 ) in
                    {size: 'G5', x: 479.055, y: 677.480}, //= (  169 x 239  ) mm  = (  6.65 x 9.41  ) in
                    {size: 'G6', x: 337.323, y: 479.055}, //= (  119 x 169  ) mm  = (  4.69 x 6.65  ) in
                    {size: 'G7', x: 238.110, y: 337.323}, //= (   84 x 119  ) mm  = (  3.31 x 4.69  ) in
                    {size: 'G8', x: 167.244, y: 238.110}, //= (   59 x 84   ) mm  = (  2.32 x 3.31  ) in
                    {size: 'G9', x: 119.055, y: 167.244}, //= (   42 x 59   ) mm  = (  1.65 x 2.32  ) in
                    {size: 'G10', x: 82.205, y: 119.055}, //= (   29 x 42   ) mm  = (  1.14 x 1.65  ) in
                    {size: 'G11', x: 59.528, y: 82.205}, //= (   21 x 29   ) mm  = (  0.83 x 1.14  ) in
                    {size: 'G12', x: 39.685, y: 59.528}, //= (   14 x 21   ) mm  = (  0.55 x 0.83  ) in
                    // ISO Press
                    {size: 'RA0', x: 2437.795, y: 3458.268}, //= (  860 x 1220 ) mm  = ( 33.86 x 48.03 ) in
                    {size: 'RA1', x: 1729.134, y: 2437.795}, //= (  610 x 860  ) mm  = ( 24.02 x 33.86 ) in
                    {size: 'RA2', x: 1218.898, y: 1729.134}, //= (  430 x 610  ) mm  = ( 16.93 x 24.02 ) in
                    {size: 'RA3', x: 864.567, y: 1218.898}, //= (  305 x 430  ) mm  = ( 12.01 x 16.93 ) in
                    {size: 'RA4', x: 609.449, y: 864.567}, //= (  215 x 305  ) mm  = (  8.46 x 12.01 ) in
                    {size: 'SRA0', x: 2551.181, y: 3628.346}, //= (  900 x 1280 ) mm  = ( 35.43 x 50.39 ) in
                    {size: 'SRA1', x: 1814.173, y: 2551.181}, //= (  640 x 900  ) mm  = ( 25.20 x 35.43 ) in
                    {size: 'SRA2', x: 1275.591, y: 1814.173}, //= (  450 x 640  ) mm  = ( 17.72 x 25.20 ) in
                    {size: 'SRA3', x: 907.087, y: 1275.591}, //= (  320 x 450  ) mm  = ( 12.60 x 17.72 ) in
                    {size: 'SRA4', x: 637.795, y: 907.087}, //= (  225 x 320  ) mm  = (  8.86 x 12.60 ) in
                    // German DIN 476
                    {size: '4A0', x: 4767.874, y: 6740.787}, //= ( 1682 x 2378 ) mm  = ( 66.22 x 93.62 ) in
                    {size: '2A0', x: 3370.394, y: 4767.874}, //= ( 1189 x 1682 ) mm  = ( 46.81 x 66.22 ) in
                    // Variations on the ISO Standard
                    {size: 'A2_EXTRA', x: 1261.417, y: 1754.646}, //= (  445 x 619  ) mm  = ( 17.52 x 24.37 ) in
                    {size: 'A3+', x: 932.598, y: 1369.134}, //= (  329 x 483  ) mm  = ( 12.95 x 19.02 ) in
                    {size: 'A3_EXTRA', x: 912.756, y: 1261.417}, //= (  322 x 445  ) mm  = ( 12.68 x 17.52 ) in
                    {size: 'A3_SUPER', x: 864.567, y: 1440.000}, //= (  305 x 508  ) mm  = ( 12.01 x 20.00 ) in
                    {size: 'SUPER_A3', x: 864.567, y: 1380.472}, //= (  305 x 487  ) mm  = ( 12.01 x 19.17 ) in
                    {size: 'A4_EXTRA', x: 666.142, y: 912.756}, //= (  235 x 322  ) mm  = (  9.25 x 12.68 ) in
                    {size: 'A4_SUPER', x: 649.134, y: 912.756}, //= (  229 x 322  ) mm  = (  9.02 x 12.68 ) in
                    {size: 'SUPER_A4', x: 643.465, y: 1009.134}, //= (  227 x 356  ) mm  = (  8.94 x 14.02 ) in
                    {size: 'A4_LONG', x: 595.276, y: 986.457}, //= (  210 x 348  ) mm  = (  8.27 x 13.70 ) in
                    {size: 'F4', x: 595.276, y: 935.433}, //= (  210 x 330  ) mm  = (  8.27 x 12.99 ) in
                    {size: 'SO_B5_EXTRA', x: 572.598, y: 782.362}, //= (  202 x 276  ) mm  = (  7.95 x 10.87 ) in
                    {size: 'A5_EXTRA', x: 490.394, y: 666.142}, //= (  173 x 235  ) mm  = (  6.81 x 9.25  ) in
                    // ANSI Series
                    {size: 'ANSI_E', x: 2448.000, y: 3168.000}, //= (  864 x 1118 ) mm  = ( 34.00 x 44.00 ) in
                    {size: 'ANSI_D', x: 1584.000, y: 2448.000}, //= (  559 x 864  ) mm  = ( 22.00 x 34.00 ) in
                    {size: 'ANSI_C', x: 1224.000, y: 1584.000}, //= (  432 x 559  ) mm  = ( 17.00 x 22.00 ) in
                    {size: 'ANSI_B', x: 792.000, y: 1224.000}, //= (  279 x 432  ) mm  = ( 11.00 x 17.00 ) in
                    {size: 'ANSI_A', x: 612.000, y: 792.000}, //= (  216 x 279  ) mm  = (  8.50 x 11.00 ) in
                    // Traditional 'Loose' North American Paper Sizes
                    {size: 'USLEDGER', x: 1224.000, y: 792.000}, //= (  432 x 279  ) mm  = ( 17.00 x 11.00 ) in
                    {size: 'LEDGER', x: 1224.000, y: 792.000}, //= (  432 x 279  ) mm  = ( 17.00 x 11.00 ) in
                    {size: 'ORGANIZERK', x: 792.000, y: 1224.000}, //= (  279 x 432  ) mm  = ( 11.00 x 17.00 ) in
                    {size: 'BIBLE', x: 792.000, y: 1224.000}, //= (  279 x 432  ) mm  = ( 11.00 x 17.00 ) in
                    {size: 'USTABLOID', x: 792.000, y: 1224.000}, //= (  279 x 432  ) mm  = ( 11.00 x 17.00 ) in
                    {size: 'TABLOID', x: 792.000, y: 1224.000}, //= (  279 x 432  ) mm  = ( 11.00 x 17.00 ) in
                    {size: 'ORGANIZERM', x: 612.000, y: 792.000}, //= (  216 x 279  ) mm  = (  8.50 x 11.00 ) in
                    {size: 'USLETTER', x: 612.000, y: 792.000}, //= (  216 x 279  ) mm  = (  8.50 x 11.00 ) in
                    {size: 'LETTER', x: 612.000, y: 792.000}, //= (  216 x 279  ) mm  = (  8.50 x 11.00 ) in
                    {size: 'USLEGAL', x: 612.000, y: 1008.000}, //= (  216 x 356  ) mm  = (  8.50 x 14.00 ) in
                    {size: 'LEGAL', x: 612.000, y: 1008.000}, //= (  216 x 356  ) mm  = (  8.50 x 14.00 ) in
                    {size: 'GOVERNMENTLETTER', x: 576.000, y: 756.000}, //= (  203 x 267  ) mm  = (  8.00 x 10.50 ) in
                    {size: 'GLETTER', x: 576.000, y: 756.000}, //= (  203 x 267  ) mm  = (  8.00 x 10.50 ) in
                    {size: 'JUNIORLEGAL', x: 576.000, y: 360.000}, //= (  203 x 127  ) mm  = (  8.00 x 5.00  ) in
                    {size: 'JLEGAL', x: 576.000, y: 360.000}, //= (  203 x 127  ) mm  = (  8.00 x 5.00  ) in
                    // Other North American Paper Sizes
                    {size: 'QUADDEMY', x: 2520.000, y: 3240.000}, //= (  889 x 1143 ) mm  = ( 35.00 x 45.00 ) in
                    {size: 'SUPER_B', x: 936.000, y: 1368.000}, //= (  330 x 483  ) mm  = ( 13.00 x 19.00 ) in
                    {size: 'QUARTO', x: 648.000, y: 792.000}, //= (  229 x 279  ) mm  = (  9.00 x 11.00 ) in
                    {size: 'GOVERNMENTLEGAL', x: 612.000, y: 936.000}, //= (  216 x 330  ) mm  = (  8.50 x 13.00 ) in
                    {size: 'FOLIO', x: 612.000, y: 936.000}, //= (  216 x 330  ) mm  = (  8.50 x 13.00 ) in
                    {size: 'MONARCH', x: 522.000, y: 756.000}, //= (  184 x 267  ) mm  = (  7.25 x 10.50 ) in
                    {size: 'EXECUTIVE', x: 522.000, y: 756.000}, //= (  184 x 267  ) mm  = (  7.25 x 10.50 ) in
                    {size: 'ORGANIZERL', x: 396.000, y: 612.000}, //= (  140 x 216  ) mm  = (  5.50 x 8.50  ) in
                    {size: 'STATEMENT', x: 396.000, y: 612.000}, //= (  140 x 216  ) mm  = (  5.50 x 8.50  ) in
                    {size: 'MEMO', x: 396.000, y: 612.000}, //= (  140 x 216  ) mm  = (  5.50 x 8.50  ) in
                    {size: 'FOOLSCAP', x: 595.440, y: 936.000}, //= (  210 x 330  ) mm  = (  8.27 x 13.00 ) in
                    {size: 'COMPACT', x: 306.000, y: 486.000}, //= (  108 x 171  ) mm  = (  4.25 x 6.75  ) in
                    {size: 'ORGANIZERJ', x: 198.000, y: 360.000}, //= (   70 x 127  ) mm  = (  2.75 x 5.00  ) in
                    // Canadian standard CAN 2-9.60M
                    {size: 'P1', x: 1587.402, y: 2437.795}, //= (  560 x 860  ) mm  = ( 22.05 x 33.86 ) in
                    {size: 'P2', x: 1218.898, y: 1587.402}, //= (  430 x 560  ) mm  = ( 16.93 x 22.05 ) in
                    {size: 'P3', x: 793.701, y: 1218.898}, //= (  280 x 430  ) mm  = ( 11.02 x 16.93 ) in
                    {size: 'P4', x: 609.449, y: 793.701}, //= (  215 x 280  ) mm  = (  8.46 x 11.02 ) in
                    {size: 'P5', x: 396.850, y: 609.449}, //= (  140 x 215  ) mm  = (  5.51 x 8.46  ) in
                    {size: 'P6', x: 303.307, y: 396.850}, //= (  107 x 140  ) mm  = (  4.21 x 5.51  ) in
                    // North American Architectural Sizes
                    {size: 'ARCH_E', x: 2592.000, y: 3456.000}, //= (  914 x 1219 ) mm  = ( 36.00 x 48.00 ) in
                    {size: 'ARCH_E1', x: 2160.000, y: 3024.000}, //= (  762 x 1067 ) mm  = ( 30.00 x 42.00 ) in
                    {size: 'ARCH_D', x: 1728.000, y: 2592.000}, //= (  610 x 914  ) mm  = ( 24.00 x 36.00 ) in
                    {size: 'BROADSHEET', x: 1296.000, y: 1728.000}, //= (  457 x 610  ) mm  = ( 18.00 x 24.00 ) in
                    {size: 'ARCH_C', x: 1296.000, y: 1728.000}, //= (  457 x 610  ) mm  = ( 18.00 x 24.00 ) in
                    {size: 'ARCH_B', x: 864.000, y: 1296.000}, //= (  305 x 457  ) mm  = ( 12.00 x 18.00 ) in
                    {size: 'ARCH_A', x: 648.000, y: 864.000}, //= (  229 x 305  ) mm  = (  9.00 x 12.00 ) in
                    // -- North American Envelope Sizes
                    // - Announcement Envelopes
                    {size: 'ANNENV_A2', x: 314.640, y: 414.000}, //= (  111 x 146  ) mm  = (  4.37 x 5.75  ) in
                    {size: 'ANNENV_A6', x: 342.000, y: 468.000}, //= (  121 x 165  ) mm  = (  4.75 x 6.50  ) in
                    {size: 'ANNENV_A7', x: 378.000, y: 522.000}, //= (  133 x 184  ) mm  = (  5.25 x 7.25  ) in
                    {size: 'ANNENV_A8', x: 396.000, y: 584.640}, //= (  140 x 206  ) mm  = (  5.50 x 8.12  ) in
                    {size: 'ANNENV_A10', x: 450.000, y: 692.640}, //= (  159 x 244  ) mm  = (  6.25 x 9.62  ) in
                    {size: 'ANNENV_SLIM', x: 278.640, y: 638.640}, //= (   98 x 225  ) mm  = (  3.87 x 8.87  ) in
                    // - Commercial Envelopes
                    {size: 'COMMENV_N6_1/4', x: 252.000, y: 432.000}, //= (   89 x 152  ) mm  = (  3.50 x 6.00  ) in
                    {size: 'COMMENV_N6_3/4', x: 260.640, y: 468.000}, //= (   92 x 165  ) mm  = (  3.62 x 6.50  ) in
                    {size: 'COMMENV_N8', x: 278.640, y: 540.000}, //= (   98 x 191  ) mm  = (  3.87 x 7.50  ) in
                    {size: 'COMMENV_N9', x: 278.640, y: 638.640}, //= (   98 x 225  ) mm  = (  3.87 x 8.87  ) in
                    {size: 'COMMENV_N10', x: 296.640, y: 684.000}, //= (  105 x 241  ) mm  = (  4.12 x 9.50  ) in
                    {size: 'COMMENV_N11', x: 324.000, y: 746.640}, //= (  114 x 263  ) mm  = (  4.50 x 10.37 ) in
                    {size: 'COMMENV_N12', x: 342.000, y: 792.000}, //= (  121 x 279  ) mm  = (  4.75 x 11.00 ) in
                    {size: 'COMMENV_N14', x: 360.000, y: 828.000}, //= (  127 x 292  ) mm  = (  5.00 x 11.50 ) in
                    // - Catalogue Envelopes
                    {size: 'CATENV_N1', x: 432.000, y: 648.000}, //= (  152 x 229  ) mm  = (  6.00 x 9.00  ) in
                    {size: 'CATENV_N1_3/4', x: 468.000, y: 684.000}, //= (  165 x 241  ) mm  = (  6.50 x 9.50  ) in
                    {size: 'CATENV_N2', x: 468.000, y: 720.000}, //= (  165 x 254  ) mm  = (  6.50 x 10.00 ) in
                    {size: 'CATENV_N3', x: 504.000, y: 720.000}, //= (  178 x 254  ) mm  = (  7.00 x 10.00 ) in
                    {size: 'CATENV_N6', x: 540.000, y: 756.000}, //= (  191 x 267  ) mm  = (  7.50 x 10.50 ) in
                    {size: 'CATENV_N7', x: 576.000, y: 792.000}, //= (  203 x 279  ) mm  = (  8.00 x 11.00 ) in
                    {size: 'CATENV_N8', x: 594.000, y: 810.000}, //= (  210 x 286  ) mm  = (  8.25 x 11.25 ) in
                    {size: 'CATENV_N9_1/2', x: 612.000, y: 756.000}, //= (  216 x 267  ) mm  = (  8.50 x 10.50 ) in
                    {size: 'CATENV_N9_3/4', x: 630.000, y: 810.000}, //= (  222 x 286  ) mm  = (  8.75 x 11.25 ) in
                    {size: 'CATENV_N10_1/2', x: 648.000, y: 864.000}, //= (  229 x 305  ) mm  = (  9.00 x 12.00 ) in
                    {size: 'CATENV_N12_1/2', x: 684.000, y: 900.000}, //= (  241 x 318  ) mm  = (  9.50 x 12.50 ) in
                    {size: 'CATENV_N13_1/2', x: 720.000, y: 936.000}, //= (  254 x 330  ) mm  = ( 10.00 x 13.00 ) in
                    {size: 'CATENV_N14_1/4', x: 810.000, y: 882.000}, //= (  286 x 311  ) mm  = ( 11.25 x 12.25 ) in
                    {size: 'CATENV_N14_1/2', x: 828.000, y: 1044.000}, //= (  292 x 368  ) mm  = ( 11.50 x 14.50 ) in
                    // Japanese (JIS P 0138-61) Standard B-Series
                    {size: 'JIS_B0', x: 2919.685, y: 4127.244}, //= ( 1030 x 1456 ) mm  = ( 40.55 x 57.32 ) in
                    {size: 'JIS_B1', x: 2063.622, y: 2919.685}, //= (  728 x 1030 ) mm  = ( 28.66 x 40.55 ) in
                    {size: 'JIS_B2', x: 1459.843, y: 2063.622}, //= (  515 x 728  ) mm  = ( 20.28 x 28.66 ) in
                    {size: 'JIS_B3', x: 1031.811, y: 1459.843}, //= (  364 x 515  ) mm  = ( 14.33 x 20.28 ) in
                    {size: 'JIS_B4', x: 728.504, y: 1031.811}, //= (  257 x 364  ) mm  = ( 10.12 x 14.33 ) in
                    {size: 'JIS_B5', x: 515.906, y: 728.504}, //= (  182 x 257  ) mm  = (  7.17 x 10.12 ) in
                    {size: 'JIS_B6', x: 362.835, y: 515.906}, //= (  128 x 182  ) mm  = (  5.04 x 7.17  ) in
                    {size: 'JIS_B7', x: 257.953, y: 362.835}, //= (   91 x 128  ) mm  = (  3.58 x 5.04  ) in
                    {size: 'JIS_B8', x: 181.417, y: 257.953}, //= (   64 x 91   ) mm  = (  2.52 x 3.58  ) in
                    {size: 'JIS_B9', x: 127.559, y: 181.417}, //= (   45 x 64   ) mm  = (  1.77 x 2.52  ) in
                    {size: 'JIS_B10', x: 90.709, y: 127.559}, //= (   32 x 45   ) mm  = (  1.26 x 1.77  ) in
                    {size: 'JIS_B11', x: 62.362, y: 90.709}, //= (   22 x 32   ) mm  = (  0.87 x 1.26  ) in
                    {size: 'JIS_B12', x: 45.354, y: 62.362}, //= (   16 x 22   ) mm  = (  0.63 x 0.87  ) in
                    // PA Series
                    {size: 'PA0', x: 2381.102, y: 3174.803}, //= (  840 x 1120 ) mm  = ( 33.07 x 44.09 ) in
                    {size: 'PA1', x: 1587.402, y: 2381.102}, //= (  560 x 840  ) mm  = ( 22.05 x 33.07 ) in
                    {size: 'PA2', x: 1190.551, y: 1587.402}, //= (  420 x 560  ) mm  = ( 16.54 x 22.05 ) in
                    {size: 'PA3', x: 793.701, y: 1190.551}, //= (  280 x 420  ) mm  = ( 11.02 x 16.54 ) in
                    {size: 'PA4', x: 595.276, y: 793.701}, //= (  210 x 280  ) mm  = (  8.27 x 11.02 ) in
                    {size: 'PA5', x: 396.850, y: 595.276}, //= (  140 x 210  ) mm  = (  5.51 x 8.27  ) in
                    {size: 'PA6', x: 297.638, y: 396.850}, //= (  105 x 140  ) mm  = (  4.13 x 5.51  ) in
                    {size: 'PA7', x: 198.425, y: 297.638}, //= (   70 x 105  ) mm  = (  2.76 x 4.13  ) in
                    {size: 'PA8', x: 147.402, y: 198.425}, //= (   52 x 70   ) mm  = (  2.05 x 2.76  ) in
                    {size: 'PA9', x: 99.213, y: 147.402}, //= (   35 x 52   ) mm  = (  1.38 x 2.05  ) in
                    {size: 'PA10', x: 73.701, y: 99.213}, //= (   26 x 35   ) mm  = (  1.02 x 1.38  ) in
                    // Standard Photographic Print Sizes
                    {size: 'PASSPORT_PHOTO', x: 99.213, y: 127.559}, //= (   35 x 45   ) mm  = (  1.38 x 1.77  ) in
                    {size: 'E', x: 233.858, y: 340.157}, //= (   82 x 120  ) mm  = (  3.25 x 4.72  ) in
                    {size: 'L', x: 252.283, y: 360.000}, //= (   89 x 127  ) mm  = (  3.50 x 5.00  ) in
                    {size: '3R', x: 252.283, y: 360.000}, //= (   89 x 127  ) mm  = (  3.50 x 5.00  ) in
                    {size: 'KG', x: 289.134, y: 430.866}, //= (  102 x 152  ) mm  = (  4.02 x 5.98  ) in
                    {size: '4R', x: 289.134, y: 430.866}, //= (  102 x 152  ) mm  = (  4.02 x 5.98  ) in
                    {size: '4D', x: 340.157, y: 430.866}, //= (  120 x 152  ) mm  = (  4.72 x 5.98  ) in
                    {size: '2L', x: 360.000, y: 504.567}, //= (  127 x 178  ) mm  = (  5.00 x 7.01  ) in
                    {size: '5R', x: 360.000, y: 504.567}, //= (  127 x 178  ) mm  = (  5.00 x 7.01  ) in
                    {size: '8P', x: 430.866, y: 575.433}, //= (  152 x 203  ) mm  = (  5.98 x 7.99  ) in
                    {size: '6R', x: 430.866, y: 575.433}, //= (  152 x 203  ) mm  = (  5.98 x 7.99  ) in
                    {size: '6P', x: 575.433, y: 720.000}, //= (  203 x 254  ) mm  = (  7.99 x 10.00 ) in
                    {size: '8R', x: 575.433, y: 720.000}, //= (  203 x 254  ) mm  = (  7.99 x 10.00 ) in
                    {size: '6PW', x: 575.433, y: 864.567}, //= (  203 x 305  ) mm  = (  7.99 x 12.01 ) in
                    {size: 'S8R', x: 575.433, y: 864.567}, //= (  203 x 305  ) mm  = (  7.99 x 12.01 ) in
                    {size: '4P', x: 720.000, y: 864.567}, //= (  254 x 305  ) mm  = ( 10.00 x 12.01 ) in
                    {size: '10R', x: 720.000, y: 864.567}, //= (  254 x 305  ) mm  = ( 10.00 x 12.01 ) in
                    {size: '4PW', x: 720.000, y: 1080.000}, //= (  254 x 381  ) mm  = ( 10.00 x 15.00 ) in
                    {size: 'S10R', x: 720.000, y: 1080.000}, //= (  254 x 381  ) mm  = ( 10.00 x 15.00 ) in
                    {size: '11R', x: 790.866, y: 1009.134}, //= (  279 x 356  ) mm  = ( 10.98 x 14.02 ) in
                    {size: 'S11R', x: 790.866, y: 1224.567}, //= (  279 x 432  ) mm  = ( 10.98 x 17.01 ) in
                    {size: '12R', x: 864.567, y: 1080.000}, //= (  305 x 381  ) mm  = ( 12.01 x 15.00 ) in
                    {size: 'S12R', x: 864.567, y: 1292.598}, //= (  305 x 456  ) mm  = ( 12.01 x 17.95 ) in
                    // Common Newspaper Sizes
                    {size: 'NEWSPAPER_BROADSHEET', x: 2125.984, y: 1700.787}, //= (  750 x 600  ) mm  = ( 29.53 x 23.62 ) in
                    {size: 'NEWSPAPER_BERLINER', x: 1332.283, y: 892.913}, //= (  470 x 315  ) mm  = ( 18.50 x 12.40 ) in
                    {size: 'NEWSPAPER_TABLOID', x: 1218.898, y: 793.701}, //= (  430 x 280  ) mm  = ( 16.93 x 11.02 ) in
                    {size: 'NEWSPAPER_COMPACT', x: 1218.898, y: 793.701}, //= (  430 x 280  ) mm  = ( 16.93 x 11.02 ) in
                    // Business Cards
                    {size: 'CREDIT_CARD', x: 153.014, y: 242.646}, //= (   54 x 86   ) mm  = (  2.13 x 3.37  ) in
                    {size: 'BUSINESS_CARD', x: 153.014, y: 242.646}, //= (   54 x 86   ) mm  = (  2.13 x 3.37  ) in
                    {size: 'BUSINESS_CARD_ISO7810', x: 153.014, y: 242.646}, //= (   54 x 86   ) mm  = (  2.13 x 3.37  ) in
                    {size: 'BUSINESS_CARD_ISO216', x: 147.402, y: 209.764}, //= (   52 x 74   ) mm  = (  2.05 x 2.91  ) in
                    {size: 'BUSINESS_CARD_IT', x: 155.906, y: 240.945}, //= (   55 x 85   ) mm  = (  2.17 x 3.35  ) in
                    {size: 'BUSINESS_CARD_UK', x: 155.906, y: 240.945}, //= (   55 x 85   ) mm  = (  2.17 x 3.35  ) in
                    {size: 'BUSINESS_CARD_FR', x: 155.906, y: 240.945}, //= (   55 x 85   ) mm  = (  2.17 x 3.35  ) in
                    {size: 'BUSINESS_CARD_DE', x: 155.906, y: 240.945}, //= (   55 x 85   ) mm  = (  2.17 x 3.35  ) in
                    {size: 'BUSINESS_CARD_ES', x: 155.906, y: 240.945}, //= (   55 x 85   ) mm  = (  2.17 x 3.35  ) in
                    {size: 'BUSINESS_CARD_CA', x: 144.567, y: 252.283}, //= (   51 x 89   ) mm  = (  2.01 x 3.50  ) in
                    {size: 'BUSINESS_CARD_US', x: 144.567, y: 252.283}, //= (   51 x 89   ) mm  = (  2.01 x 3.50  ) in
                    {size: 'BUSINESS_CARD_JP', x: 155.906, y: 257.953}, //= (   55 x 91   ) mm  = (  2.17 x 3.58  ) in
                    {size: 'BUSINESS_CARD_HK', x: 153.071, y: 255.118}, //= (   54 x 90   ) mm  = (  2.13 x 3.54  ) in
                    {size: 'BUSINESS_CARD_AU', x: 155.906, y: 255.118}, //= (   55 x 90   ) mm  = (  2.17 x 3.54  ) in
                    {size: 'BUSINESS_CARD_DK', x: 155.906, y: 255.118}, //= (   55 x 90   ) mm  = (  2.17 x 3.54  ) in
                    {size: 'BUSINESS_CARD_SE', x: 155.906, y: 255.118}, //= (   55 x 90   ) mm  = (  2.17 x 3.54  ) in
                    {size: 'BUSINESS_CARD_RU', x: 141.732, y: 255.118}, //= (   50 x 90   ) mm  = (  1.97 x 3.54  ) in
                    {size: 'BUSINESS_CARD_CZ', x: 141.732, y: 255.118}, //= (   50 x 90   ) mm  = (  1.97 x 3.54  ) in
                    {size: 'BUSINESS_CARD_FI', x: 141.732, y: 255.118}, //= (   50 x 90   ) mm  = (  1.97 x 3.54  ) in
                    {size: 'BUSINESS_CARD_HU', x: 141.732, y: 255.118}, //= (   50 x 90   ) mm  = (  1.97 x 3.54  ) in
                    {size: 'BUSINESS_CARD_IL', x: 141.732, y: 255.118}, //= (   50 x 90   ) mm  = (  1.97 x 3.54  ) in
                    // Billboards
                    {size: '4SHEET', x: 2880.000, y: 4320.000}, //= ( 1016 x 1524 ) mm  = ( 40.00 x 60.00 ) in
                    {size: '6SHEET', x: 3401.575, y: 5102.362}, //= ( 1200 x 1800 ) mm  = ( 47.24 x 70.87 ) in
                    {size: '12SHEET', x: 8640.000, y: 4320.000}, //= ( 3048 x 1524 ) mm  = (120.00 x 60.00 ) in
                    {size: '16SHEET', x: 5760.000, y: 8640.000}, //= ( 2032 x 3048 ) mm  = ( 80.00 x 120.00) in
                    {size: '32SHEET', x: 11520.000, y: 8640.000}, //= ( 4064 x 3048 ) mm  = (160.00 x 120.00) in
                    {size: '48SHEET', x: 17280.000, y: 8640.000}, //= ( 6096 x 3048 ) mm  = (240.00 x 120.00) in
                    {size: '64SHEET', x: 23040.000, y: 8640.000}, //= ( 8128 x 3048 ) mm  = (320.00 x 120.00) in
                    {size: '96SHEET', x: 34560.000, y: 8640.000}, //= (12192 x 3048 ) mm  = (480.00 x 120.00) in
                    // -- Old European Sizes
                    // - Old Imperial English Sizes
                    {size: 'EN_EMPEROR', x: 3456.000, y: 5184.000}, //= ( 1219 x 1829 ) mm  = ( 48.00 x 72.00 ) in
                    {size: 'EN_ANTIQUARIAN', x: 2232.000, y: 3816.000}, //= (  787 x 1346 ) mm  = ( 31.00 x 53.00 ) in
                    {size: 'EN_GRAND_EAGLE', x: 2070.000, y: 3024.000}, //= (  730 x 1067 ) mm  = ( 28.75 x 42.00 ) in
                    {size: 'EN_DOUBLE_ELEPHANT', x: 1926.000, y: 2880.000}, //= (  679 x 1016 ) mm  = ( 26.75 x 40.00 ) in
                    {size: 'EN_ATLAS', x: 1872.000, y: 2448.000}, //= (  660 x 864  ) mm  = ( 26.00 x 34.00 ) in
                    {size: 'EN_COLOMBIER', x: 1692.000, y: 2484.000}, //= (  597 x 876  ) mm  = ( 23.50 x 34.50 ) in
                    {size: 'EN_ELEPHANT', x: 1656.000, y: 2016.000}, //= (  584 x 711  ) mm  = ( 23.00 x 28.00 ) in
                    {size: 'EN_DOUBLE_DEMY', x: 1620.000, y: 2556.000}, //= (  572 x 902  ) mm  = ( 22.50 x 35.50 ) in
                    {size: 'EN_IMPERIAL', x: 1584.000, y: 2160.000}, //= (  559 x 762  ) mm  = ( 22.00 x 30.00 ) in
                    {size: 'EN_PRINCESS', x: 1548.000, y: 2016.000}, //= (  546 x 711  ) mm  = ( 21.50 x 28.00 ) in
                    {size: 'EN_CARTRIDGE', x: 1512.000, y: 1872.000}, //= (  533 x 660  ) mm  = ( 21.00 x 26.00 ) in
                    {size: 'EN_DOUBLE_LARGE_POST', x: 1512.000, y: 2376.000}, //= (  533 x 838  ) mm  = ( 21.00 x 33.00 ) in
                    {size: 'EN_ROYAL', x: 1440.000, y: 1800.000}, //= (  508 x 635  ) mm  = ( 20.00 x 25.00 ) in
                    {size: 'EN_SHEET', x: 1404.000, y: 1692.000}, //= (  495 x 597  ) mm  = ( 19.50 x 23.50 ) in
                    {size: 'EN_HALF_POST', x: 1404.000, y: 1692.000}, //= (  495 x 597  ) mm  = ( 19.50 x 23.50 ) in
                    {size: 'EN_SUPER_ROYAL', x: 1368.000, y: 1944.000}, //= (  483 x 686  ) mm  = ( 19.00 x 27.00 ) in
                    {size: 'EN_DOUBLE_POST', x: 1368.000, y: 2196.000}, //= (  483 x 775  ) mm  = ( 19.00 x 30.50 ) in
                    {size: 'EN_MEDIUM', x: 1260.000, y: 1656.000}, //= (  445 x 584  ) mm  = ( 17.50 x 23.00 ) in
                    {size: 'EN_DEMY', x: 1260.000, y: 1620.000}, //= (  445 x 572  ) mm  = ( 17.50 x 22.50 ) in
                    {size: 'EN_LARGE_POST', x: 1188.000, y: 1512.000}, //= (  419 x 533  ) mm  = ( 16.50 x 21.00 ) in
                    {size: 'EN_COPY_DRAUGHT', x: 1152.000, y: 1440.000}, //= (  406 x 508  ) mm  = ( 16.00 x 20.00 ) in
                    {size: 'EN_POST', x: 1116.000, y: 1386.000}, //= (  394 x 489  ) mm  = ( 15.50 x 19.25 ) in
                    {size: 'EN_CROWN', x: 1080.000, y: 1440.000}, //= (  381 x 508  ) mm  = ( 15.00 x 20.00 ) in
                    {size: 'EN_PINCHED_POST', x: 1062.000, y: 1332.000}, //= (  375 x 470  ) mm  = ( 14.75 x 18.50 ) in
                    {size: 'EN_BRIEF', x: 972.000, y: 1152.000}, //= (  343 x 406  ) mm  = ( 13.50 x 16.00 ) in
                    {size: 'EN_FOOLSCAP', x: 972.000, y: 1224.000}, //= (  343 x 432  ) mm  = ( 13.50 x 17.00 ) in
                    {size: 'EN_SMALL_FOOLSCAP', x: 954.000, y: 1188.000}, //= (  337 x 419  ) mm  = ( 13.25 x 16.50 ) in
                    {size: 'EN_POTT', x: 900.000, y: 1080.000}, //= (  318 x 381  ) mm  = ( 12.50 x 15.00 ) in
                    // - Old Imperial Belgian Sizes
                    {size: 'BE_GRAND_AIGLE', x: 1984.252, y: 2948.031}, //= (  700 x 1040 ) mm  = ( 27.56 x 40.94 ) in
                    {size: 'BE_COLOMBIER', x: 1757.480, y: 2409.449}, //= (  620 x 850  ) mm  = ( 24.41 x 33.46 ) in
                    {size: 'BE_DOUBLE_CARRE', x: 1757.480, y: 2607.874}, //= (  620 x 920  ) mm  = ( 24.41 x 36.22 ) in
                    {size: 'BE_ELEPHANT', x: 1746.142, y: 2182.677}, //= (  616 x 770  ) mm  = ( 24.25 x 30.31 ) in
                    {size: 'BE_PETIT_AIGLE', x: 1700.787, y: 2381.102}, //= (  600 x 840  ) mm  = ( 23.62 x 33.07 ) in
                    {size: 'BE_GRAND_JESUS', x: 1559.055, y: 2069.291}, //= (  550 x 730  ) mm  = ( 21.65 x 28.74 ) in
                    {size: 'BE_JESUS', x: 1530.709, y: 2069.291}, //= (  540 x 730  ) mm  = ( 21.26 x 28.74 ) in
                    {size: 'BE_RAISIN', x: 1417.323, y: 1842.520}, //= (  500 x 650  ) mm  = ( 19.69 x 25.59 ) in
                    {size: 'BE_GRAND_MEDIAN', x: 1303.937, y: 1714.961}, //= (  460 x 605  ) mm  = ( 18.11 x 23.82 ) in
                    {size: 'BE_DOUBLE_POSTE', x: 1233.071, y: 1601.575}, //= (  435 x 565  ) mm  = ( 17.13 x 22.24 ) in
                    {size: 'BE_COQUILLE', x: 1218.898, y: 1587.402}, //= (  430 x 560  ) mm  = ( 16.93 x 22.05 ) in
                    {size: 'BE_PETIT_MEDIAN', x: 1176.378, y: 1502.362}, //= (  415 x 530  ) mm  = ( 16.34 x 20.87 ) in
                    {size: 'BE_RUCHE', x: 1020.472, y: 1303.937}, //= (  360 x 460  ) mm  = ( 14.17 x 18.11 ) in
                    {size: 'BE_PROPATRIA', x: 977.953, y: 1218.898}, //= (  345 x 430  ) mm  = ( 13.58 x 16.93 ) in
                    {size: 'BE_LYS', x: 898.583, y: 1125.354}, //= (  317 x 397  ) mm  = ( 12.48 x 15.63 ) in
                    {size: 'BE_POT', x: 870.236, y: 1088.504}, //= (  307 x 384  ) mm  = ( 12.09 x 15.12 ) in
                    {size: 'BE_ROSETTE', x: 765.354, y: 983.622}, //= (  270 x 347  ) mm  = ( 10.63 x 13.66 ) in
                    // - Old Imperial French Sizes
                    {size: 'FR_UNIVERS', x: 2834.646, y: 3685.039}, //= ( 1000 x 1300 ) mm  = ( 39.37 x 51.18 ) in
                    {size: 'FR_DOUBLE_COLOMBIER', x: 2551.181, y: 3571.654}, //= (  900 x 1260 ) mm  = ( 35.43 x 49.61 ) in
                    {size: 'FR_GRANDE_MONDE', x: 2551.181, y: 3571.654}, //= (  900 x 1260 ) mm  = ( 35.43 x 49.61 ) in
                    {size: 'FR_DOUBLE_SOLEIL', x: 2267.717, y: 3401.575}, //= (  800 x 1200 ) mm  = ( 31.50 x 47.24 ) in
                    {size: 'FR_DOUBLE_JESUS', x: 2154.331, y: 3174.803}, //= (  760 x 1120 ) mm  = ( 29.92 x 44.09 ) in
                    {size: 'FR_GRAND_AIGLE', x: 2125.984, y: 3004.724}, //= (  750 x 1060 ) mm  = ( 29.53 x 41.73 ) in
                    {size: 'FR_PETIT_AIGLE', x: 1984.252, y: 2664.567}, //= (  700 x 940  ) mm  = ( 27.56 x 37.01 ) in
                    {size: 'FR_DOUBLE_RAISIN', x: 1842.520, y: 2834.646}, //= (  650 x 1000 ) mm  = ( 25.59 x 39.37 ) in
                    {size: 'FR_JOURNAL', x: 1842.520, y: 2664.567}, //= (  650 x 940  ) mm  = ( 25.59 x 37.01 ) in
                    {size: 'FR_COLOMBIER_AFFICHE', x: 1785.827, y: 2551.181}, //= (  630 x 900  ) mm  = ( 24.80 x 35.43 ) in
                    {size: 'FR_DOUBLE_CAVALIER', x: 1757.480, y: 2607.874}, //= (  620 x 920  ) mm  = ( 24.41 x 36.22 ) in
                    {size: 'FR_CLOCHE', x: 1700.787, y: 2267.717}, //= (  600 x 800  ) mm  = ( 23.62 x 31.50 ) in
                    {size: 'FR_SOLEIL', x: 1700.787, y: 2267.717}, //= (  600 x 800  ) mm  = ( 23.62 x 31.50 ) in
                    {size: 'FR_DOUBLE_CARRE', x: 1587.402, y: 2551.181}, //= (  560 x 900  ) mm  = ( 22.05 x 35.43 ) in
                    {size: 'FR_DOUBLE_COQUILLE', x: 1587.402, y: 2494.488}, //= (  560 x 880  ) mm  = ( 22.05 x 34.65 ) in
                    {size: 'FR_JESUS', x: 1587.402, y: 2154.331}, //= (  560 x 760  ) mm  = ( 22.05 x 29.92 ) in
                    {size: 'FR_RAISIN', x: 1417.323, y: 1842.520}, //= (  500 x 650  ) mm  = ( 19.69 x 25.59 ) in
                    {size: 'FR_CAVALIER', x: 1303.937, y: 1757.480}, //= (  460 x 620  ) mm  = ( 18.11 x 24.41 ) in
                    {size: 'FR_DOUBLE_COURONNE', x: 1303.937, y: 2040.945}, //= (  460 x 720  ) mm  = ( 18.11 x 28.35 ) in
                    {size: 'FR_CARRE', x: 1275.591, y: 1587.402}, //= (  450 x 560  ) mm  = ( 17.72 x 22.05 ) in
                    {size: 'FR_COQUILLE', x: 1247.244, y: 1587.402}, //= (  440 x 560  ) mm  = ( 17.32 x 22.05 ) in
                    {size: 'FR_DOUBLE_TELLIERE', x: 1247.244, y: 1927.559}, //= (  440 x 680  ) mm  = ( 17.32 x 26.77 ) in
                    {size: 'FR_DOUBLE_CLOCHE', x: 1133.858, y: 1700.787}, //= (  400 x 600  ) mm  = ( 15.75 x 23.62 ) in
                    {size: 'FR_DOUBLE_POT', x: 1133.858, y: 1757.480}, //= (  400 x 620  ) mm  = ( 15.75 x 24.41 ) in
                    {size: 'FR_ECU', x: 1133.858, y: 1474.016}, //= (  400 x 520  ) mm  = ( 15.75 x 20.47 ) in
                    {size: 'FR_COURONNE', x: 1020.472, y: 1303.937}, //= (  360 x 460  ) mm  = ( 14.17 x 18.11 ) in
                    {size: 'FR_TELLIERE', x: 963.780, y: 1247.244}, //= (  340 x 440  ) mm  = ( 13.39 x 17.32 ) in
                    {size: 'FR_POT', x: 878.740, y: 1133.858}, //= (  310 x 400  ) mm  = ( 12.20 x 15.75 ) in
                ]
            },
            checkPDFSize: function (w = 0, h = 0) {
                let size = {size: 'A4', x: 595.276, y: 841.890}
                if (!w || !h) {
                    return size;
                }
                let pSizes = this.pdfSizes();
                let pSize = pSizes.find(i => i.x.toFixed() == w.toFixed() && i.y.toFixed() == h.toFixed());
                if (pSize && pSize.size) {
                    size = pSize
                }
                return size;
            },
            getPage: function (pdf, canvasId, callBack) {
                let canvasParent = document.getElementById(canvasId);
                // let textLayer = document.getElementById('text-layer');

                pdf.getPage(pdfData.currentPage).then((page) => {

                    let pageS = this.checkPDFSize(page.getViewport(1.0).width, page.getViewport(1.0).height);
                    pdfData.pageSize = pageS.size;
                    let viewport = page.getViewport(pdfData.scale);
                    let canvas = document.createElement('canvas'), ctx = canvas.getContext('2d');
                    canvas.id = canvasId + pdfData.currentPage;
                    canvas.className = "pdf-canvas-viewer";
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;

                    let renderContext = {canvasContext: ctx, viewport: viewport};
                    page.render(renderContext).then(() => {
                        pdfData.pages.push(ctx.getImageData(0, 0, canvas.width, canvas.height));

                        pdfData.heights.push(canvas.height);

                        pdfData.height += canvas.height;
                        // textLayer.height = canvasParent.height += canvas.height;
                        if (pdfData.width < canvas.width) {
                            pdfData.width = canvas.width;
                            // textLayer.width = canvasParent.width = canvas.width
                        }

                        if (pdfData.currentPage < pdf.numPages) {
                            pdfData.currentPage++;
                            ctx.putImageData(ctx.getImageData(0, 0, canvas.width, canvas.height), 0, pdfData.height);
                            canvasParent.append(canvas);

                            this.getPage(pdf, canvasId, callBack);
                        } else {
                            pdfData.currentPage++;
                            ctx.putImageData(ctx.getImageData(0, 0, canvas.width, canvas.height), 0, pdfData.height);
                            canvasParent.append(canvas);


                            // for (let i = 0; i < pdfData.pages.length; i++) {
                            //     // let canvasItem = document.createElement('canvas');
                            //     // let ctx = canvasItem.getContext('2d');
                            //
                            //     console.log(canvasItem);
                            //     canvasParent.append(canvasItem);
                            //
                            //     ctx.putImageData(pdfData.pages[i], 0, pdfData.heights[i]);
                            //
                            //
                            //     // let canvas = document.getElementById(id);
                            //     // let ctx = canvas.getContext('2d');
                            // }

                            if (angular.isFunction(callBack)) {
                                callBack({
                                    success: true,
                                    data: {
                                        type: 'pdf',
                                        pdfData: pdfData
                                    }
                                });
                            }
                        }
                    });
                });
            },
            viewPdfByUrl: function (url, canvasId, callBack, opts = {}) {
                if (!url) {
                    callBack({
                        success: false
                    });
                }

                pdfData = {
                    pages: [],
                    heights: [],
                    width: 0,
                    height: 0,
                    currentPage: 1,
                    scale: 1.33385,
                    pageSize: ''
                };

                if(opts && opts.scale && Number(opts.scale) > 0) {
                    pdfData.scale = Number(opts.scale);
                }

                let canvasParent = document.getElementById(canvasId);
                if (canvasParent && canvasParent.innerHTML) {
                    canvasParent.innerHTML = ''
                }

                try {
                    PDFJS.disableWorker = true;
                    PDFJS.getDocument(url).then((doc) => {
                        this.getPage(doc, canvasId, callBack);
                    });
                } catch (e) {
                    callBack({
                        success: false,
                        error: e
                    });
                }
            },

            copyToClipboard: function (name) {
                var copyElement = document.createElement("textarea");
                copyElement.style.position = 'fixed';
                copyElement.style.opacity = '0';
                copyElement.textContent =  decodeURI(name);
                var body = document.getElementsByTagName('body')[0];
                body.appendChild(copyElement);
                copyElement.select();
                document.execCommand('copy');
                body.removeChild(copyElement);
            }
        };
    }
})();
