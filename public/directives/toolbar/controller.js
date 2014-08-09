formbuilder.controller("toolbar", ["$scope", function($scope) {
	$scope.components = ["Button", "Image", "Label", "Signature", "Textbox"];
	$scope.is = function(value, type) {
		return typeof(value) == type;
	};
	$scope.update = function(name, type) {
		$scope.properties[name].value = window[type]($scope.properties[name].value);
		for(var i = 0; i < $scope.highlighted.length; i++) {
			$scope.highlighted[i].properties[name].value = $scope.properties[name].value;
		}
	};
}]);