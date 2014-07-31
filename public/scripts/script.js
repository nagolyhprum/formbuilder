var formbuilder = angular.module("formbuilder", []).run(["$rootScope", function($rootScope) {
	$rootScope.lists = {
		colors : [
			"White",
			"Black",
			"Red",
			"Blue",
			"Yellow"
		], styles : [
			"Solid",
			"Dotted",
			"Dashed",
			"Inset",
			"Outset",
			"Double"
		]
	};
}]);

formbuilder.directive("formbuilder", function() {
	return {
		templateUrl : "directives/formbuilder/view.html",
		restrict : "A"
	};
});

formbuilder.directive("toolbar", function() {
	return {
		templateUrl : "directives/toolbar/view.html",
		restrict : "A"
	};
});

formbuilder.directive("editor", function() {
	return {
		templateUrl : "directives/editor/view.html",
		restrict : "A"
	};
});

formbuilder.directive("textbox", function() {
	return {
		templateUrl : "directives/textbox/view.html",
		restrict : "A"
	};
});

formbuilder.directive("ngDrag", function() {
	return function($scope, $element, $attributes) {
		var down = false, previous = {};	
	
		function preventDefault(event) {
			event.stopPropagation();
			event.preventDefault();
			event.cancelBubbling = true;
			return false;
		}
		
		$element.on("mousedown", function(event) {
			down = true;
			previous = {
				x : event.pageX,
				y : event.pageY
			};
			return preventDefault(event);
		});
		angular.element(document).on("mouseup", function(event) {
			if(down) {
				down = false;
				return preventDefault(event);
			}
		}).on("mousemove", function(event) {
			if(down) {
				$scope.$offset = {
					x : event.pageX - previous.x,
					y : event.pageY - previous.y
				};
				$scope.$eval($attributes.ngDrag);
				previous = {
					x : event.pageX,
					y : event.pageY
				};
				return preventDefault(event);
			}
		});
	};
});

formbuilder.controller("flexible", ["$scope", function($scope) {
	$scope.init = function(component) {
		component.properties.X = {
			value : 0
		};
		component.properties.Y = {
			value : 0
		};
		component.properties.Width = {
			value : 100
		};
		component.properties.Height = {
			value : 100
		};
		$scope.common();
	};
}]);

formbuilder.controller("styleable", ["$scope", function($scope) {
	$scope.init = function(component) {
		component.properties.Background = {
			value : "White",
			list : "colors"
		};
		component.properties.Foreground = {
			value : "Black",
			list : "colors"
		};
		component.properties["Border Color"] = {
			value : "White",
			list : "colors"
		};
		component.properties["Border Width"] = {
			value : 0
		};
		component.properties["Border Style"] = {
			value : "Solid",
			list : "styles"
		};
		$scope.common();
	};
}]);

Array.prototype.contains = function(needle) {
	return this.indexOf(needle) + 1;
};