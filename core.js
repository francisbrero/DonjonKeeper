var donjon = angular.module('donjon', []);

function mainController($scope, $http) {
	$scope.formData = {};

	// when landing on the page, get status and show it
	$http.get('/api/status')
		.success(function(data) {
			$scope.status = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	// when landing on the page, get status and show it
	$http.get('/api/bla')
		.success(function(data) {
			$scope.status = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	
	// when submitting the add form, send the text to the node API
	$scope.createStatus = function() {
		$http.post('/api/status', $scope.formData)
			.success(function(data) {
				$scope.formData = {}; // clear the form so our user is ready to enter another
				$scope.status = data;
				console.log(data);
				console.log('Ta mere');
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

}