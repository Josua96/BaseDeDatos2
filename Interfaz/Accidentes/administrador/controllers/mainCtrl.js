angular.module('adminModule')
.controller('mainCtrl', 

function($scope,$location) 
    {       
        $scope.user = "Administrador";
        $scope.email = "correo@administrad";           
        $scope.fechaInicio;
        $scope.fechaFin;   
        window.location.href = ('#/solicitudes');
    
   
    }
    
);