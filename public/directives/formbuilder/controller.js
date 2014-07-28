formbuilder.controller("formbuilder", ["$scope", function($scope) {	
	$scope.top = function($offset, component) {
		component.properties.Y.value += $offset.y;
		component.properties.Height.value -= $offset.y;
		$scope.$apply();
	};
	$scope.right = function($offset, component) {
		component.properties.Width.value += $offset.x;
		$scope.$apply();
	};
	$scope.bottom = function($offset, component) {
		component.properties.Height.value += $offset.y;
		$scope.$apply();
	};
	$scope.left = function($offset, component) {
		component.properties.X.value += $offset.x;
		component.properties.Width.value -= $offset.x;
		$scope.$apply();
	};
	$scope.move = function($offset) {
		for(var i = 0; i < $scope.highlighted.length; i++) {
			var properties = $scope.highlighted[i].properties;
			properties.X.value += $offset.x;
			properties.Y.value += $offset.y;
		}
		$scope.$apply();
	};
	$scope.startSelect = function($event) {
		$scope.selection = {
			x1 : $event.offsetX,
			x2 : $event.offsetX,
			y1 : $event.offsetY,
			y2 : $event.offsetY
		};
	};
	$scope.select = function($offset) {
		$scope.selection.x2 += $offset.x;
		$scope.selection.y2 += $offset.y;
		$scope.selection.x = Math.min($scope.selection.x1, $scope.selection.x2);
		$scope.selection.y = Math.min($scope.selection.y1, $scope.selection.y2);
		$scope.selection.width = Math.abs($scope.selection.x2 - $scope.selection.x1);
		$scope.selection.height = Math.abs($scope.selection.y2 - $scope.selection.y1);
		$scope.$apply();
	};
	$scope.endSelect = function($event) {
		if($scope.selection) {
			$scope.highlighted.splice(0);
			var selection = $scope.selection;
			for(var i = 0; i < $scope.components.length; i++) {
				var properties = $scope.components[i].properties,
					width = Math.min(selection.x + selection.width, properties.X.value + properties.Width.value) - Math.max(properties.X.value, selection.x),
					height = Math.min(selection.y + selection.height, properties.Y.value + properties.Height.value) - Math.max(properties.Y.value, selection.y);
				if(width >= 0 &&  height >= 0) {
					$scope.highlighted.push($scope.components[i]);
				}
			}
		}
		$scope.selection = null;
	};
}]);