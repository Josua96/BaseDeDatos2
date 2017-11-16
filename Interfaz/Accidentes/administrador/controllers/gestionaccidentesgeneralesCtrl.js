
angular.module('adminModule').controller('gestionaccidentesgeneralesCtrl', function($scope,$location,$http,peticiones) {

    $scope.provincias = [];
    $scope.cantones = [];
    $scope.distritos = [];
    $scope.areaGeo = ['Rural','Urbano','Otros'];
    $scope.tipoRuta = ['Nacional','Cantonal','Desconocida'];
    $scope.tipoCirculacion = [];
    $scope.estadoTiempo = [];
    $scope.tipoCalzada = [];
    $scope.descripcionCalzada = [];
    $scope.tipoAccidente = [];
    $scope.tipoCalzada = [];
    $scope.kilometro = [];
    $scope.tipoLesion = [];

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

    $scope.seleccionarProvincia=function () {
        peticiones.seleccionarProvincias(-1,-1)
            .then(function (response) {
                $scope.provincias=recorrerRespuesta(response.data,"v_nombreprovincia","v_id");

            }, function (response) {
                mostrarNotificacion("Error en la carga de provincias", 1);
            });
    };

    $scope.seleccionarCantones=function () {
        var indice=document.getElementById('provincia').selectedIndex;
        if (indice==-1){
            indice=0;
        }
        var indice = document.getElementById('provincia').selectedIndex;
        peticiones.seleccionarCantones($scope.provincias[indice].id, -1, -1)
            .then(function (response) {
                $scope.cantones = recorrerRespuesta(response.data, "v_nombrecanton", "v_id");
            }, function (response) {
                mostrarNotificacion("Error en la carga de cantones", 1);
            });
    };

    $scope.seleccionarDistritos=function () {
        var indice=document.getElementById('canton').selectedIndex;
        if (indice==-1){
            indice=0;
        }
        peticiones.seleccionarDistritos(-1,$scope.cantones[indice].id,-1)
            .then(function (response) {
                //guardar los datos en el arreglo distritos
                $scope.distritos=recorrerRespuesta(response.data,"v_nombredistrito","v_id");

            }, function (response) {
                mostrarNotificacion("Error en la carga de distritos", 1);
            });
    };

    $scope.seleccionarTiposCirculacion=function () {
        peticiones.seleccionar("obtenerTiposCirculacion")
            .then(function (response) {
                //guardar los datos en el arreglo de registrados
                $scope.tipoCirculacion = recorrerRespuesta(response.data,"v_tipocirculacion","v_id");

            }, function (response) {
                mostrarNotificacion("Error en la carga de tipos de circulación", 1);
            });
    };

    $scope.seleccionarEstadosTiempo=function () {

        peticiones.seleccionar("obtenerEstadosTiempo")
            .then(function (response) {
                //guardar los datos en el arreglo de registrados
                $scope.estadoTiempo = recorrerRespuesta(response.data,"v_estadotiempo","v_id");

            }, function (response) {
                mostrarNotificacion("Error en la carga de estados tiempo", 1);
            });
    };

    $scope.seleccionarTipoCalzada=function () {
        peticiones.seleccionar("obtenerTiposCalzadas")
            .then(function (response) {
                //guardar los datos en el arreglo de registrados
                $scope.tipoCalzada = recorrerRespuesta(response.data,"v_tipocalzada","v_id");
            }, function (response) {
                mostrarNotificacion("Error en la carga de tipos de circulación", 1);
            });
    };

    $scope.seleccionarDescripcionesCalzadas=function () {
        peticiones.seleccionar("obtenerDescripcionesCalzadas")
            .then(function (response) {
                //guardar los datos en el arreglo de registrados
                $scope.descripcionCalzada = recorrerRespuesta(response.data,"v_descripcioncalzada","v_id");

            }, function (response) {
                mostrarNotificacion("Error en la carga de descripciones de calzada", 1);
            });
    };

    $scope.seleccionarTipoAccidente=function () {
        peticiones.seleccionar("obtenerTiposAccidentes")
            .then(function (response) {
                //guardar los datos en el arreglo de registrados
                $scope.tipoAccidente=recorrerRespuesta(response.data,"v_tipoaccidente","v_id");

            }, function (response) {
                mostrarNotificacion("Error en la carga de tipos de accidente", 1);
            });
    };

    $scope.seleccionarKilometroRuta=function () {
        peticiones.seleccionar("obtenerKilometrosRutas")
            .then(function (response) {
                $scope.kilometro = recorrerRespuesta(response.data,"v_kilometroruta","v_id");
            }, function (response) {
                mostrarNotificacion("Error en la carga del kilometro-ruta", 1);
            });
    };

    $scope.seleccionarTiposLesiones=function () {
        peticiones.seleccionar("obtenerTiposLesiones")
            .then(function (response) {
                //guardar los datos en el arreglo de registrados
                $scope.tipoLesion = recorrerRespuesta(response.data,"v_tipolesion","v_id");
            }, function (response) {
                mostrarNotificacion("Error en la carga de tipos de lesiones", 1);
            });
    };

    $scope.insertarAccidenteGeneral = function () {
        var horaInicio = document.getElementById("horaInicio").value;

        var horaFinal = document.getElementById("horaFinal").value;

        var areaGeo;
        if(document.getElementById("areaGeografica").selectedIndex == -1){
            alert("Error con el area geografica seleccionada");
            return;
        }
        else if(document.getElementById("areaGeografica").selectedIndex == 0)
            areaGeo = 'R';
        else if(document.getElementById("areaGeografica").selectedIndex == 1)
            areaGeo = 'U';
        else
            areaGeo = 'O';

        var distrito;
        if (document.getElementById("distrito").selectedIndex == -1){
            alert("Error con el distrito seleccionado");
            return;
        }
        else
            distrito = $scope.distritos[document.getElementById("distrito").selectedIndex].id;


        var tipoRutas;
        if(document.getElementById("tipoRuta").selectedIndex == -1){
            alert("Error con el tipo de ruta seleccionada");
            return;
        }
        else if(document.getElementById("tipoRuta").selectedIndex == 0)
            tipoRutas = 'N';
        else if(document.getElementById("tipoRuta").selectedIndex == 1)
            tipoRutas = 'C';
        else
            tipoRutas = 'D';


        var tipoCirculacion;
        if (document.getElementById("tipoCirculacion").selectedIndex == -1){
            alert("Error con el tipo de circulacion seleccionada");
            return;
        }
        else
            tipoCirculacion = $scope.tipoCirculacion[document.getElementById("tipoCirculacion").selectedIndex].id;

        var estadoTiempo;
        if (document.getElementById("estadoTiempo").selectedIndex == -1){
            alert("Error con el estado tiempo seleccionado");
            return;
        }
        else
            estadoTiempo = $scope.estadoTiempo[document.getElementById("estadoTiempo").selectedIndex].id;

        var tipoCalzada;
        if (document.getElementById("tipoCalzada").selectedIndex == -1){
            alert("Error con el tipo de calzada seleccionada");
            return;
        }
        else
            tipoCalzada = $scope.tipoCalzada[document.getElementById("tipoCalzada").selectedIndex].id;

        var descripcionCalzadaV;
        if (document.getElementById("descripcionCalzadaVertical").selectedIndex == -1){
            alert("Error con la descripcion calzada vertical seleccionada");
            return;
        }
        else
            descripcionCalzadaV = $scope.descripcionCalzada[document.getElementById("descripcionCalzadaVertical").selectedIndex].id;

        var descripcionCalzadaH;
        if (document.getElementById("descripcionCalzadaHorizontal").selectedIndex == -1){
            alert("Error con la descripcion calzada horizontal seleccionada");
            return;
        }
        else
            descripcionCalzadaH = $scope.descripcionCalzada[document.getElementById("descripcionCalzadaHorizontal").selectedIndex].id;

        var tipoAccidente;
        if (document.getElementById("tipoAccidente").selectedIndex == -1){
            alert("Error con el tipo de accidente seleccionado");
            return;
        }
        else
            tipoAccidente = $scope.tipoAccidente[document.getElementById("tipoAccidente").selectedIndex].id;


        var kilometro;
        if (document.getElementById("kilometro").selectedIndex == -1){
            alert("Error con el kilometro seleccionado");
            return;
        }
        else
            kilometro = $scope.kilometro[document.getElementById("kilometro").selectedIndex].id;


        var ruta;
        if (document.getElementById("ruta").selectedIndex == -1){
            alert("Error con la ruta seleccionada");
            return;
        }
        else
            ruta = $scope.kilometro[document.getElementById("ruta").selectedIndex].id;

        var fecha = document.getElementById("fecha").value;

        var tipoLesion;
        if (document.getElementById("tipoLesion").selectedIndex == -1){
            alert("Error con el tipo de lesion seleccionado");
            return;
        }
        else
            tipoLesion = $scope.tipoLesion[document.getElementById("tipoLesion").selectedIndex].id;

        peticiones.insertAccidenteGeneral(horaInicio, horaFinal, areaGeo, distrito, tipoRutas,tipoCirculacion,estadoTiempo, tipoCalzada,
            descripcionCalzadaV, descripcionCalzadaH, tipoAccidente, kilometro, ruta, fecha, tipoLesion)
            .then(function (response) {
                mostrarNotificacion("Inserción exitosa",2)
            }, function (response) {
                mostrarNotificacion("Error en la carga de accidente general", 1);
            });
    };



    $scope.seleccionarProvincia();

    $scope.seleccionarTiposCirculacion();
    $scope.seleccionarEstadosTiempo();
    $scope.seleccionarTipoCalzada();
    $scope.seleccionarDescripcionesCalzadas();
    $scope.seleccionarTipoAccidente();
    $scope.seleccionarKilometroRuta();
    $scope.seleccionarTiposLesiones();

});