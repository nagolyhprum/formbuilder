formbuilder.controller("image", ["$scope", function($scope) {
	$scope.init = function(component) {
		component.properties.Source = {
			value : ""
		};
		$scope.common();
	};
}]);