/*
=======================================================================================
>    Instrucciones necesarias para poder realizar las consultas a la base de datos    <
=======================================================================================
*/
const pg = require('pg'); //postgres controller
const conString = "postgres://postgres:12345@localhost:5432/AccidentesTransito"; //connection link
const client = new pg.Client(conString);
const sync = require('synchronize');

/*
===========================================================================
>   Función encargada de la inserción de accidentes en la base de datos   <
===========================================================================
*/
function insertarAccidentes(claseAccidente, tipoAccidente, anio, mes, dia, hora, provincia, canton, distrito, ruta, kilometro, 
    tipoRuta, ruralUbano, calzadaVertical, calzadaHorizontal, tipoCalzada, estadoTiempo, tipoCirculacion){    
    // se llama la función SQL que se encarga de insertar accidentes
    const query = client.query("SELECT insertarAccidenteGeneral ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18);",
                    [claseAccidente, tipoAccidente, anio, mes, dia, hora, provincia, canton, distrito, ruta, kilometro, 
                    tipoRuta, ruralUbano, calzadaVertical, calzadaHorizontal, tipoCalzada, estadoTiempo, tipoCirculacion]); 
}

/*
===========================================================================
>   Función encargada de la inserción de fallecidos en la base de datos   <
===========================================================================
*/
function insertarFallecidos(dia, mes, ano, tipoAccidente, provincia, canton, ruta, rolPersona, sexo, edad, franja){
    // se llama la función SQL que se encarga de insertar fallecidos
    const query = sync.await(client.query("SELECT insertarEnFallecidos ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11);",
                    [dia, mes, ano, tipoAccidente, provincia, canton, ruta, rolPersona, sexo, edad, franja],sync.defer()));
        
}

/*
===============================================================================================
>   Función encargada de la inserción de accidentes Personas Accidentes en la base de datos   <
===============================================================================================
*/
function insertarPersonasAccidentes(rol, tipoLesion, edad, sexo, anio, mes, dia, provincia, canton, distrito){
    // se llama la función SQL que se encarga de insertar personas accidentadas
    const query = client.query("SELECT insertarEnHeridos ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10);",
                    [rol, tipoLesion, edad, sexo, anio, mes, dia, provincia, canton, distrito]);    
}

/*
============================================================================
>   Función encargada de la extracción de Fallecidos de la API de COSEVI   <
============================================================================
*/
function extraerFallecidos(){
    client.connect();
    console.log("\n\nInsertando información de Fallecidos en la base de datos,  esto puede tardar bastante tiempo por la gran cantidad de datos...");
    var request = require('request');
    request('http://cosevi.cloudapi.junar.com/api/v2/datastreams/REGIS-DE-FALLE-EN-SITIO/data.ajson/?auth_key=7c23534c30d3fd449f1bd5638363c17b89b7617e', 
        function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var dia = '', mes = '', ano = '', tipoAccidente = '', provincia = '', canton = '', ruta = '', rolPersona = '', sexo = '', 
            edad = '', franja = '';
            
            for (var i = 1; i < JSON.parse(response.body).result.length; i++) { // JSON.parse(response.body).result.length

                var respuesta = JSON.parse(response.body).result[i];
    
                dia = respuesta[1];
                mes = respuesta[2];
                ano = respuesta[3];
                console.log(i+") "+respuesta+"\n");
                tipoAccidente = respuesta[4];
                provincia = respuesta[5];
                canton = respuesta[6];
                ruta = respuesta[7];
                rolPersona = respuesta[8];
                sexo = respuesta[9];         
                edad = respuesta[10];
                franja = respuesta[12];

                insertarFallecidos(dia,mes,ano,tipoAccidente,provincia,canton,ruta,rolPersona,sexo,edad,franja);
            }
        }
        else{
            console.log("Ocurrió un error durante la inserción de los datos.");
        }
    });
    console.log("\nFinalización con la inserción de fallecidos.\n\n")
}

