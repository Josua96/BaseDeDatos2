angular.module('adminModule').controller('gestiondistritosCtrl', function($scope,$location,$http,peticiones){

    $scope.cantones=[];
    $scope.provincias=[];
    $scope.distritos=[];

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


    //realizar la insercion del distrito en la base de datos
    $scope.insertarDistrito=function () {
        var nombre = document.getElementById('nombre').value;
        //obtener canton seleccionado
        var indice=document.getElementById('selecc').selectedIndex;
        //insercion
        peticiones.insercionDistrito($scope.cantones[indice].id,nombre)
            .then(function (response) {

                mostrarNotificacion("El distrito fué registrado con éxito", 2);
                document.getElementById('nombre').value=""; //actualiza vista del campo de texto
                console.log(response);
            }, function (response) {
                mostrarNotificacion("Ocurrió un error en el registro del distrito", 1);
                console.log("respuesta negativa");
                console.log(response.data.message);
            });
    };

    //funcion para modificar un distrito
    $scope.modificarDistrito=function(){
        var nom=document.getElementById('nombre').value;
        if (nom!= ""){
            var indice=document.getElementById('selecD').selectedIndex;
            if ($scope.cantones.length==0){
                window.location.href = ('#/distritos');
                mostrarNotificacion("No existen cantones registrados para esta provincia",1);
            }
            //enviar id de la provincia seleccionada y el nuevo nombre de la misma
            peticiones.modificarD("modificarDistrito",$scope.distritos[indice].id,nom)
                .then(function (response) {

                    mostrarNotificacion("La información del distrito fue modificada con éxito", 2);
                    console.log(response);
                    document.getElementById('nombre').value=""; //actualiza vista del campo de texto
                    $scope.distritos[indice].model=nom;

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


    //seleccionar los distritos para un canton en especifico
    $scope.seleccionarDistritos=function () {
        if ($scope.provincias.length == 0){
            mostrarNotificacion("No existen provincas registradas en el sistema",1);
            window.location.href = ('#/distritos');
        }
        var indice=document.getElementById('selecc').selectedIndex;
        if (indice==-1){
            indice=0;
        }
        peticiones.seleccionarDistritos(-1,$scope.cantones[indice].id,-1)
          .then(function (response) {
              console.log("distritos obtenidos");
              console.log(response);
              //guardar los datos en el arreglo distritos
              $scope.distritos=recorrerRespuesta(response.data,"v_nombredistrito","v_id");

          }, function (response) {
              mostrarNotificacion("Error en la carga de distritos", 1);
              console.log("respuesta negativa");
              console.log(response.data.message);
          });
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
            mostrarNotificacion("No existen provincas registradas en el sistema",1);
            window.location.href = ('#/distritos');
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
                //si no se realizará la insercion de un distrito, cargar los distritos
                if (window.location.href.indexOf('insertarDistrito')==-1){
                    $scope.seleccionarDistritos();
                }
            }, function (response) {
                mostrarNotificacion("Error en la carga de cantones", 1);
                console.log("respuesta negativa");
                console.log(response.data.message);
            });

    };


    $scope.eliminarDistrito=function () {
        var indice=document.getElementById('selecD').selectedIndex;
        if ($scope.distritos.length==0){
            mostrarNotificacion("No existen cantones registrados para esta provincia",1);
            window.location.href = ('#/distritos');
        }

        peticiones.eliminarD("eliminarDistrito",$scope.distritos[indice].id)
            .then(function (response) {
                console.log(response);
                mostrarNotificacion("El distrito ha sido eliminado",2);
                $scope.distritos.splice(indice,1); //actualizar el select

            }, function (response) {
                mostrarNotificacion("El distrito no pudo ser eliminado", 1);
                console.log("respuesta negativa");
                console.log(response.data.message);
            });
    };


    if ((window.location.href.indexOf('modificarDistrito')!=-1)||(window.location.href.indexOf('eliminarDistrito')!=-1)
        ||(window.location.href.indexOf('insertarDistrito')!=-1)){
        $scope.seleccionarProvincia();

    }

});