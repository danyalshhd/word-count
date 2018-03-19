let app = angular.module('angularDemo', ['ui.router']);
app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('home',{
            url: '/',
            template: '<home></home>',
            controllerAs: 'hc'
        })
        .state('posts', {
            url: '/posts',
            template: '<ui-view></ui-view>'
        })
        .state('posts.complete', {
            url: '/complete',
            template: '<posts-list></posts-list>',
            controllerAs: 'vm'
        })
})

app.controller('mainCtrl', function (postsSvc) {

})

app.service('postsSvc', function ($http) {
    this.getPosts = function(){
        return $http.get('http://profiler.markinson.com.au/api/Customer');
    }
})