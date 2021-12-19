app = angular.module("login-app", []);

app.controller("login-ctrl", function($scope, $http) {
   $scope.form = {
	  emoji:'user_default.png',
   }
	
	$scope.reset = function() {
	   $scope.form = {
		  emoji:'user_default.png',
	   }
	}
	
	$scope.logup = function() {
		var item = angular.copy($scope.form);
		$http.post(`/rest/user`, item).then(resp => {
			if (resp.status == 200) {
				$scope.reset();
				return Swal.fire({
					width: '400px',
					title: 'Sign Up Success!',
					icon: 'success',
					showConfirmButton: false,
					timer: 1500
				})
			}
		}).catch(error => {
			if (error.status == 400) {
				return Swal.fire({
					width: '400px',
					title: 'Id already exists',
					icon: 'error',
					confirmButtonText: 'Ok',
				})
			}
			Swal.fire({
				width: '400px',
				title: 'Registration error!',
				icon: 'error',
				confirmButtonText: 'Ok',
			})			
			console.log("Error", error);
		});
	}
	
	
	$scope.imageChanged = function(files) {
		var data = new FormData();
		data.append('file', files[0]);
		$http.post('/rest/upload/images/users', data, {
			transformRequest: angular.identity,
			headers: { 'Content-Type': undefined }
		}).then(resp => {
			$scope.form.emoji = resp.data.name;
		}).catch(error => {
			return Swal.fire({
				width: '400px',
				title: 'Error loading image!',
				icon: 'error',
				confirmButtonText: 'Ok',
			})
			
			console.log("Error", error);
		})
	}
})