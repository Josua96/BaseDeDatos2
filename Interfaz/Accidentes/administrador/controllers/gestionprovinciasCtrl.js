angular.module('adminModule').controller('gestionprovinciasCtrl', function($scope,$location,$http,peticiones){

    $scope.provincias=[];

    $scope.obtenerSeleccionada=function (selected) {
        if (selected===0){
            window.location.href = ('#/insertarProvincia');
        }
        else if(selected===1){
            window.location.href = ('#/modificarProvincia');
        }
        else if(selected===2){
            window.location.href = ('#/eliminarProvincia');
        }
        else{
            
        }

    };



    $scope.insertarProvincia=function () {
        var nombre = document.getElementById('nombre').value;

        //insercion
        peticiones.insercionProvincia(nombre)
            .then(function (response) {

                mostrarNotificacion("La provincia fué registrada con éxito", 2);
                console.log(response);
            }, function (response) {
                mostrarNotificacion("Ocurrió un error en el registro de la provincia", 1);
                console.log("respuesta negativa");
                console.log(response.data.message);
            });
    };

    //funcion para modificar una provincia
    $scope.modificarProvincia=function(){
        if ($scope.provincias.length == 0){
            window.location.href = ('#/provincias');
            mostrarNotificacion("No existen provincas registradas en el sistema",1);
        }
        var nom=document.getElementById('nombre').value;
        console.log("nombre value.. "+ nom);
        if (nom!= ""){
            var indice=document.getElementById('selec').selectedIndex;
            
            //enviar id de la provincia seleccionada y el nuevo nombre de la misma
            peticiones.modificarD("modificarProvincia",$scope.provincias[indice].id,nom)
                .then(function (response) {
                    
                    mostrarNotificacion("La información de la provincia fue modificada con éxito", 2);
                    console.log(response);
                    document.getElementById('nombre').value="";
                    $scope.provincias[indice].model=nom;
                }, function (response) {
                    mostrarNotificacion("Error en la modificación", 1);
                    console.log("respuesta negativa");
                    console.log(response.data.message);
                });
        }
        else{
            mostrarNotificacion("Debe ingresar el nuevo nombre para la provincia",1);
        }
    };
    
     $scope.seleccionarProvincia=function () {

         peticiones.seleccionarProvincias(-1,-1)
             .then(function (response) {
                 console.log(response);
                 $scope.provincias=recorrerRespuesta(response.data,"v_nombreprovincia","v_id");
             }, function (response) {
                 mostrarNotificacion("Error en la carga de provincias", 1);
                 console.log("respuesta negativa");
                 console.log(response.data.message);
             });
     };

    $scope.eliminarProvincia=function () {
        var indice=document.getElementById('selec').selectedIndex;
        peticiones.eliminarD("eliminarProvincia",$scope.provincias[indice].id)
            .then(function (response) {
                console.log(response);
                mostrarNotificacion("La provincia ha sido eliminada",2);
                $scope.provincias.splice(indice,1); //actualizar el select
                
            }, function (response) {
                mostrarNotificacion("Error en la eliminación de provincias", 1);
                console.log("respuesta negativa");
                console.log(response.data.message);
            });
    };
    
    if ((window.location.href.indexOf('modificarProvincia')!=-1)||(window.location.href.indexOf('eliminarProvincia')!=-1)){
        $scope.seleccionarProvincia();
        document.getElementById('selec').selectedIndex=0;
    }

});