angular.module('adminModule',["ngRoute","ngResource","ui.calendar","chart.js"])
.config(['$routeProvider',function($routeProvider)
    {
        $routeProvider
            // provincias
            .when("/provincias",{
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

            // cantones
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

            // distritos
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

            // tipos calzada
            .when("/tiposCalzada",{
                templateUrl:"sections/gestiontiposcalzada.html",
                controller:'gestiontiposcalzadaCtrl'

            })
            .when("/insertarTipoCalzada",{
                templateUrl:"sections/insertarTipoCalzada.html",
                controller:'gestiontiposcalzadaCtrl'
            })
            .when("/modificarTipoCalzada",{
                templateUrl:"sections/modificarTipoCalzada.html",
                controller:'gestiontiposcalzadaCtrl'
            })
            .when("/eliminarTipoCalzada",{
                templateUrl:"sections/eliminarTipoCalzada.html",
                controller:'gestiontiposcalzadaCtrl'
            })
                
            // tipo accidente
            .when("/tiposAccidente",{
                templateUrl:"sections/gestiontiposaccidentes.html",
                controller:'gestiontiposaccidentesCtrl'
            })
            .when("/insertarTipoAccidente",{
                templateUrl:"sections/insertarTipoAccidente.html",
                controller:'gestiontiposaccidentesCtrl'
            })
            .when("/modificarTipoAccidente",{
                templateUrl:"sections/modificarTipoAccidente.html",
                controller:'gestiontiposaccidentesCtrl'
            })
            .when("/eliminarTipoAccidente",{
                templateUrl:"sections/eliminarTipoAccidente.html",
                controller:'gestiontiposaccidentesCtrl'
            })
                
            // rol persona
            .when("/rolPersona",{
                templateUrl:"sections/gestionrolespersona.html",
                controller:'gestionrolespersonaCtrl'
            })
            .when("/insertarRolPersona",{
                templateUrl:"sections/insertarRolPersona.html",
                controller:'gestionrolespersonaCtrl'
            })
            .when("/modificarRolPersona",{
                templateUrl:"sections/modificarRolPersona.html",
                controller:'gestionrolespersonaCtrl'
            })
            .when("/eliminarRolPersona",{
                templateUrl:"sections/eliminarRolPersona.html",
                controller:'gestionrolespersonaCtrl'
            })
            // kilometro ruta
            .when("/kilometroRuta",{
                templateUrl:"sections/gestionkilometroruta.html",
                controller:'gestionkilometrorutaCtrl'
            })
            .when("/insertarKilometroRuta",{
                templateUrl:"sections/insertarKilometroRuta.html",
                controller:'gestionkilometrorutaCtrl'
            })
            .when("/modificarKilometroRuta",{
                templateUrl:"sections/modificarKilometroRuta.html",
                controller:'gestionkilometrorutaCtrl'
            })
            .when("/eliminarKilometroRuta",{
                templateUrl:"sections/eliminarKilometroRuta.html",
                controller:'gestionkilometrorutaCtrl'
            })
                
            /***   CONSULTAS    */
            .when("/consultas",{
                templateUrl:"sections/Consultas.html",
                controller:'consultasCtrl'
            })

            .when("/accidentesGeneralesPorTipo",{
                templateUrl:"sections/accidentesGeneralesPorTipoTiempo.html",
                controller:'consultasCtrl'
            })

            .when("/accidentesGeneralesPorEstadoTiempo",{
                templateUrl:"sections/accidentesGeneralesPorTipoTiempo.html",
                controller:'consultasCtrl'
            })

            .when("/causaMayorAccidentesGeneralesProvincias",{
                templateUrl:"sections/accidentesGeneralesCausaMayorProvincias.html",
                controller:'consultasCtrl'
            })
        
            // tipo circulacion
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

            // estado tiempo
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

            // descripcion calzada
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

            // tipo lesion
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

            // heridos
            .when("/heridos",{
                templateUrl:"sections/gestionheridos.html",
                controller:'gestionheridosCtrl'
            })
            .when("/insertarHeridos",{
                templateUrl:"sections/insertarHeridos.html",
                controller:'gestionheridosCtrl'
            })
            .when("/mostrarHeridos",{
                templateUrl:"sections/mostrarHeridos.html",
                controller:'gestionheridosCtrl'
            })

            // accidentes generales
            .when("/accidentesGenerales",{
                templateUrl:"sections/gestionaccidentesgenerales.html",
                controller:'gestionaccidentesgeneralesCtrl'
            })
            .when("/insertarAccidenteGeneral",{
                templateUrl:"sections/insertarAccidenteGeneral.html",
                controller:'gestionaccidentesgeneralesCtrl'
            })
            .when("/mostrarAccidentesGenerales",{
                templateUrl:"sections/mostrarAccidentesGenerales.html",
                controller:'gestionaccidentesgeneralesCtrl'
            })

            //fallecidos
            .when("/fallecidos",{
                templateUrl:"sections/gestionfallecidos.html",
                controller:'gestionfallecidosCtrl'
            })
            .when("/insertarFallecidos",{
                templateUrl:"sections/insertarFallecidos.html",
                controller:'gestionfallecidosCtrl'
            })
            .when("/mostrarFallecidos",{
                templateUrl:"sections/mostrarFallecidos.html",
                controller:'gestionfallecidosCtrl'
            })
    }
]);
