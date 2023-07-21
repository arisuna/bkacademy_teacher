/**=========================================================
 * Module: trigger-resize.js
 * Triggers a window resize event from any element
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('progressCircle', progressCircle);

    progressCircle.$inject = ['urlBase','$compile'];

    function progressCircle (urlBase,$compile) {
        var directive = {
            link: function(scope, element, attributes) {

            },
            scope:{
                size: '<?',
                percent: '<?',
                status: '<?',
                isFalse: '<?'
            },
            restrict: 'EA',
            //templateUrl: urlBase.tplBase('base-modules/utils', 'progress-circle'),
            //template: "{{svg}}",

            controller: function ($scope, $element) {
                if(angular.isUndefined($scope.isFalse)){
                    $scope.isFalse = false;
                }

                $scope.init = function(){
                    $scope.repairPercent();
                    $scope.repairSize();

                    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    svg.setAttribute("class", "progress-circle");
                    svg.setAttribute("width", $scope.size);
                    svg.setAttribute("height", $scope.size);
                    svg.setAttribute("viewBox", '0 0 '+$scope.size+' '+$scope.size);

                    let met = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                    met.setAttribute("stroke-width", 2);
                    met.setAttribute("class", "progress-circle-meter");
                    met.setAttribute("cx", $scope.size/2);
                    met.setAttribute("cy", $scope.size/2);
                    met.setAttribute("r", ($scope.size - 2)/2);
                    met.setAttribute("fill", "none");
                    if ($scope.percent == 0){
                        if ($scope.status == 0){
                            met.setAttribute("stroke", "#f9cb40");
                        }else{
                            if($scope.isFalse){
                                met.setAttribute("stroke", "#e34a6f");
                            }else{
                                met.setAttribute("stroke", "#0098FF");
                            }
                        }
                    }else{
                        met.setAttribute("stroke", "#cbd6e2");
                    }
                    met.setAttribute("stroke-width", "2");

                    let val = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                    val.setAttribute("stroke-width", 2);
                    val.setAttribute("class", "progress-circle-meter");
                    val.setAttribute("cx", $scope.size/2);
                    val.setAttribute("cy", $scope.size/2);
                    val.setAttribute("r", ($scope.size - 2)/2);
                    val.setAttribute("fill", "none");
                    if ($scope.percent == 100){
                        val.setAttribute("stroke", "#39c17f");
                    }else if ($scope.percent < 100 && $scope.percent > 0){
                        if($scope.isFalse){
                            met.setAttribute("stroke", "#e34a6f");
                        }else{
                            met.setAttribute("stroke", "#0098FF");
                        }
                    }

                    val.setAttribute("stroke-width", "2");
                    val.setAttribute("stroke-dasharray", 2*3.14*($scope.size - 2)/2);
                    val.setAttribute("stroke-dashoffset", (2*3.14*($scope.size - 2)/2)*(1 - $scope.percent/100));

                    let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
                    text.setAttribute("class","progress-circle-text");
                    text.setAttribute("style","transform: rotateZ(90deg) translateY(-"+($scope.size - 2)+"px)");
                    text.innerHTML = $scope.percent+"%";
                    //text.setAttribute();
                    text.setAttribute("x","50%");
                    text.setAttribute("y","50%");
                    text.setAttribute("dominant-baseline","middle");
                    text.setAttribute("text-anchor","middle");

                    svg.appendChild(met);
                    svg.appendChild(val);
                    svg.appendChild(text);
                    $element.append(svg);
                };

                $scope.repairSize = function (size){
                    if(!$scope.size || isNaN($scope.size) || $scope.size < 0){
                        $scope.size = 40;
                    }
                };

                $scope.repairPercent = function (percent){
                    if(!$scope.percent || isNaN($scope.percent) || $scope.percent < 0){
                        $scope.percent = 0;
                    }else if($scope.percent > 100){
                        $scope.percent = 100;
                    }
                };

                $scope.init();

                $scope.$watch('percent', function(newValue, oldValue){
                    if (newValue != oldValue){
                        $element.find('svg').remove();
                        $scope.init();
                    }
                })

                $scope.$watch('status', function(newValue, oldValue){
                    if (newValue != oldValue){
                        $element.find('svg').remove();
                        $scope.init();
                    }
                })
            }
        };

        return directive;
    }

})();
