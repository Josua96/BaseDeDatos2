/**
 * Created by Josua on 28/10/2017.
 */
angular.module('loginModule')
    .service('peticiones',['$http',function($http)
    {
        this.registro=function (idCanton,idProvincia,nombre) {
            console.log("prueba de factory");
            return $http({
                method : "GET",
                url :API_ROOT+"obtenerCantones?idcanton="+idCanton+"&idprovincia="+idProvincia+
                "&nombre="+nombre
            })
        }

    }]);