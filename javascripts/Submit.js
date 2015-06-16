angular.module('roles', [])
	.controller('SubmitController', ['$scope', function($scope) {
	    $scope.formClass = 'visible';
		$scope.waitingClass = 'initially-hidden';
		$scope.role = null;
		$scope.countdown = null;
	    var interval;
	    var countdown = function() {
			if ($scope.countdown <= -5) {
			  clearInterval(interval);
			  $scope.role = null;
			  return;
			}
			$scope.countdown--;
            $scope.$apply();
		}
	
		var socket = new WebSocket('ws://roles-host.herokuapp.com');
		socket.onopen = function() {};
		
		socket.onmessage = function(message) {
		  var data = JSON.parse(message.data);
		  if (data.role) {
		       $scope.countdown = 5;
			   $scope.role = data.role;
			   $scope.$apply();
			   interval = setInterval(countdown, 1000);
		  }
		};
	
		$scope.submitName = function() {
		  if ($scope.badgename == null || $scope.badgename.length === 0) {
		    return;
	      }
		
		  $scope.formClass = 'animate-hidden';
		  $scope.waitingClass = 'visible';
		  
		  
		  var message = { name: $scope.badgename, type: 'join' };
		  socket.send(JSON.stringify(message));
		}
	}]);
