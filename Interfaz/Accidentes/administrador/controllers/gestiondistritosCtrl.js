angular.module('adminModule').controller('gestiondistritosCtrl', function($scope,$location,$http,peticiones){

    $scope.cantones=[];
    $scope.provincias=[];

    $scope.obtenerSeleccionada=function (selected) {
        if (selected===0){
            window.location.href = ('#/insertarDistrito');
        }
        else if(selected===1){
            window.location.href = ('#/modificarDistrito');
        }
        else if(selected===2){
            window.location.href = ('#/eliminarDistrito');
        }
        else{

        }

    };



    $scope.insertarCanton=function () {
        var nombre = document.getElementById('nombre').value;
        var indice=document.getElementById("selec").selectedIndex;

        //insercion
        peticiones.insercionCanton($scope.provincias[indice].id,nombre)
            .then(function (response) {

                mostrarNotificacion("El cantón fué registrado con éxito", 2);
                document.getElementById('nombre').value=""; //actualiza vista del campo de texto
                console.log(response);
            }, function (response) {
                mostrarNotificacion("Ocurrió un error en el registro del cantón", 1);
                console.log("respuesta negativa");
                console.log(response.data.message);
            });
    };

    //funcion para modificar una provincia
    $scope.modificarCanton=function(){
        var nom=document.getElementById('nombre').value;
        if (nom!= ""){
            var indice=document.getElementById('selecc').selectedIndex;
            if ($scope.cantones.length==0){
                window.location.href = ('#/cantones');
                mostrarNotificacion("No existen cantones registrados para esta provincia",1);
            }
            //enviar id de la provincia seleccionada y el nuevo nombre de la misma
            peticiones.modificarD("modificarCanton",$scope.cantones[indice].id,nom)
                .then(function (response) {

                    mostrarNotificacion("La información del cantón fue modificada con éxito", 2);
                    console.log(response);
                    document.getElementById('nombre').value=""; //actualiza vista del campo de texto
                }, function (response) {
                    mostrarNotificacion("Error en la modificación", 1);
                    console.log("respuesta negativa");
                    console.log(response.data.message);
                });
        }
        else{
            mostrarNotificacion("Debe ingresar el nuevo nombre para el canton",1);
        }
    };

    $scope.seleccionarProvincia=function () {
        peticiones.seleccionarProvincias(-1,-1)
            .then(function (response) {
                console.log(response);
                $scope.provincias=recorrerRespuesta(response.data,"v_nombreprovincia","v_id");

                $scope.seleccionarCantones(); //inicialzar los cantones por primera vez
            }, function (response) {
                mostrarNotificacion("Error en la carga de provincias", 1);
                console.log("respuesta negativa");
                console.log(response.data.message);
            });
    };

    $scope.seleccionarCantones=function () {
        if ($scope.provincias.length == 0){
            window.location.href = ('#/cantones');
            mostrarNotificacion("No existen provincas registradas en el sistema",1);
        }
        var indice=document.getElementById('selec').selectedIndex;
        if (indice==-1){
            indice=0;
        }
        console.log("provincia seleccionada.. " + indice);
        peticiones.seleccionarCantones($scope.provincias[indice].id, -1, -1)
            .then(function (response) {
                console.log(response);
                $scope.cantones = recorrerRespuesta(response.data, "v_nombrecanton", "v_id");
            }, function (response) {
                mostrarNotificacion("Error en la carga de cantones", 1);
                console.log("respuesta negativa");
                console.log(response.data.message);
            });

    };


    $scope.eliminarCanton=function () {
        var indice=document.getElementById('selecc').selectedIndex;
        if ($scope.cantones.length==0){
            window.location.href = ('#/cantones');
            mostrarNotificacion("No existen cantones registrados para esta provincia",1);
        }

        peticiones.eliminarD("eliminarCanton",$scope.cantones[indice].id)
            .then(function (response) {
                console.log(response);
                mostrarNotificacion("El canton ha sido eliminado",2);
                $scope.cantones.splice(indice,1); //actualizar el select

            }, function (response) {
                mostrarNotificacion("El cantón no pudo ser eliminado", 1);
                console.log("respuesta negativa");
                console.log(response.data.message);
            });
    };


    if ((window.location.href.indexOf('modificarCanton')!=-1)||(window.location.href.indexOf('eliminarCanton')!=-1)
        ||(window.location.href.indexOf('insertarCanton')!=-1)){
        $scope.seleccionarProvincia();

    }

});