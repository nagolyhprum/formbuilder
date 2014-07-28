formbuilder.controller("label", ["$scope", function($scope) {
	$scope.init = function(component) {
		component.properties.Text = {
			value : ""
		};
	};
}]);