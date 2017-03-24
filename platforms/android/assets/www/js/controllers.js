  angular.module('app.controllers', [])

  .controller('inserirInformaEsCtrl', ['$scope', '$stateParams', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
  // You can include any angular dependencies as parameters for this function
  // TIP: Access Route Parameters for your page via $stateParams.parameterName
  function ($scope, $stateParams, $ionicPopup) {

    function showAlert(texto){
     var alertPopup = $ionicPopup.alert({
        title:'A L E R T A',
        template: texto
     });

     alertPopup.then(function(res) {
        // Custom functionality....
     });
  }
    $scope.teste = function(informacao){
      try{
        var combustivel = informacao.combustivel;
        var km = informacao.km;
        var litro = informacao.litro;
        var valor = informacao.valor;

        if(combustivel == "Gasolina Aditivada")
        {
          combustivel = "Gas.Aditivada";
        }

        if(combustivel == "Gasolina Comum")
        {
          combustivel = "Gas.Comum&nbsp;&nbsp;";
        }
        if(combustivel == "Etanol")
        {
          combustivel = "Etanol&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
        }

        if(!km || !litro || !valor)
      {
          showAlert("Informe todos os campos");
        }
        else {

          var storage = window.localStorage;
          var old = storage.getItem("tupla");

          var tabela = "<div class='row'>"+
                       "<div class='col col-36'>Combustivel</div>"+
                       "<div class='col col-18'>KM</div>"+
                       "<div class='col col-14'>Litros</div>"+
                       "<div class='col col-14'>Valor</div>"+
                       "<div class='col'>Data</div></div>";

          storage.setItem("tabela", tabela);

          var data = new Date();
          var mes = data.getMonth() + 1;
          var tupla ="<div class='row'>"+
                      "<div class='col col-36'>" + combustivel + "</div>" +
                      "<div class='col col-18'>"+ km + "</div>" +
                      "<div class='col col-14'>" + litro + "</div>" +
                      "<div class='col col-14'>"+ valor + "</div>"+
                      "<div class='col'>"+ data.getDate()+"/"+
                                            mes +"/"+
                                           data.getFullYear()+ "</div></div>";

          if(old == null){
            storage.setItem("tupla", tupla);
          }
          else{
          storage.setItem("tupla", tupla + old);
          }
          showAlert("Informação inseridas!");
          //storage.removeItem("tupla");
          //$scope.reset();
          delete $scope.informacoes;
        }
      }
      catch(err){
        showAlert("Informe todos os campos");
      }
    }
  }])

  .controller('exibirInformaEsCtrl', ['$scope', '$stateParams', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
  // You can include any angular dependencies as parameters for this function
  // TIP: Access Route Parameters for your page via $stateParams.parameterName
  function ($scope, $stateParams, $ionicPopup) {

    function showAlert(texto){
     var alertPopup = $ionicPopup.alert({
        title:'A L E R T A',
        template: texto
     });

     alertPopup.then(function(res) {
        // Custom functionality....
     });
  }

    $scope.data = {};

      function showAlertFodao(texto){
     // An elaborate, custom popup
     var myPopup = $ionicPopup.show({
       template: '<input type="text" value="" ng-model="data.texto">',
       title: 'Para excluir digite: EXCLUIR',
       scope: $scope,
       buttons: [
         { text: 'Cancel' },
         {
           text: '<b>Excluir</b>',
           type: 'button-positive',
           onTap: function(e) {
             if (!$scope.data.texto) {
               showAlert("Não foi possivel excluir");
             } else {
               if($scope.data.texto == "EXCLUIR"){
               var storage = window.localStorage;
               storage.removeItem("tabela");
               storage.removeItem("tupla");

               showAlert("Dados Excluidos ! <br>Já era não tem volta.");
               $scope.data.texto = "";
              }
               else{showAlert("Não foi possivel excluir, você digitou: " + $scope.data.texto);}
               }
           }
         }
       ]
     });

    }

  $scope.excluirDados = function(){
    showAlertFodao();
  }
  }])
