formbuilder.controller("signature", ["$scope", function($scope) {
	var points = [], down, point;
	
	$scope.init = function(component) {		
		$scope.common();
	};
	
	function getPoint($event) {
		var element = document.querySelector("#" + $scope.component.properties.Name.value + "canvas");
		var x = 0, y = 0;		
		do {
			x += element.offsetLeft || 0;
			y += element.offsetTop  || 0;
			element = element.offsetParent;
		} while(element);
		return {x:$event.pageX - x, y:$event.pageY - y};
	}
	
	$scope.start = function($event) {
		down = true;
		point = getPoint($event);
		$scope.component.date = new Date();
	};
	
	$scope.toDataURL = function() {
		var canvas = document.querySelector("#" + $scope.component.properties.Name.value + "canvas") || {toDataURL:function(){return"";}};
		return canvas.toDataURL("image/png");
	};
	
	$scope.open = function() {		
		$("#" + $scope.component.properties.Name.value + "modal").on("hidden.bs.modal", function() {
			//
		});	
		
		$scope.open = function(){
			$("#" + $scope.component.properties.Name.value + "modal").modal("show");
		};
		$scope.open();
	};
	
	$scope.sign = function($event) {
		if(down) {
			var canvas = document.querySelector("#" + $scope.component.properties.Name.value + "canvas");
			var context = canvas.getContext("2d");
			var temp = getPoint($event);
			context.strokeStyle = "black";
			context.beginPath();
			context.moveTo(point.x, point.y);
			context.lineTo(temp.x, temp.y);
			context.closePath();
			context.stroke();
			points.push(point);
			point = temp;
		}
	};
	
	$scope.stop = function($event) {
		if(down) {
		}
		down = false;
	};
}]);