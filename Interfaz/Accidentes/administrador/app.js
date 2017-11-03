angular.module('adminModule',["ngRoute","ngResource","ui.calendar"])
.config(['$routeProvider',function($routeProvider)
    {
        $routeProvider
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

        ///
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

        ///
        .when("/distritos",{
            templateUrl:"sections/gestionDistritos.html",
            controller:'gestioncantonesCtrl'
        })

        /// tipos calzada
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

        /// tipo accidente
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

        /// rol persona
        .when("/rolPersona",{
            templateUrl:"sections/gestionrolespersona.html",
            controller:'gestionrolespersonaCtrl'
        })
        .when("/insertarRolPersona",{
            templateUrl:"sections/insertarRolPersona.html",
            controller:'gestionrolpersonaCtrl'
        })
        .when("/modificarRolPersona",{
            templateUrl:"sections/modificarRolPersona.html",
            controller:'gestionrolpersonaCtrl'
        })
        .when("/eliminarRolPersona",{
            templateUrl:"sections/eliminarRolPersona.html",
            controller:'gestionrolpersonaCtrl'
        })

        /// rol persona
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
    }
]);
