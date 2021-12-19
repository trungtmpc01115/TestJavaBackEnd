app.controller("user-ctrl", function($scope, $http) {
	$scope.items = [];
	$scope.form = {
	  emoji:'user_default.png',
   }

	$scope.initialize = function() {
		$http.get("/rest/user").then(resp => {
			$scope.items = resp.data;
		});
	}

	$scope.initialize();

	$scope.reset = function() {
		$scope.form = {
			emoji:'user_default.png',
		};
	}

	$scope.edit = function(item) {
		$scope.form = angular.copy(item);
		$(".nav-tabs a:eq(0)").tab('show')
	}

	$scope.create = function() {
		var item = angular.copy($scope.form);
		$http.post(`/rest/user`, item).then(resp => {
			if (resp.status == 200) {
				$scope.initialize();
				$scope.reset();
				return Swal.fire({
					width: '400px',
					title: 'Create success!',
					icon: 'success',
					showConfirmButton: false,
					timer: 1500
				})
			}
		}).catch(error => {
			if (error.status == 400) {
				return Swal.fire({
					width: '400px',
					title: 'Id already exist!',
					icon: 'error',
					confirmButtonText: 'Ok',
				})
			}
			Swal.fire({
				width: '400px',
				title: 'Create error!',
				icon: 'error',
				confirmButtonText: 'Ok',
			})			
			console.log("Error", error);
		});
	}

	$scope.update = function() {
		var item = angular.copy($scope.form);
		$http.put(`/rest/user`, item).then(resp => {
			if (resp.status == 200) {
				var index = $scope.items.findIndex(a => a.id == item.id);
				$scope.items[index] = item;
				return Swal.fire({
					width: '400px',
					title: 'Update successful!',
					icon: 'success',
					showConfirmButton: false,
					timer: 1500
				})
			}
		}).catch(error => {
			if (error.status == 404) {
				return Swal.fire({
					width: '400px',
					title: 'This User could not be found!',
					icon: 'error',
					confirmButtonText: 'Ok',
				})
			}
			Swal.fire({
				width: '400px',
				title: 'Update error!',
				icon: 'error',
				confirmButtonText: 'Ok',
			})
			console.log("Error", error);
		});
	}

	$scope.delete = function(item) {
		Swal.fire({
			width: '400px',
			title: 'You want to delete this user?',
			showCancelButton: true,
			confirmButtonText: `OK`,
		}).then((result) => {
			if (result.isConfirmed) {
				$http.delete(`/rest/user/${item.id}`).then(resp => {
					if (resp.status == 200) {
						var index = $scope.items.findIndex(a => a.id == item.id);
						$scope.items.splice(index, 1);
						$scope.reset();
						return Swal.fire({
							width: '400px',
							title: 'Delete successful!',
							icon: 'success',
							showConfirmButton: false,
							timer: 1500
						})
					}
				}).catch(error => {
					if (error.status == 404) {
						return Swal.fire({
							width: '400px',
							title: 'This User could not be found!',
							icon: 'error',
							confirmButtonText: 'Ok',
						})
					}
					Swal.fire({
						width: '400px',
						title: 'Delete error!',
						icon: 'error',
						confirmButtonText: 'Ok',
					})
					console.log("Error", error);
				});
			}
		})
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

	$scope.pager = {
		page: 0,
		size: 10,
		get items() {
			var start = this.page * this.size;
			return $scope.items.slice(start, start + this.size);
		},
		get count() {
			return Math.ceil(1.0 * $scope.items.length / this.size);
		},

		first() {
			this.page = 0;
		},
		prev() {
			this.page--;
			if (this.page < 0) {
				this.last();
			}
		},
		next() {
			this.page++;
			if (this.page >= this.count) {
				this.first();
			}
		},
		last() {
			this.page = this.count - 1;
		},
	}
}); 