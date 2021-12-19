app = angular.module("admin-app", ["ngRoute"]);

app.controller("admin-ctrl", function($scope, $http, $rootScope,$window) {
		$scope.logout = function() {
			Swal.fire({
				width: '400px',
				title: 'You definitely want to log out?',
				showCancelButton: true,
				confirmButtonText: `OK`,
			}).then((result) => {
				if (result.isConfirmed) {
	          	 	$window.location.href = '/security/logoff';
				}
			})
		}
		
})

app.config(function($routeProvider) {
	$routeProvider
		.when("/user", {
			templateUrl: "/assets/admin/user/index.html",
			controller: "user-ctrl"
		})		
		.otherwise({
			templateUrl: "/assets/admin/home/index.html",
			controller: "home-ctrl"
		});
})