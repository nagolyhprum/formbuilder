formbuilder.controller("toolbar", ["$scope", function($scope) {
	$scope.components = ["Label", "Textbox"];
	$scope.is = function(value, type) {
		return typeof(value) == type;
	};
}]);