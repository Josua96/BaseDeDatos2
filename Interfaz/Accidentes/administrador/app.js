angular.module('adminModule',["ngRoute","ngResource","ui.calendar"])
.config(['$routeProvider',function($routeProvider)
    {
        $routeProvider.when("/provincias",{
                templateUrl:'sections/gestionprovincias.html',
                controller: 'gestionprovinciasCtrl'
                })

                .when("/insertarProvincia",{
                    templateUrl:'sections/insertarProvincia.html',
                    controller:'gestionprovinciasCtrl'
                }) 
                .when("/modificarProvincia",{
                    templateUrl:'sections/modificarProvincia.html',
                    controller:'gestionprovinciasCtrl'
                }) 
                .when("/eliminarProvincia",{
                    templateUrl:'sections/eliminarProvincia.html',
                    controller:'gestionprovinciasCtrl'
                }) 
                .when("/cantones",{
                templateUrl:"sections/gestionCantones.html",
                controller:'gestioncantonesCtrl'
                })

                .when("/insertarCanton",{
                    templateUrl:'sections/insertarCanton.html',
                    controller:'gestioncantonesCtrl'
                })

                .when("/modificarCanton",{
                    templateUrl:'sections/modificarCanton.html',
                    controller:'gestioncantonesCtrl'
                })

                .when("/eliminarCanton",{
                    templateUrl:'sections/eliminarCanton.html',
                    controller:'gestioncantonesCtrl'
                })

                .when("/distritos",{
                    templateUrl:"sections/gestionDistritos.html",
                    controller:'gestiondistritosCtrl'
                })

                .when("/insertarDistrito",{
                    templateUrl:'sections/insertarDistrito.html',
                    controller:'gestiondistritosCtrl'
                })
    
                .when("/modificarDistrito",{
                    templateUrl:'sections/modificarDistrito.html',
                    controller:'gestiondistritosCtrl'
                })
    
                .when("/eliminarDistrito",{
                    templateUrl:'sections/eliminarDistrito.html',
                    controller:'gestiondistritosCtrl'
                })

                .when("/tiposcirculacion",{
                    templateUrl:"sections/gestionTiposCirculacion.html",
                    controller:'gestiontiposcirculacionCtrl'
                })
    
                .when("/insertarTipoCirculacion",{
                    templateUrl:'sections/insertarTipoCirculacion.html',
                    controller:'gestiontiposcirculacionCtrl'
                })
    
                .when("/modificarTipoCirculacion",{
                    templateUrl:'sections/modificarTipoCirculacion.html',
                    controller:'gestiontiposcirculacionCtrl'
                })
    
                .when("/eliminarTipoCirculacion",{
                    templateUrl:'sections/eliminarTipoCirculacion.html',
                    controller:'gestiontiposcirculacionCtrl'
                })

                .when("/estadostiempo",{
                    templateUrl:"sections/gestionEstadosTiempo.html",
                    controller:'gestionestadostiempoCtrl'
                })
    
                .when("/insertarEstadoTiempo",{
                    templateUrl:'sections/insertarEstadoTiempo.html',
                    controller:'gestionestadostiempoCtrl'
                })
    
                .when("/modificarEstadoTiempo",{
                    templateUrl:'sections/modificarEstadoTiempo.html',
                    controller:'gestionestadostiempoCtrl'
                })
    
                .when("/eliminarEstadoTiempo",{
                    templateUrl:'sections/eliminarEstadoTiempo.html',
                    controller:'gestionestadostiempoCtrl'
                })

                .when("/descripcionescalzada",{
                    templateUrl:"sections/gestionDescripcionesCalzada.html",
                    controller:'gestiondescripcionescalzadaCtrl'
                })

                .when("/insertarDescripcionCalzada",{
                    templateUrl:'sections/insertarDescripcionCalzada.html',
                    controller:'gestiondescripcionescalzadaCtrl'
                })

                .when("/modificarDescripcionCalzada",{
                    templateUrl:'sections/modificarDescripcionCalzada.html',
                    controller:'gestiondescripcionescalzadaCtrl'
                })

                .when("/eliminarDescripcionCalzada",{
                    templateUrl:'sections/eliminarDescripcionCalzada.html',
                    controller:'gestiondescripcionescalzadaCtrl'
                })

                .when("/tiposlesiones",{
                    templateUrl:"sections/gestionTiposLesiones.html",
                    controller:'gestiontiposlesionesCtrl'
                })

                .when("/insertarTipoLesion",{
                    templateUrl:'sections/insertarTipoLesion.html',
                    controller:'gestiontiposlesionesCtrl'
                })

                .when("/modificarTipoLesion",{
                    templateUrl:'sections/modificarTipoLesion.html',
                    controller:'gestiontiposlesionesCtrl'
                })

                .when("/eliminarTipoLesion",{
                    templateUrl:'sections/eliminarTipoLesion.html',
                    controller:'gestiontiposlesionesCtrl'
                })
    }
]);
