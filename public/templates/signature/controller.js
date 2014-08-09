formbuilder.controller("signature", ["$scope", function($scope) {
	$scope.init = function(component) {
		$scope.canvas = angular.element(document.querySelector("#" + $scope.component.properties.Name.value));
		$scope.context = $scope.getContext("2d");
		$scope.common();
	};
	
	$scope.sign = function($event) {
		
	};
	$scope.stop = function($event) {
		
	};
}]);