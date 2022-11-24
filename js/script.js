(function (ng) {

	'use strict';
	var app = angular.module('myApp', ['ngRoute', 'ui.router']);
	app.controller('mainCtrl', function ($scope, SharedResourcesFactory) {
		SharedResourcesFactory.isChecked = false;
		$scope.SharedResourcesFactory = SharedResourcesFactory;

		$scope.sortDates = function (row) {
			return row['dateCreated'].split('-').reverse().join('-');
		};
	});

	app.controller("tutorialsController", function ($scope, $http, SharedResourcesFactory) {
		SharedResourcesFactory.isChecked = true;
		$scope.SharedResourcesFactory = SharedResourcesFactory;

		function getTutorials() {
			$http.get("/tutorials/tutorials.json").then(function (response) {
				$scope.tutorials = response.data;
			});
		};
		getTutorials();
	});

	app.controller("tutorialController", function ($scope, $http, SharedResourcesFactory) {
		SharedResourcesFactory.isChecked = true;
		$scope.SharedResourcesFactory = SharedResourcesFactory;
	});

	app.directive('script', function () {
		return {
			restrict: 'E',
			scope: false,
			link: function (scope, elem, attr) {
				if (attr.type === 'text/javascript') {
					var s = document.createElement("script");
					s.type = "text/javascript";
					var src = elem.attr('src');
					if (src !== undefined) {
						s.src = src;
					}
					else {
						var code = elem.text();
						s.text = code;
					}
					document.head.appendChild(s);
					elem.remove();
				}
			}
		};
	});

	/*app.config(function ($routeProvider, $locationProvider) {
		$locationProvider
			.html5Mode(true)
			.hashPrefix('!');

		$routeProvider
			.when("/", {
				templateUrl: "about.html",
				controller: "mainCtrl"
			}).when("/tutorials", {
				templateUrl: "tutorials.html",
				controller: "tutorialsController",
			}).when("/serialized_and_deserialized_objects", {
				templateUrl: "tutorials/serialized_and_deserialized_objects.htm",
				controller: "tutorialController"
			}).when("/serialized_and_deserialized_objects", {
				templateUrl: "tutorials/serialized_and_deserialized_objects.htm",
				controller: "tutorialController"
			}).when("/handling_proprties", {
				templateUrl: "tutorials/handling_proprties.htm",
				controller: "tutorialController"
			}).when("/countdownlatch", {
				templateUrl: "tutorials/countdownlatch.htm",
				controller: "tutorialController"
			}).when("/lock", {
				templateUrl: "tutorials/lock.htm",
				controller: "tutorialController"
			}).when("/spring_cloud_stream_imperative", {
				templateUrl: "tutorials/spring_cloud_stream_imperative.htm",
				controller: "tutorialController"
			}).when("/spring_cloud_stream_functional", {
				templateUrl: "tutorials/spring_cloud_stream_functional.htm",
				controller: "tutorialController"
			}).when("/spring_qualifier", {
				templateUrl: "tutorials/spring_qualifier.htm",
				controller: "tutorialController"
			}).when("/java_singleton", {
				templateUrl: "tutorials/java_singleton.htm",
				controller: "tutorialController"
			}).when("/consumer_biconsumer", {
				templateUrl: "tutorials/consumer_biconsumer.htm",
				controller: "tutorialController"
			}).when("/supplier", {
				templateUrl: "tutorials/supplier.htm",
				controller: "tutorialController"
			}).when("/function_bifunction", {
				templateUrl: "tutorials/function_bifunction.htm",
				controller: "tutorialController"
			}).when("/split_db_migrations", {
				templateUrl: "tutorials/split_db_migrations.htm",
				controller: "tutorialController"
			}).when("/java_reactive_programming", {
				templateUrl: "tutorials/java_reactive_programming.htm",
				controller: "tutorialController"
			}).when("/machine_to_machine_cognito_auth", {
				templateUrl: "tutorials/machine_to_machine_cognito_auth.htm",
				controller: "tutorialController"
			}).when("/aws_api_gw_java_client_11", {
				templateUrl: "tutorials/aws_api_gw_java_client_11.htm",
				controller: "tutorialController"
			}).otherwise("/");
	});*/

	app.config(function($stateProvider) {
		$stateProvider
		  .state('/', {
			url: "/",
			templateUrl: "about.html",
			controller: "mainCtrl"
		  })
		  .state('tutorials', {
			url: "/tutorials",
			templateUrl: "tutorials.html",
			controller: "tutorialsController"
		  })
		  .state('serialized_and_deserialized_objects', {
			url: "/serialized_and_deserialized_objects",
			templateUrl: "tutorials/serialized_and_deserialized_objects.htm",
			controller: "tutorialController"
		  })
		  .state('handling_proprties', {
			url: "handling_proprties",
			templateUrl: "tutorials/handling_proprties.htm",
			controller: "tutorialController"
		  })
  
	  })

	/*app.config(function ($routeProvider, $locationProvider) {
		$locationProvider
			.html5Mode(true)
			.hashPrefix('!');

		$routeProvider
			.when("/", {
				templateUrl: "about.html",
				controller: "mainCtrl"
			}).when("/tutorials", {
				templateUrl: "tutorials.html",
				controller: "tutorialsController",
			}).when("/serialized_and_deserialized_objects", {
				templateUrl: "tutorials/serialized_and_deserialized_objects.htm",
				controller: "tutorialController"
			}).when("/serialized_and_deserialized_objects", {
				templateUrl: "tutorials/serialized_and_deserialized_objects.htm",
				controller: "tutorialController"
			}).when("/handling_proprties", {
				templateUrl: "tutorials/handling_proprties.htm",
				controller: "tutorialController"
			}).when("/countdownlatch", {
				templateUrl: "tutorials/countdownlatch.htm",
				controller: "tutorialController"
			}).when("/lock", {
				templateUrl: "tutorials/lock.htm",
				controller: "tutorialController"
			}).when("/spring_cloud_stream_imperative", {
				templateUrl: "tutorials/spring_cloud_stream_imperative.htm",
				controller: "tutorialController"
			}).when("/spring_cloud_stream_functional", {
				templateUrl: "tutorials/spring_cloud_stream_functional.htm",
				controller: "tutorialController"
			}).when("/spring_qualifier", {
				templateUrl: "tutorials/spring_qualifier.htm",
				controller: "tutorialController"
			}).when("/java_singleton", {
				templateUrl: "tutorials/java_singleton.htm",
				controller: "tutorialController"
			}).when("/consumer_biconsumer", {
				templateUrl: "tutorials/consumer_biconsumer.htm",
				controller: "tutorialController"
			}).when("/supplier", {
				templateUrl: "tutorials/supplier.htm",
				controller: "tutorialController"
			}).when("/function_bifunction", {
				templateUrl: "tutorials/function_bifunction.htm",
				controller: "tutorialController"
			}).when("/split_db_migrations", {
				templateUrl: "tutorials/split_db_migrations.htm",
				controller: "tutorialController"
			}).when("/java_reactive_programming", {
				templateUrl: "tutorials/java_reactive_programming.htm",
				controller: "tutorialController"
			}).when("/machine_to_machine_cognito_auth", {
				templateUrl: "tutorials/machine_to_machine_cognito_auth.htm",
				controller: "tutorialController"
			}).when("/aws_api_gw_java_client_11", {
				templateUrl: "tutorials/aws_api_gw_java_client_11.htm",
				controller: "tutorialController"
			}).otherwise("/");
	});*/

	app.factory('SharedResourcesFactory', function () {
		return { isChecked: false };
	});

}(angular));