angular.module('adminModule').controller('gestionrolespersonaCtrl', function($scope,$location,$http,peticiones){

    $scope.registrados=[]; //contendrá la lista de roles de persona  que se encuentran registrados en el sistema


    $scope.obtenerSeleccionada=function (selected) {
        console.log("entro");
        if (selected===0){
            window.location.href = ('#/insertarRolPersona');
        }
        else if(selected===1){
            window.location.href = ('#/modificarRolPersona');
        }
        else{
            window.location.href = ('#/eliminarRolPersona');
        }
        

    };
    
    
    //realizar la insercion del Rol Persona en la base de datos
    $scope.insertarRolPersona=function () {
        var nombre = document.getElementById('nombre').value;
        //insercion
        peticiones.insertar("insertarRolPersona",nombre)
            .then(function (response) {
                mostrarNotificacion("El rol de persona fué registrado con éxito", 2);
                document.getElementById('nombre').value=""; //actualiza vista del campo de texto
                
            }, function (response) {
                mostrarNotificacion("Ocurrió un error en el registro del rol persona", 1);
                console.log("respuesta negativa");
                console.log(response.data.message);
            });
    };


    //funcion para modificar informacion de un Rol Persona
    $scope.modificarRolPersona=function(){
        var nom=document.getElementById('nombre').value;

        var indice=document.getElementById('selec').selectedIndex;
        if (indice==-1){
            indice=0;
        }

        //enviar id del tipo de circulacion y el nuevo nombre del mismo
        peticiones.modificar("modificarRolPersona",$scope.registrados[indice].id,nom)
            .then(function (response) {
                mostrarNotificacion("La información del rol de persona fue modificada con éxito", 2);
                console.log(response);
                document.getElementById('nombre').value=""; //actualiza vista del campo de texto
                $scope.registrados[indice].model=nom;

            }, function (response) {
                mostrarNotificacion("Error en la modificación de la información", 1);
                console.log("respuesta negativa");
                console.log(response.data.message);
            });
    };


    //seleccionar los Roles Persona registrados
    $scope.seleccionarRolPersona=function () {
        
        peticiones.seleccionar("obtenerRolesPersonas")
            .then(function (response) {
                console.log("roles de persona obtenidos");
                console.log(response);
                //guardar los datos en el arreglo de registrados
                $scope.registrados=recorrerRespuesta(response.data,"v_rolpersona","v_id");

                if ($scope.registrados.length==0){
                    mostrarNotificacion("No existen roles de persona registrados en el sistema",3);
                }

            }, function (response) {
                mostrarNotificacion("Error en la carga del rol de persona", 1);
                console.log("respuesta negativa");
                console.log(response.data.message);
            });
    };

    $scope.eliminarRolPersona=function () {
        var indice=document.getElementById('selec').selectedIndex;
        console.log("indice... "+indice);
        peticiones.eliminar("eliminarRolPersona",$scope.registrados[indice].id)
            .then(function (response) {
                console.log(response);
                mostrarNotificacion("El rol de persona ha sido eliminado",2);
                $scope.registrados.splice(indice,1); //actualizar el select

            }, function (response) {
                mostrarNotificacion("El rol de persona no pudo ser eliminado", 1);
                console.log("respuesta negativa");
                console.log(response.data.message);
            });
    };


    if ((window.location.href.indexOf('modificarRolPersona')!=-1)||(window.location.href.indexOf('eliminarRolPersona')!=-1)){
        $scope.seleccionarRolPersona();
    }

});