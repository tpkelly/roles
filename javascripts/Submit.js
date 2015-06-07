angular.module('roles', [])
	.controller('SubmitController', ['$scope', function($scope) {
	    $scope.formClass = 'visible';
		$scope.waitingClass = 'initially-hidden';
	
		var socket = new WebSocket('ws://tpkelly.github.io/roles-host/', ['soap']);
	
		$scope.submitName = function() {
		  if ($scope.badgename == null || $scope.badgename.length === 0) {
		    return;
	      }
		
		  $scope.formClass = 'animate-hidden';
		  $scope.waitingClass = 'visible';
		  
		  socket.send($scope.badgename);
		}
	}]);
