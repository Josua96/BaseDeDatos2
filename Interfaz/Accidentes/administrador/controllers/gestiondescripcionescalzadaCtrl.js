angular.module('adminModule').controller('gestiondescripcionescalzadaCtrl', function($scope,$location,$http,peticiones){

    $scope.registrados=[]; //contendrá la lista de tipos de circulacion que se encuentran registrados en el sistema


    $scope.obtenerSeleccionada=function (selected) {
        if (selected===0){
            window.location.href = ('#/insertarDescripcionCalzada');
        }
        else if(selected===1){
            window.location.href = ('#/modificarDescripcionCalzada');
        }
        else{
            window.location.href = ('#/eliminarDescripcionCalzada');
        }
      

    };


    //realizar la insercion del tipo de circulacion en la base de datos
    $scope.insertarDescripcionCalzada=function () {
        var nombre = document.getElementById('nombre').value;
        //insercion
        peticiones.insertar("insertarDescripcionCalzada",nombre)
            .then(function (response) {
                mostrarNotificacion("La descripción de calzada fué registrada con éxito", 2);
                document.getElementById('nombre').value=""; //actualiza vista del campo de texto

            }, function (response) {
                mostrarNotificacion("Ocurrió un error en el registro de la nueva descripcion de calzada", 1);
         
            });
    };


    //funcion para modificar informacion de una descripción de calzada
    $scope.modificarDescripcionCalzada=function(){
        var nom=document.getElementById('nombre').value;

        var indice=document.getElementById('selec').selectedIndex;
        if (indice==-1){
            indice=0;
        }


        //enviar id de la descripcion de calzada y el nuevo nombre del mismo
        peticiones.modificar("modificarDescripcionCalzada",$scope.registrados[indice].id,nom)
            .then(function (response) {
                mostrarNotificacion("La información de la descripción de calzada fue modificada con éxito", 2);
    
                document.getElementById('nombre').value=""; //actualiza vista del campo de texto
                $scope.registrados[indice].model=nom;

            }, function (response) {
                mostrarNotificacion("Error en la modificación de la información", 1);
        
            });
    };

    //seleccionar las descripciones de calzada registradas en el sistema
    $scope.seleccionarDescripcionesCalzadas=function () {

        peticiones.seleccionar("obtenerDescripcionesCalzadas")
            .then(function (response) {

                //guardar los datos en el arreglo de registrados
                $scope.registrados=recorrerRespuesta(response.data,"v_descripcioncalzada","v_id");

                if ($scope.registrados.length==0){
                    mostrarNotificacion("No existen descripciones de calzada registradas en el sistema",3);
                }

            }, function (response) {
                mostrarNotificacion("Error en la carga de descripciones de calzada", 1);

            });
    };

    $scope.eliminarDescripcionCalzada=function () {
        var indice=document.getElementById('selec').selectedIndex;
        console.log("indice... "+indice);
        peticiones.eliminar("eliminarDescripcionCalzada",$scope.registrados[indice].id)
            .then(function (response) {
                console.log(response);
                mostrarNotificacion("La descripción de calzada ha sido eliminada",2);
                $scope.registrados.splice(indice,1); //actualizar el select

            }, function (response) {
                mostrarNotificacion("La descripción de calzada no pudo ser eliminada", 1);
                console.log("respuesta negativa");
                console.log(response.data.message);
            });
    };


    if ((window.location.href.indexOf('modificarDescripcionCalzada')!=-1)||(window.location.href.indexOf('eliminarDescripcionCalzada')!=-1)){
        $scope.seleccionarDescripcionesCalzadas();
    }

});
