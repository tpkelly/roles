angular.module('roles', [])
    .controller('SubmitController', ['$scope', function($scope) {
        $scope.formClass = 'visible';
        $scope.waitingClass = 'initially-hidden';
        $scope.role = null;
        $scope.countdown = null;
        $scope.moderatorCalled = false;
        $scope.error = false;
    
        var interval;
        var keepAlive;
        var countdown = function() {
            if ($scope.countdown <= -5) {
              clearInterval(interval);
              $scope.role = null;
              return;
            }
            $scope.countdown--;
            $scope.$apply();
        }
    
        var socket;
        var socketHost = 'ws://roles-host.herokuapp.com';
        
        function alivePing() {
          var alive = { type: 'alive', name: $scope.badgename };
          socket.send(JSON.stringify(alive));
        }
        
        function onopen() {
          if ($scope.badgename && $scope.badgename.length) {
            var message = { type: 'join', name: $scope.badgename, signal: $scope.moderatorCalled };
            socket.send(JSON.stringify(message));
          }
          
          keepAlive = setInterval(alivePing, 10000);
        }
        
        function onerror() {
          clearInterval(keepAlive);
          
          $scope.error = true;
          $scope.formClass = 'initially-hidden';
          $scope.waitingClass = 'initially-hidden';
          $scope.$apply();
        }
        
        function onclose() {
          onerror();
        }
        
        function onmessage (message) {
          if (message.data === 'dismiss') {
            $scope.moderatorCalled = false;
            $scope.$apply();
            return;
          }
    
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
    
        $scope.callMod = function() {
          var message = { type: 'callModerator' };
          socket.send(JSON.stringify(message));
          
          $scope.moderatorCalled = true;
        }
        
        function openSocket() {
          socket = new WebSocket(socketHost);
          socket.onopen = onopen;
          socket.onclose = onclose;
          socket.onmessage = onmessage;
          socket.onerror = onerror;
        }
        
        openSocket();
    }]);
