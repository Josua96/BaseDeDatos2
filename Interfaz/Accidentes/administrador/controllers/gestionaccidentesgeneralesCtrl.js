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

    $scope.insertarAccidenteGeneral = function () {
        var horaInicio = document.getElementById("horaInicio").value;
        console.log(horaInicio);
        var horaFinal = document.getElementById("horaFinal").value;
        console.log(horaFinal);
        var areaGeog = $scope.areaGeo[evaluarSeleccion(document.getElementById("areaGeografica").selectedIndex)];
        console.log(areaGeog);
        var distrito = $scope.distritos[evaluarSeleccion(document.getElementById("distrito").selectedIndex)].model;
        console.log(distrito);
        var tipoRutas = $scope.tipoRuta[evaluarSeleccion(document.getElementById("tipoRuta").selectedIndex)];
        console.log(tipoRutas);
        var tipoCirculacion = $scope.tipoCirculacion[evaluarSeleccion(document.getElementById("tipoCirculacion").selectedIndex)].model;
        console.log(tipoCirculacion);
        var estadoTiempo = $scope.estadoTiempo[evaluarSeleccion(document.getElementById("estadoTiempo").selectedIndex)].model;
        console.log(estadoTiempo);
        var tipoCalzada = $scope.tipoCalzada[evaluarSeleccion(document.getElementById("tipoCalzada").selectedIndex)].model;
        console.log(tipoCalzada);
        var descripcionCalzadaH = $scope.descripcionCalzada[evaluarSeleccion(document.getElementById("descripcionCalzadaHorizontal").selectedIndex)].model;
        console.log(descripcionCalzadaH);
        var descripcionCalzadaV = $scope.descripcionCalzada[evaluarSeleccion(document.getElementById("descripcionCalzadaVertical").selectedIndex)].model;
        console.log(descripcionCalzadaV);
        var tipoAccidente = $scope.tipoAccidente[evaluarSeleccion(document.getElementById("tipoAccidente").selectedIndex)].model;
        console.log(tipoAccidente);
        var kilometro = $scope.kilometro[evaluarSeleccion(document.getElementById("kilometro").selectedIndex)].model;
        console.log(kilometro);
        var ruta = $scope.kilometro[evaluarSeleccion(document.getElementById("ruta").selectedIndex)].model;
        console.log(ruta);
    };



    $scope.seleccionarProvincia();

    $scope.seleccionarTiposCirculacion();
    $scope.seleccionarEstadosTiempo();
    $scope.seleccionarTipoCalzada();
    $scope.seleccionarDescripcionesCalzadas();
    $scope.seleccionarTipoAccidente();
    $scope.seleccionarKilometroRuta();

});