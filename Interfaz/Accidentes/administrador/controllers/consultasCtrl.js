/**
 * Created by Josua on 15/11/2017.
 */
angular.module('adminModule').controller('consultasCtrl', function($scope,$location,$http,peticiones){
    
    $scope.causaAccidente;
    $scope.cantidadAccidentes;
    $scope.labels;
    $scope.datos;
    $scope.titulo;
    $scope.provincias=[];
    $scope.obtenerSeleccionada=function (selected) {
        if (selected===0){
            window.location.href = ('#/Visualizar acc');
        }
        else if(selected===1){
            window.location.href = ('#/modificarCanton');
        }
        else if(selected===2){
            window.location.href = ('#/eliminarCanton');
        }
        else if (selected===3){
            window.location.href = ('#/accidentesGeneralesPorTipo');
        }
        else if(selected==4){
            window.location.href = ('#/accidentesGeneralesPorEstadoTiempo');
        }
        else if(selected==5){
            window.location.href = ('#/causaMayorAccidentesGeneralesProvincias');
        }
    };

    //obtener datos para el grafico, cantidad de accidentes generales por cada tipo de accidente
    $scope.generarAccidentesGeneralesPorTipo=function () {
        $scope.titulo="Gráfico representativo de accidentes generales ocurridos por cada tipo de accidente";
        console.log("se iran a cargar los accidentes por tipo");
        
        peticiones.accidentesGeneralesPorTipo()
            .then(function (response) {
                //asignacion de datos a las variables
                $scope.labels=recorrerConsulta(response.data,"tipo",1);
                $scope.datos=recorrerConsulta(response.data,"cantidadaccidentes",0);

                
            }, function (response) {
                mostrarNotificacion("Ocurrió un error en la carga de datos", 1);
                console.log("respuesta negativa");
                console.log(response.data.message);
            });
    };

    //obtener datos para el grafico,cantidad de accidentes generales por cada estado tiempo
    $scope.generarAccidentesGeneralesPorEstadoTiempo=function () {
        $scope.titulo="Gráfico representativo de accidentes generales ocurridos en cada estado de tiempo registrado";

        peticiones.accidentesGeneralesPorEstadoTiempo()
            .then(function (response) {
                //asignacion de datos a las variables
                $scope.labels=recorrerConsulta(response.data,"estado",1);
                $scope.datos=recorrerConsulta(response.data,"cantidadaccidentes",0);


            }, function (response) {
                mostrarNotificacion("Ocurrió un error en la carga de datos", 1);
                console.log("respuesta negativa");
                console.log(response.data.message);
            });
    };

    
    $scope.obtenerCausaMayorAccidentesGenerales=function () {
        var opcionSeleccionada=document.getElementById('selec').selectedIndex;
        if (opcionSeleccionada==undefined || opcionSeleccionada==-1){
            opcionSeleccionada=0;
        }
        
        peticiones.causaMayorACProvincias($scope.provincias[opcionSeleccionada].id)
            .then(function (response) {
                $scope.causaAccidente=response.data[0].a;
                $scope.cantidadAccidentes=response.data[0].b;
                
            }, function (response) {
                mostrarNotificacion("Error en el proceso", 1);

            });
        
        
    };
    
    $scope.seleccionarProvincia=function () {

            peticiones.seleccionarProvincias(-1, -1)
                .then(function (response) {
                    
                    $scope.provincias = recorrerRespuesta(response.data, "v_nombreprovincia", "v_id");

                    if($scope.provincias.length>0){
                        $scope.obtenerCausaMayorAccidentesGenerales();
                    }
                    else{
                        mostrarNotificacion("Actualmente no existen provincias registradas", 1);
                    }
                }, function (response) {
                    mostrarNotificacion("Error en la carga de provincias", 1);
                    
                });
        
        
    };
    
    //si se debe ejecutar la consulta de accidentes generales por tipo de accidente
    if (window.location.href.indexOf('accidentesGeneralesPorTipo')!=-1){
        console.log("entre a accidentes por tipo");
        $scope.generarAccidentesGeneralesPorTipo();
    }

    else if(window.location.href.indexOf('accidentesGeneralesPorEstadoTiempo')!=-1){
        $scope.generarAccidentesGeneralesPorEstadoTiempo();
    }
    else if(window.location.href.indexOf('causaMayorAccidentesGeneralesProvincias')!=-1){
        $scope.seleccionarProvincia();
    }

});