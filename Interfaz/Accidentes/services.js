/**
 * Created by Josua on 28/10/2017.
 */
angular.module('loginModule')
    .service('peticiones',['$http',function($http)
    {

        //solicitando autorizacion
        this.autenticar=function (usuario,codigo) {
            if (usuario==""){
                usuario="usuario";
            }
            if (codigo==""){
                codigo="pin";
            }
            
            return $http({
                method : "GET",
                url :API_ROOT+"login?usuario="+usuario+"&codigo="+codigo
            })
        }

    }]);