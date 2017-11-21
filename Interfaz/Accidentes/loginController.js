var app = angular.module('loginModule',["ngRoute","ngResource"]);
app.controller('loginController',function($scope, $http,peticiones)
{

        $scope.login=function () {

            var usuario=document.getElementById('inputUsuario').value;
            var codigo=document.getElementById('inputContraseña').value;
            peticiones.autenticar(usuario,codigo)
                .then(function (response) {
                    //redireccion a la vista correspondiente
                    window.location.href = ('administrador/MainView.html');
                }, function (response) {

                    //fallo en la autenticacion
                    mostrarNotificacion("Por favor verifique que los datos ingresados correspondan a un usuario válido",1)
                });

    };
    
    

    
});