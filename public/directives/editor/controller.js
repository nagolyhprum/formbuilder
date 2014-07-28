formbuilder.controller("editor", ["$scope", function($scope) {	
	$scope.highlighted = [];
	$scope.design = true;
	$scope.components = [];
	
	$scope.add = function(component) {
		var component = {
			component : component,
			properties : {
				Name : {
					value : name(component)
				},	
				Display : {
					value : ""
				}
			}			
		};
		$scope.highlighted.splice(0, $scope.highlighted.length, component);
		$scope.components.push(component);
	};
	
	function name(component) {
		var number = 0;
		while(document.getElementById(component + number)) {
			number++;
		}
		return component + number;
	}	
}]);