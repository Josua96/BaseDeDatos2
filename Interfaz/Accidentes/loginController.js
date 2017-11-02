var app = angular.module('loginModule',["ngRoute","ngResource"]);
app.controller('loginController',function($scope, $http,peticiones)
{
    
    $scope.username = "alguien";
    $scope.password = "";
    $scope.id="2-1122-1222";
    $scope.codigo="wer3";
    $scope.carnet="2016254066";
    $scope.codigo="wer3";
    $scope.sede="SC";
    $scope.sol="CCSS";
    $scope.prueba;

    $scope.idProvincia=-1;
    $scope.idCanton=-1;
    $scope.nombre=-1;

    $scope.actualizarInfo =function()
    {
        //format(Base64.encode($scope.carnet,true).toString())
        $http({
            method : "POST",
            url :"http://localhost:8081/CrearSolicitud?carnet=" + $scope.carnet + "&tramite="+$scope.sol+
                "&iden="+$scope.id+"&codigo="+$scope.codigo+"&sede="+$scope.sede
        })
            .then(function mySucces(response)
                {

                    if (response.data=="\"Invalid_Token\""){
                        console.log("sera redirigido");
                    }

                },
                function myError(response)
                {
                    console.log("error");
                });
    };
    /*
   $scope.mostrarDatos=function () {

       $http.get("login.php")
          .success(function (data) {
              console.log("data showed");
              $scope.pruebaData=data;
              console.log("respuesta get: " ,$scope.pruebaData);
          });
          */

    /*
    $scope.prueba=function () {
        console.log("probando"+ $scope.prueba[0].id);
    };

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() 
    {
        if (this.readyState === 4 && this.status === 200)
        {

        console.log("se llegó a la respuesta");
        console.log("Respuesta = " + this.responseText);
            console.log("Respuesta2 = " + this.responseText.slice(0,-1));
        //$scope.prueba=(eval(this.responseText));
            $scope.prueba=JSON.parse(this.responseText.slice(0,-1));
       // $scope.prueba=JSON.parse(this.responseText);
        console.log("Primera posicion : " + $scope.prueba[0].id);

        }
    };
    xhttp.open("GET", "login.php", true);
    xhttp.send();

   };
*/
    $scope.doLogin = function () 
    {
        //$scope.actualizarInfo();
        /*$http({
        method: "GET",
        url: API_ROOT+'/user/login.php/web?username={0}&password={1}'
        .format(Base64.toBase64($scope.username, true).toString(), Base64.toBase64($scope.password, true).toString())
        }).then(function mySucces(response) {
        console.log(response.data);
        console.log((API_ROOT + '/user/login.php/web?username={0}&password={1}')
        .format(Base64.toBase64($scope.username, true).toString(), Base64.toBase64($scope.password, true).toString()))
        var meta = response.data.metadata;



        if (meta.operationResult == 'Ok') {

        var content = response.data.content;
        console.log(content);
        var userData = content.user;
        console.log(userData);
        saveSession(content);

        window.location.href = ('{0}/MainView.html'.format(userData.userType == "Admin" ? "admin" : "users"));
        } else {
        alert("Credenciales incorrectas");
        }
        });*/

/*
        if($scope.username==="e")
        {    
            console.log("datos");
            console.log($scope.user);
            console.log($scope.password);

            localStorage.setItem("user001", $scope.username);
            localStorage.setItem("password001", $scope.password);

            window.location.href = ('estudiantes/MainView.html');//'{0}/MainView.html'.format(userData.userType == "Admin" ? "" : "users"));
        }
        else if($scope.username === "p")
        {
             window.location.href = ('profesores/MainView.html');
        }
        else
        {
            window.location.href = ('administrad/MainView.html');//'{0}/MainView.html'.format(userData.userType == "Admin" ? "" : "users"));
        }  
      */
       // window.location.href = ('administrad/MainView.html');
      //  $scope.mostrarDatos();
     //   $scope.prueba();

    };

    $scope.login=function () {
       /* $http({
            method : "GET",
            url :API_ROOT+"obtenerCantones?idcanton="+$scope.idCanton+"&idprovincia="+$scope.idProvincia+
                "&nombre="+$scope.nombre
        }).then(function (response) {
            console.log("respuesta positiva");
            console.log(response);
        }, function (response) {
            console.log("respuesta negativa");

            console.log(response.data.message);
        });
        */
        peticiones.registro($scope.idCanton,$scope.idProvincia,$scope.nombre)
            .then(function (response) {
                console.log("respuesta positiva");
                console.log(response);
            }, function (response) {
                console.log("respuesta negativa");

                console.log(response.data.message);
            });
        
    };
    
    function saveSession(json) 
    {
        localStorage.setItem("session.token", json.session.token);
        localStorage.setItem("session.owner", JSON.stringify(json.user));
        console.log("Sesión guardada.");
    };
    window.location.href = ('administrador/MainView.html');
    
});