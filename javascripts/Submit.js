angular.module('roles', [])
	.controller('SubmitController', ['$scope', function($scope) {
	    $scope.formClass = 'visible';
		$scope.waitingClass = 'initially-hidden';
	
		var socket = new WebSocket('ws://tpkelly.github.io/roles-host/', ['soap']);
	
		$scope.submitName = function() {
		  $scope.formClass = 'animate-hidden';
		  $scope.waitingClass = 'visible';
		  
		  socket.send($scope.badgename);
		}
	}]);
