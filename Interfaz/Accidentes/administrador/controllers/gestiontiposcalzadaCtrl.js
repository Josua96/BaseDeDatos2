angular.module('adminModule').controller('gestiontiposcalzadaCtrl', function($scope,$location,$http,peticiones){

    $scope.registrados=[]; //contendrá la lista de tipos de calzada que se encuentran registrados en el sistema


    $scope.obtenerSeleccionada=function (selected) {
        console.log("entro");
        if (selected===0){
            window.location.href = ('#/insertarTipoCalzada');
        }
        else if(selected===1){
            window.location.href = ('#/modificarTipoCalzada');
        }
        else if(selected===2){
            window.location.href = ('#/eliminarTipoCalzada');
        }
        else{

        }

    };
    
    
    //realizar la insercion del tipo de calzada en la base de datos
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


    //funcion para modificar informacion de un tipo de calzada
    $scope.modificarTipoCalzada=function(){
        var nom=document.getElementById('nombre').value;

        var indice=document.getElementById('selec').selectedIndex;
        if (indice==-1){
            indice=0;
        }

        //enviar id del tipo de calzada y el nuevo nombre del mismo
        peticiones.modificar("modificarTipoCalzada",$scope.registrados[indice].id,nom)
            .then(function (response) {
                mostrarNotificacion("La información del tipo de calzada fue modificada con éxito", 2);
                console.log(response);
                document.getElementById('nombre').value=""; //actualiza vista del campo de texto
                $scope.registrados[indice].model=nom;

            }, function (response) {
                mostrarNotificacion("Error en la modificación de la información", 1);
                console.log("respuesta negativa");
                console.log(response.data.message);
            });
    };


    //seleccionar los tipos de calzadas registrados
    $scope.seleccionarTipoCalzada=function () {
        
        peticiones.seleccionar("obtenerTiposCalzadas")
            .then(function (response) {
                console.log("tipos de circulación obtenidos");
                console.log(response);
                //guardar los datos en el arreglo de registrados
                $scope.registrados=recorrerRespuesta(response.data,"v_tipocirculacion","v_id");

                if ($scope.registrados.length==0){
                    mostrarNotificacion("No existen tipos de calzada registrados en el sistema",3);
                }

            }, function (response) {
                mostrarNotificacion("Error en la carga de tipos de circulación", 1);
                console.log("respuesta negativa");
                console.log(response.data.message);
            });
    };

    $scope.eliminarTipoCalzada=function () {
        var indice=document.getElementById('selec').selectedIndex;
        console.log("indice... "+indice);
        peticiones.eliminar("eliminarTipoCalzada",$scope.registrados[indice].id)
            .then(function (response) {
                console.log(response);
                mostrarNotificacion("El tipo de circulación ha sido eliminado",2);
                $scope.registrados.splice(indice,1); //actualizar el select

            }, function (response) {
                mostrarNotificacion("El tipo de circulación no pudo ser eliminado", 1);
                console.log("respuesta negativa");
                console.log(response.data.message);
            });
    };


    if ((window.location.href.indexOf('modificarTipoCalzada')!=-1)||(window.location.href.indexOf('eliminarTipoCalzada')!=-1)){
        $scope.seleccionarTipoCalzada();
    }

});