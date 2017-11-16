angular.module('adminModule')
    .service('peticiones',['$http',function($http)
    {
        /*
         ==================================
         Peticiones Esquema Direccion
         ==================================
         */

        this.insercionProvincia=function (nombre) {
            console.log("Insercion Provincia");
            return $http({
                method: "POST",
                url: API_ROOT + "insertarProvincia?nombre=" + nombre
            });
        };

        this.insercionCanton=function (id,nombre) {

            return $http({
                method: "POST",
                url: API_ROOT + "insertarCanton?idprovincia="+id+"&nombre="+nombre
            });
        };


        this.insercionDistrito=function (id,nombre) {

            return $http({
                method: "POST",
                url: API_ROOT + "insertarDistrito?idcanton="+id+"&nombre="+nombre
            });
        };

        //recibe por parametro el nombre del end´point a utilzar y el id respectivo para realizar la modificacion
        // (ya sea para provincias,cantones,distritos)
        this.modificarD=function (endpointName,id,nombre) {

            return $http({
                method: "POST",
                url: API_ROOT + endpointName+"?id="+id+"&nombre="+nombre
            });
        };

        //recibe por parametro el nombre del end´point a utilzar y el id respectivo para realizar el proceso de borrado
        // (ya sea para provincias,cantones,distritos)
        this.eliminarD=function (endpointName,id) {
            return $http({
                method: "DELETE",
                url: API_ROOT + endpointName+"?id="+id
            });
        };

        this.seleccionarProvincias=function (id,nombre) {
            return $http({
                method: "GET",
                url: API_ROOT + "obtenerProvincias?id="+id+"&nombre="+nombre
            });
        };

        this.seleccionarCantones=function (idProvincia,idCanton,nombre) {
            return $http({
                method: "GET",
                url: API_ROOT + "obtenerCantones?idcanton="+idCanton+"&idprovincia="+idProvincia+"&nombre="+nombre
            });
        };

        this.seleccionarDistritos=function (idDistrito,idCanton,nombre) {
            return $http({
                method: "GET",
                url: API_ROOT + "obtenerDistritos?idcanton="+idCanton+"&iddistrito="+idDistrito+"&nombre="+nombre
            });
        };

        /*
         ==========================================
         Endpoints esquema ACCIDENTES TRAN
         ==========================================
         */

        this.insertarFallecido=function (fecha,rol,edad,sexo,canton,inicio,final,tipoAccidente,ruta) {
            return $http({
                method: "POST",
                url: API_ROOT + "insertarFallecido?fecha="+fecha
                +"&idRolPersona="+rol+"&edad="+edad+"&sexo="+sexo+"&idCanton="+canton+
                    "&horaInicio="+inicio+"&horaFinal="+final+"&idTipoAccidente="+tipoAccidente+"&idRuta="+ruta  
                    
            });
        };

        this.insertarHerido=function (lesion,fecha,rol,edad,sexo,distrito) {
            return $http({
                method: "POST",
                url: API_ROOT + "insertarHerido?idTipoLesion="+lesion+"&fecha="+fecha
                +"&idRolPersona="+rol+"&edad="+edad+"&sexo="+sexo+"&idDistrito="+distrito
            });
        };
        /*
        ==========================================
        Endpoints esquema Detalles Accidentes
        ==========================================
         */
        this.insertar=function (endpointName,nombre) {
            console.log("Insercion ");
            return $http({
                method: "POST",
                url: API_ROOT + endpointName+"?valor=" + nombre
            });
        };

        this.modificar=function (endpointName,id,nombre) {
            console.log("endpoint.. "+endpointName);
            console.log("id.. "+id);
            console.log("nombre.. "+nombre);
            return $http({
                method: "POST",
                url: API_ROOT + endpointName+"?id="+id+"&valor="+nombre
            });
        };

        this.eliminar=function (endpointName,id) {
            return $http({
                method: "DELETE",
                url: API_ROOT + endpointName+"?id="+id
            });
        };

        this.seleccionar=function (endpointName) {
            return $http({
                method: "GET",
                url: API_ROOT + endpointName
            });
        };

        /*
        ==========================================
        Endpoints para insertar accidente general
        ==========================================
         */
        this.insertAccidenteGeneral=function (horaInicio, horaFinal, areaGeografica, distrito, tipoRuta, tipoCirculacion,
                                estadoTiempo, tipoCalzada, descripCalzadaV, descripCalzadaH, tipoAccidente, kilometro, ruta,
                                fecha, tipoLesion)
        {
            console.log("Error en service");
            return $http({
                method: "POST",
                url: API_ROOT + "insertAccidenteGeneral"+"?horaInicio=" + horaInicio+"&horaFinal="+horaFinal+
                "&areaGeografica="+areaGeografica+"&distrito="+distrito+"&tipoRuta="+tipoRuta+"&tipoCirculacion="+
                tipoCirculacion+"&estadoTiempo="+estadoTiempo+"&tipoCalzada="+tipoCalzada+"&descripCalzadaV="+
                descripCalzadaV+"&descripCalzadaH="+descripCalzadaH+"&tipoAccidente="+tipoAccidente+"&kilometro="+
                kilometro+"&ruta="+ruta+"&fecha="+fecha+"&tipoLesion="+tipoLesion
            });
        };

    }]);

    
