angular.module('roles', [])
	.controller('SubmitController', ['$scope', function($scope) {
	    $scope.formClass = 'visible';
		$scope.waitingClass = 'initially-hidden';
	
		$scope.submitName = function() {
		  $scope.formClass = 'animate-hidden';
		  $scope.waitingClass = 'visible';
		}
	}]);
