//public/core.js

var donjon = angular.module('donjon', []);

function mainController($scope, $http) {
	$scope.formData = {};	
	// when landing on the page, get all todos and show them
	$http.get('/GET/currentstatus')
		.success(function(data) {
			$scope.result = data;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	
	// when submitting the add form, send the text to the node API
	 $scope.status = function() {
		 $http.get('/GET/status', $scope.formData)
			 .success(function(data) {
				$scope.results = data;
			 })
			 .error(function(data) {
				 console.log('Error: ' + data);
			 });
	 };
		
	// when submitting the add form, send the text to the node API
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
	 
	 // when submitting the add form, send the text to the node API
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