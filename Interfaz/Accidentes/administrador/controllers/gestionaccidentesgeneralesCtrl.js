angular.module('adminModule').controller('gestionaccidentesgeneralesCtrl', function($scope,$location,$http,peticiones) {
    $scope.registrados=[];

    $scope.obtenerSeleccionada=function (selected) {
        console.log("entro");
        if (selected===0){
            window.location.href = ('#/insertarAccidenteGeneral');
        }
        else if(selected===1){
            window.location.href = ('#/modificarTipoAccidente');
        }
        else if(selected===2){
            window.location.href = ('#/eliminarTipoAccidente');
        }
        else{

        }
    };

    $scope.insertarTipoCalzada=function () {
        var nombre = document.getElementById('nombre').value;
        //insercion
        peticiones.insertar("insertarTipoCalzada",nombre)
            .then(function (response) {
                mostrarNotificacion("El tipo de calzada fué registrado con éxito", 2);
                document.getElementById('nombre').value=""; //actualiza vista del campo de texto

            }, function (response) {
                mostrarNotificacion("Ocurrió un error en el registro del tipo de calzada", 1);
                console.log("respuesta negativa");
                console.log(response.data.message);
            });
    };
    
    $scope.cargarDatos = function () {
        
    }
    
    
    
});