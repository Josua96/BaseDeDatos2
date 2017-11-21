angular.module('adminModule').controller('gestionheridosCtrl', function($scope,$location,$http,peticiones){

    $scope.provincias=[];
    $scope.lesiones=[];
    $scope.roles=[];
    $scope.cantones=[];
    $scope.distritos=[];

    $scope.tiposAccidentes=[];

    $scope.heridos = [];
    $scope.heridosAux = [];
    $scope.inicioArray = 0;

    $scope.obtenerSeleccionada=function (selected) {
        if (selected === 0){
            window.location.href = ('#/insertarHeridos');
        }
        
        else{
            window.location.href = ('#/mostrarHeridos');
        }

    };

    $scope.eliminar = function (registro) {

        peticiones.eliminarD("eliminarHeridos",$scope.heridosAux[registro]["idaccidente"])
            .then(function (response) {
                console.log(response);
                $scope.heridosAux.splice(registro,1);
                mostrarNotificacion("El fallecido ha sido eliminado correctamente.",2);

            }, function (response) {
                mostrarNotificacion("Error en la eliminación del fallecido.", 1);
                console.log(response.data.message);
            });
    };
    $scope.obtenerHeridos = function () {
        peticiones.seleccionar("obtenerHeridos")
            .then(function (response) {
                console.log("Todo: "+response);

                $scope.heridos=response.data;
                $scope.heridosAux = $scope.heridos.splice($scope.inicioArray,11);
                if ($scope.fallecidos.length === 0){
                    mostrarNotificacion("No existen heridos registrados en el sistema",3);
                }
            }, function (response) {
                mostrarNotificacion("Error en la carga de heridos", 1);
            });
    };

    $scope.actualizarArreglo = function (op) {
        $scope.heridosAux.splice(0,$scope.heridosAux.length);
        if(op === 1){
            if($scope.inicioArray - 11 >= 0){
                $scope.inicioArray -= 11;
                console.log("1. "+$scope.inicioArray);
                $scope.heridosAux = $scope.heridos.splice($scope.inicioArray,11);
            }
        }
        else{
            if($scope.inicioArray + 11 < $scope.heridos.length){
                $scope.inicioArray += 11;
                console.log("2. "+$scope.inicioArray);
                $scope.heridosAux = $scope.heridos.splice($scope.inicioArray,11);
            }
        }
        console.log($scope.heridosAux);
    };

    //carga de lesiones registradas
    $scope.cargarLesiones=function () {
        peticiones.seleccionar("obtenerTiposLesiones")
            .then(function (response) {
                console.log("estados del tiempo obtenidos");
                console.log(response);
                //guardar los datos en el arreglo correspondiente
                $scope.lesiones=recorrerRespuesta(response.data,"v_tipolesion","v_id");

                if ($scope.lesiones.length === 0){
                    mostrarNotificacion("No existen tipos de lesiones registradas en el sistema",3);
                }

            }, function (response) {
                mostrarNotificacion("Error en la carga de tipos de lesiones", 1);

            });
    };

    $scope.cargarRoles=function () {
            peticiones.seleccionar("obtenerRolesPersonas")
            .then(function (response) {
                console.log("roles de persona obtenidos");
                console.log(response);
                //guardar los datos en el arreglo correspondiente
                $scope.roles=recorrerRespuesta(response.data,"v_rolpersona","v_id");

                if ($scope.roles.length === 0){
                    mostrarNotificacion("No existen roles de persona registrados en el sistema",3);
                }

            }, function (response) {
                mostrarNotificacion("Error en la carga del rol de persona", 1);
                console.log("respuesta negativa");
                console.log(response.data.message);
            });
    };

    $scope.cargarDistritos=function () {
        var indice=document.getElementById('cant').selectedIndex;
        if (indice === -1){
            indice=0;
        }
        peticiones.seleccionarDistritos(-1,$scope.cantones[indice].id,-1)
            .then(function (response) {
                console.log("distritos obtenidos");
                console.log(response);
                //guardar los datos en el arreglo correspondiente
                $scope.distritos=recorrerRespuesta(response.data,"v_nombredistrito","v_id");

            }, function (response) {
                mostrarNotificacion("Error en la carga de distritos", 1);
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
                $scope.cargarDistritos();
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
      var lesion=document.getElementById('lesion').selectedIndex;
      var rol=document.getElementById('rol').selectedIndex;
      var fecha=document.getElementById('date1').value;
      var distrito=document.getElementById('dist').selectedIndex;
      var sexo= document.getElementById('sexo').selectedIndex;

      lesion=evaluarSeleccion(lesion);
      rol=evaluarSeleccion(rol);
      distrito=evaluarSeleccion(distrito);
      sexo=evaluarSeleccion(sexo);

      if (sexo === 0){ //si es masculino
        sexo=true;
      }
      else{         //si es femenino
        sexo = false;
      }

        //realizar la peticion de insercion del accidente
      peticiones.insertarHerido($scope.lesiones[lesion].id,fecha,$scope.roles[rol].id,edad,sexo,$scope.distritos[distrito].id)
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
    
    $scope.retornaGenero=function (genero) {
      if (genero==true){
          return 'Masculino';
      }  
        else{
          return 'Femenino';
      }
    };
    

    if (window.location.href.indexOf('insertarHeridos')!=-1){
        $scope.cargarLesiones();
        $scope.cargarRoles();
        $scope.cargarProvincias();
    }
    if (window.location.href.indexOf('mostrarHeridos')!=-1) {
        $scope.obtenerHeridos();
    }
});