/*
============================================================================
>   Función encargada de la extracción de Accidentes de la API de COSEVI   <
============================================================================
*/
function extraerAccidentes(){    
    client.connect();
    console.log("\n\nInsertando información de Accidentes en la base de datos, esto puede tardar bastante tiempo por la gran cantidad de datos...");
    var request = require('request');
    request('http://cosevi.cloudapi.junar.com/api/v2/datastreams/CLASE-Y-TIPOS-DE-ACCID/data.ajson/?auth_key=7c23534c30d3fd449f1bd5638363c17b89b7617e', 
        function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var claseAccidente = '', tipoAccidente = '', anio = '', mes = '', dia = '', hora = '', provincia = '', canton = '', 
            distrito = '', ruta = '', kilometro = '', tipoRuta = '', ruralUbano = '', calzadaVertical = '', calzadaHorizontal = '', 
            tipoCalzada = '', estadoTiempo = '', tipoCirculacion = '';
            
            for (var i = 1; i < JSON.parse(response.body).result.length; i++) { // JSON.parse(response.body).result.length
                
                var respuesta = JSON.parse(response.body).result[i];
                
                claseAccidente = respuesta[1];                
                tipoAccidente = respuesta[2];
                anio = respuesta[3];
                mes = respuesta[4];
                dia = respuesta[5];
                console.log(i+") "+dia+" - "+mes+" - "+anio+"\n");
                hora = respuesta[7];
                provincia = respuesta[8];         
                canton = respuesta[9];
                distrito = respuesta[10];
                ruta = respuesta[11];
                kilometro = respuesta[12];
                tipoRuta = respuesta[13];
                ruralUbano = respuesta[14];
                calzadaVertical = respuesta[15];
                calzadaHorizontal = respuesta[16];
                tipoCalzada = respuesta[17];
                estadoTiempo = respuesta[18];
                tipoCirculacion = respuesta[19];
                insertarAccidentes(claseAccidente, tipoAccidente, anio, mes, dia, hora, provincia, canton, distrito, ruta, kilometro, 
                    tipoRuta, ruralUbano, calzadaVertical, calzadaHorizontal, tipoCalzada, estadoTiempo, tipoCirculacion)       
            }
        }
        else{
            console.log("Ocurrió un error durante la inserción de los datos.");
        }
    });
    console.log("\nFinalización con la inserción de accidentes.\n\n")
}
/*
=======================================================================================
>   Función encargada de la extracción de Personas Accidentadas de la API de COSEVI   <
=======================================================================================
*/
function extraerPersonasAccidentes(){ 
    client.connect();
    console.log("\n\nInsertando información de Personas Accidentadas en la base de datos,  esto puede tardar bastante tiempo por la gran cantidad de datos...");
    var request = require('request');
    request('http://cosevi.cloudapi.junar.com/api/v2/datastreams/TIPOS-DE-DANOS-ACUSA-A/data.ajson/?auth_key=c656630ccf30988a7621d650ac285fc60dff9093&limit=2000', 
        function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var rol = '', tipoLesion = '', edad = '', sexo = '', anio = '', mes = '', dia = '', provincia = '', canton = '', 
            distrito = '';
            
            for (var i = 1; i < JSON.parse(response.body).result.length; i++) { // JSON.parse(response.body).result.length
            async.forEach(JSON.parse(response.body).result.length,function(fila,callback) {
                
            }, this);
                var respuesta = JSON.parse(response.body).result[i];
    
                rol = respuesta[1];
                tipoLesion = respuesta[2];
                edad = respuesta[3];
                sexo = respuesta[5];
                anio = respuesta[6];
                mes = respuesta[7];
                dia = respuesta[8];
                provincia = respuesta[9];
                canton = respuesta[10];         
                distrito = respuesta[11];
                
                insertarPersonasAccidentes(rol, tipoLesion, edad, sexo, anio, mes, dia, provincia, canton, distrito);
            }
        }
        else{
            console.log("Ocurrió un error durante la inserción de los datos.");
        }
    });
    console.log("\nFinalización con la inserción de personas accidentadas.\n\n")
}


function extraerPersonasAccidentes1(){ 
    client.connect();
    console.log("\n\nInsertando información de Personas Accidentadas en la base de datos,  esto puede tardar bastante tiempo por la gran cantidad de datos...");
    var request = require('request');
    request('http://cosevi.cloudapi.junar.com/api/v2/datastreams/TIPOS-DE-DANOS-ACUSA-A/data.ajson/?auth_key=c656630ccf30988a7621d650ac285fc60dff9093&limit=3000', 
        function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var rol = '', tipoLesion = '', edad = '', sexo = '', anio = '', mes = '', dia = '', provincia = '', canton = '', 
            distrito = '';
            
            for (var i = 1; i < JSON.parse(response.body).result.length; i++) { // JSON.parse(response.body).result.length

                var respuesta = JSON.parse(response.body).result[i];
    
                rol = respuesta[1];
                tipoLesion = respuesta[2];
                edad = respuesta[3];
                sexo = respuesta[5];
                anio = respuesta[6];
                mes = respuesta[7];
                dia = respuesta[8];
                provincia = respuesta[9];
                canton = respuesta[10];         
                distrito = respuesta[11];
                
                insertarPersonasAccidentes(rol, tipoLesion, edad, sexo, anio, mes, dia, provincia, canton, distrito);
            }
        }
        else{
            console.log("Ocurrió un error durante la inserción de los datos.");
        }
    });
    console.log("\nFinalización con la inserción de personas accidentadas.\n\n")
}

/*
======================================================================================
>   Llamado de las funciones para que procedan con la extracción de la información   <
======================================================================================
*/
//extraerFallecidos(); // Funciona 100%
//extraerAccidentes(); // Funciona 100%
extraerPersonasAccidentes1();

//console.log("\n* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\n*      Los datos de la tabla FALLECIDOS, ACCIDENTES y PERSONAS ACCIDENTADAS fueron insertados en la base de datos de manera exitosa.      *\n* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\n");
/*
*/