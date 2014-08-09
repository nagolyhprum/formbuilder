formbuilder.controller("button", ["$scope", function($scope) {
	$scope.init = function(component) {
		component.properties.Text = {
			value : ""
		};
		$scope.common();
	};
}]);