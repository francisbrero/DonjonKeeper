//public/core.js

var donjon = angular.module('donjon', []);

function mainController($scope, $http) {
	$scope.formData = {};	
	// when landing on the page, get status and show it
	$http.get('/GET/currentstatus')
		.success(function(data) {
			$scope.result = data;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	
	// not used...
	 $scope.status = function() {
		 $http.get('/GET/status', $scope.formData)
			 .success(function(data) {
				$scope.results = data;
			 })
			 .error(function(data) {
				 console.log('Error: ' + data);
			 });
	 };
		
	// post open to the db
	 $scope.open = function() {
		 $http.get('/POST/open', $scope.formData)
			 .success(function(data) {
				$scope.results = data;
			 })
			 .error(function(data) {
				 console.log('Error: ' + data);
			 });
		// Refresh status
		$http.get('/GET/currentstatus')
		.success(function(data) {
			$scope.result = data;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	 };
	 
	 // post close to db
	 $scope.close = function() {
		 $http.get('/POST/close', $scope.formData)
			 .success(function(data) {
				console.log('ta mere');
				$scope.results = data;
			 })
			 .error(function(data) {
				 console.log('Error: ' + data);
			 });
		// refresh status
		$http.get('/GET/currentstatus')
		.success(function(data) {
			$scope.result = data;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	 };

}