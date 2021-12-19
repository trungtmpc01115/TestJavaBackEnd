app = angular.module("login-app", []);

app.controller("login-ctrl", function($scope, $http) {   
   $scope.login = function(){   
       /*if($scope.user==$scope.data.jsonData.username & $scope.pass==$scope.data.jsonData.password){
         window.open("./about.html")
       }else{
          alert("Sai tài khoản hoặc mật khẩu")
       }*/
   }
})