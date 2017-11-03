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

        this.modificarD=function (endpointName,id,nombre) {

            return $http({
                method: "POST",
                url: API_ROOT + endpointName+"?id="+id+"&nombre="+nombre
            });
        };

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

        this.modificar=function (endpointName,id,nuevoValor) {

            return $http({
                method: "POST",
                url: API_ROOT + endpointName+"?id="+id+"&valor="+nuevoValor
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

    }]);

    
