(function(){
    var app = angular.module('app', ['ngRoute', 'angular-jwt']);
    app.config(function($routeProvider, $locationProvider){
        $locationProvider.html5Mode(true);
        $routeProvider.when('/', {
            templateUrl: './templates/main.html',
            controller: 'MainController',
            controllerAs: 'vm',
            access: {
                restricted: false
            }
        });
        $routeProvider.when('/login', {
            templateUrl: './templates/login.html',
            controller: 'LoginController',
            controllerAs: 'vm',
            access: {
                restricted: false
            }
        });
        $routeProvider.when('/register', {
            templateUrl: './templates/register.html',
            controller: 'RegisterController',
            controllerAs: 'vm',
            access: {
                restricted: false
            }
        });
        $routeProvider.when('/polls', {
            templateUrl: './templates/polls.html',
            controller: 'PollsController',
            controllerAs: 'vm',
            access: {
                restricted: false
            }
        });
        $routeProvider.when('/poll/:id', {
            templateUrl: './templates/poll.html',
            controller: 'PollController',
            controllerAs: 'vm',
            access: {
                restricted: false
            }
        });
        $routeProvider.when('/profile', {
            templateUrl: './templates/profile.html',
            controller: 'ProfileController',
            controllerAs: 'vm',
            access: {
                restricted: true
            }
        });
    
    });

    app.controller('MainController', MainController);
    function MainController($location, $window){
        var vm = this;
        vm.title = "MainController";
    }

    app.controller('LoginController', LoginController);
    function LoginController($location, $window){
        var vm = this;
        vm.title = "LoginController";
    }

    app.controller('RegisterController', RegisterController);
    function RegisterController($location, $window, $http){
        var vm = this;
        vm.title = "RegisterController";
        vm.error = "";
        vm.register = function () {
            if(!vm.user){
                console.log('Imvalid credentials');
                return;
            }
            $http.post('/api/register', vm.user)
                .then(function(res){
                    console.log(res);
                }, function(err){
                    vm.error = err.data.errmsg;
                    console.log(err);
                })
            
        }
    }

    app.controller('PollsController', PollsController);
    function PollsController($location, $window){
        var vm = this;
        vm.title = "PollsController";
    }

    app.controller('PollController', PollController);
    function PollController($location, $window){
        var vm = this;
        vm.title = "PollController";
    }

    app.controller('ProfileController', ProfileController);
    function ProfileController($location, $window){
        var vm = this;
        vm.title = "ProfileController";
    }

}());