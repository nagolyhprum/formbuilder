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
	$scope.properties = {};
	$scope.common = function() {
		var properties = {};
		var name, value, primary, secondary, commonName, commonValue;
		if($scope.highlighted.length) {
			primary = $scope.highlighted[0].properties;
			for(var name in primary) {
				if(name != "Name" || $scope.highlighted.length == 1) {
					commonName = commonValue = true;
					value = primary[name].value;
					for(var i = 1; i < $scope.highlighted.length; i++) {
						secondary = $scope.highlighted[i].properties;
						if(!secondary[name]) {
							commonName = false;
							commonValue = false;
						} else if(secondary[name].value != value) {
							commonValue = false;
						}
					}
					if(commonName) {
						properties[name] = angular.copy(primary[name]);
						if(!commonValue) {
							properties[name].value = "";
						}
					}
				}
			}
		}
		$scope.properties = properties;
	};
	var cache = "";
	$scope.startName = function() {
		cache = $scope.highlighted[0].properties.Name.value;
	};
	$scope.stopName = function() {
		var name = $scope.properties.Name.value;
		if(name != cache) {
			var components = $scope.components;
			for(var i = 0; i < components.length; i++) {
				if(components[i].properties.Name.value == name && components[i] != $scope.highlighted[0]) {
					alert("That name is already in use.");
					$scope.properties.Name.value = cache;
					return;
				}
			}
			$scope.highlighted[0].properties.Name.value = name;
		}
	};
}]);