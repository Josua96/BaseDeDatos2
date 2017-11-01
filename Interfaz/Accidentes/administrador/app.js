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
                    controller:'gestioncantonesCtrl'
                })
    }
]);
