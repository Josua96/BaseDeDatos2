angular.module('adminModule').controller('insercionfallecidosCtrl', function($scope,$location,$http,peticiones){

    $scope.provincias=[];
    $scope.lesiones=[];
    $scope.roles=[];
    $scope.cantones=[];
    $scope.tiposAccidentes=[];
    $scope.rutas=[];
 
    $scope.cargarRutas=function () {
        peticiones.seleccionar("obtenerKilometrosRutas")
            .then(function (response) {
              
                console.log(response);
                //guardar los datos en el arreglo de registrados
                $scope.rutas=recorrerRespuesta(response.data,"v_kilometroruta","v_id");

                if ($scope.rutas.length==0){
                    mostrarNotificacion("No existen rutas registradas en el sistema",3);
                }

            }, function (response) {
                mostrarNotificacion("Error en la carga de rutas", 1);

            });
    };


    $scope.cargarTiposAccidentes=function () {
        peticiones.seleccionar("obtenerTiposAccidentes")
            .then(function (response) {
                
                console.log(response);
                //guardar los datos en el arreglo de registrados
                $scope.tiposAccidentes=recorrerRespuesta(response.data,"v_tipoaccidente","v_id");

                if ($scope.tiposAccidentes.length==0){
                    mostrarNotificacion("No existen tipos de accidentes registrados en el sistema",3);
                }

            }, function (response) {
                mostrarNotificacion("Error en la carga de tipos de accidentes", 1);

            });
    };
    
    $scope.cargarRoles=function () {
        peticiones.seleccionar("obtenerRolesPersonas")
            .then(function (response) {
                console.log("roles de persona obtenidos");
                console.log(response);
                //guardar los datos en el arreglo correspondiente
                $scope.roles=recorrerRespuesta(response.data,"v_rolpersona","v_id");

                if ($scope.roles.length==0){
                    mostrarNotificacion("No existen roles de persona registrados en el sistema",3);
                }

            }, function (response) {
                mostrarNotificacion("Error en la carga del rol de persona", 1);
                console.log("respuesta negativa");
                console.log(response.data.message);
            });
    };

 
    $scope.cargarCantones=function () {
        var indice=document.getElementById('prov').selectedIndex;
        if (indice==-1){
            indice=0;
        }
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


    //obtener las provincias registradas
    $scope.cargarProvincias=function () {
        peticiones.seleccionarProvincias(-1,-1)
            .then(function (response) {
                console.log(response);
                $scope.provincias=recorrerRespuesta(response.data,"v_nombreprovincia","v_id");
                $scope.cargarCantones();
            }, function (response) {
                mostrarNotificacion("Error en la carga de provincias", 1);
                console.log("respuesta negativa");
                console.log(response.data.message);
            });
    };


    $scope.insertarAccidente=function () {
        var edad=document.getElementById('edad').value;
        var rol=document.getElementById('rol').selectedIndex;
        var fecha=document.getElementById('date1').value;
        var canton=document.getElementById('cant').selectedIndex;
        var sexo= document.getElementById('sexo').selectedIndex;
        var tipoAccidente=document.getElementById('tipo').selectedIndex;
        var ruta=document.getElementById('ruta').selectedIndex;
        var inicio=document.getElementById('horaInicio').value;
        var final=document.getElementById('horaFinal').value;

        tipoAccidente=evaluarSeleccion(tipoAccidente);
        ruta=evaluarSeleccion(ruta);
        rol=evaluarSeleccion(rol);
        canton=evaluarSeleccion(canton);
        sexo=evaluarSeleccion(sexo);

        if (sexo==0){ //si es masculino
            sexo=true;
        }
        else{         //si es femenino
            sexo=false;
        }

        //realizar la peticion de insercion del accidente
        peticiones.insertarFallecido(fecha,$scope.roles[rol].id,edad,sexo,$scope.cantones[canton].id,
            inicio,final,$scope.tiposAccidentes[tipoAccidente].id,$scope.rutas[ruta].id)
            .then(function (response) {
                console.log(response);
                mostrarNotificacion("El accidente ha sido registrado",2);
                document.getElementById('edad').value="";
                document.getElementById('date1').value="";

            }, function (response) {
                mostrarNotificacion("Error en el procedimiento de inserción del accidente", 1);
                console.log(response.data.message);
            });

    };

    //carga de los datos requeridos para la insercion del accidente

    $scope.cargarRutas();
    $scope.cargarTiposAccidentes();
    $scope.cargarRoles();
    $scope.cargarProvincias();

});
