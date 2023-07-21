(function () {
    'use strict';
    // Used only for the BottomSheetExample
    angular
        .module('app.material')
        .run(materialRun)
    ;
    materialRun.$inject = ['$http', '$templateCache'];

    function materialRun($http, $templateCache) {

    }

})();
