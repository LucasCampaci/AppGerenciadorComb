angular.module('app.routes', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

      .state('tabsController.inserirInformaEs', {
    url: '/page2',
    views: {
      'tab2': {
        templateUrl: 'templates/inserirInformaEs.html',
        controller: 'inserirInformaEsCtrl'
      }
    }
  })

  .state('tabsController.exibirInformaEs', {
    url: '/page3',
    views: {
      'tab3': {
        templateUrl: 'templates/exibirInformaEs.html',
        controller: 'exibirInformaEsCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true,
    controller: "TabCtrl"
  })

$urlRouterProvider.otherwise('/page1/page2');
})

.controller('TabCtrl', ['$scope', '$stateParams', '$ionicPopup','$state',

  function ($scope, $stateParams, $ionicPopup, $state) {
    function showAlert(texto){
     var alertPopup = $ionicPopup.alert({
        title:'A L E R T A',
        template: texto
     });

     alertPopup.then(function(res) {
        // Custom functionality....
     });
  }

  $scope.texto={};

  $scope.exibirInformacoes = function(){
    //showAlert("Exibindo informações armazenadas");

    var storage = window.localStorage;
    var tabela = storage.getItem("tabela");
    var informacoes = storage.getItem("tupla");
    console.log(tabela+informacoes);
    if(tabela + informacoes != 0)
    {
      $scope.texto = tabela + informacoes;
    }
    else
    {$scope.texto ="";}

    $state.go("tabsController.exibirInformaEs");
  }

}])
;
