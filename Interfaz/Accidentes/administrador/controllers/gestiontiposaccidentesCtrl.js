angular.module('adminModule').controller('gestiontiposaccidentesCtrl', function($scope,$location,$http,peticiones){

    $scope.registrados=[]; //contendrá la lista de tipos de accidentes que se encuentran registrados en el sistema


    $scope.obtenerSeleccionada=function (selected) {
        console.log("entro");
        if (selected===0){
            window.location.href = ('#/insertarTipoAccidente');
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
    
    
    //realizar la insercion del tipo de accidente en la base de datos
    $scope.insertarTipoAccidente=function () {
        var nombre = document.getElementById('nombre').value;
        //insercion
        peticiones.insertar("insertarTipoAccidente",nombre)
            .then(function (response) {
                mostrarNotificacion("El tipo de accidente fué registrado con éxito", 2);
                document.getElementById('nombre').value=""; //actualiza vista del campo de texto
                
            }, function (response) {
                mostrarNotificacion("Ocurrió un error en el registro del tipo de accidente", 1);
                console.log("respuesta negativa");
                console.log(response.data.message);
            });
    };


    //funcion para modificar informacion de un tipo de accidente
    $scope.modificarTipoAccidente=function(){
        var nom=document.getElementById('nombre').value;

        var indice=document.getElementById('selec').selectedIndex;
        if (indice==-1){
            indice=0;
        }

        //enviar id del tipo de accidente y el nuevo nombre del mismo
        peticiones.modificar("modificarTipoAccidente",$scope.registrados[indice].id,nom)
            .then(function (response) {
                mostrarNotificacion("La información del tipo de accidente fue modificada con éxito", 2);
                console.log(response);
                document.getElementById('nombre').value=""; //actualiza vista del campo de texto
                $scope.registrados[indice].model=nom;

            }, function (response) {
                mostrarNotificacion("Error en la modificación de la información", 1);
                console.log("respuesta negativa");
                console.log(response.data.message);
            });
    };


    //seleccionar los tipos de accidente registrados
    $scope.seleccionarTipoAccidente=function () {
        
        peticiones.seleccionar("obtenerTiposAccidentes")
            .then(function (response) {
                console.log("tipos de accidentes obtenidos");
                console.log(response);
                //guardar los datos en el arreglo de registrados
                $scope.registrados=recorrerRespuesta(response.data,"v_tipoaccidente","v_id");

                if ($scope.registrados.length==0){
                    mostrarNotificacion("No existen tipos de accidente registrados en el sistema",3);
                }

            }, function (response) {
                mostrarNotificacion("Error en la carga de tipos de accidente", 1);
                console.log("respuesta negativa");
                console.log(response.data.message);
            });
    };

    $scope.eliminarTipoAccidente=function () {
        var indice=document.getElementById('selec').selectedIndex;
        console.log("indice... "+indice);
        peticiones.eliminar("eliminarTipoAccidente",$scope.registrados[indice].id)
            .then(function (response) {
                console.log(response);
                mostrarNotificacion("El tipo de accidente ha sido eliminado",2);
                $scope.registrados.splice(indice,1); //actualizar el select

            }, function (response) {
                mostrarNotificacion("El tipo de accidente no pudo ser eliminado", 1);
                console.log("respuesta negativa");
                console.log(response.data.message);
            });
    };

    if ((window.location.href.indexOf('modificarTipoAccidente')!=-1)||(window.location.href.indexOf('eliminarTipoAccidente')!=-1)){
        $scope.seleccionarTipoAccidente();
    }

});