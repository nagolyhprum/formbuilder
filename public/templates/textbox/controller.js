formbuilder.controller("textbox", ["$scope", function($scope) {
	$scope.init = function(component) {
		component.properties["Default Value"] = {
			value : ""
		};
		component.properties.Multilined = {
			value : false
		};
		component.properties.Placeholder = {
			value : ""
		};
		$scope.common();
	};
}]);