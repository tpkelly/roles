angular.module('roles', [])
	.controller('SubmitController', ['$scope', function($scope) {
	    $scope.formClass = 'visible';
		$scope.waitingClass = 'initially-hidden';
	
		var socket = new WebSocket('ws://roles-host.herokuapp.com');
		socket.onopen = function() {};
		
		socket.onmessage = function(message) {
		  console.log(message);
		  var data = JSON.parse(message.data);
		  if (data.role) {
		      console.log(data.role);
		  }
		};
	
		$scope.submitName = function() {
		  if ($scope.badgename == null || $scope.badgename.length === 0) {
		    return;
	      }
		
		  $scope.formClass = 'animate-hidden';
		  $scope.waitingClass = 'visible';
		  
		  
		  var message = { name: $scope.badgename };
		  socket.send(JSON.stringify(message));
		}
	}]);
