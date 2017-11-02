/*
=======================================================================================
>    Instrucciones necesarias para poder realizar las consultas a la base de datos    <
=======================================================================================
*/
const pg = require('pg'); //postgres controller
const conString = "postgres://postgres:12345@localhost:5432/AccidentesTransito"; //connection link
const client = new pg.Client(conString);
var async = require('async');
client.connect();

/*
=======================================================================================================================
>   Función encargada de la inserción de Fallecidos en la BD desde un archivo JSON exportado desde la  API de COSEV   <
=======================================================================================================================
*/
function extraerFallecidos(){    
    console.log("\n\nInsertando información de Fallecidos en la base de datos,  esto puede tardar bastante tiempo por la gran cantidad de datos...");
    var request = require('request');
    request('http://cosevi.cloudapi.junar.com/api/v2/datastreams/REGIS-DE-FALLE-EN-SITIO/data.ajson/?auth_key=7c23534c30d3fd449f1bd5638363c17b89b7617e', 
        function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var dia = '', mes = '', ano = '', tipoAccidente = '', provincia = '', canton = '', ruta = '', rolPersona = '', sexo = '', 
            edad = '', franja = '';

            async.forEach(JSON.parse(response.body).result, function(element, callback) {
                dia = element[1];
                mes = element[2];
                ano = element[3];
                tipoAccidente = element[4];
                provincia = element[5];
                canton = element[6];
                ruta = element[7];
                rolPersona = element[8];
                sexo = element[9];         
                edad = element[10];
                franja = element[12];  
        
                const query = client.query("SELECT insertarEnFallecidos ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11);",
                [dia, mes, ano, tipoAccidente, provincia, canton, ruta, rolPersona, sexo, edad, franja],callback);

            }, function(err) {
                if (err)
                    return err;        
                res.json({
                    success: true,
                    message: "successful insertions on Fallecidos table."
                });
            });
            console.log("\nFinalización con la inserción de fallecidos.\n\n");
        }
        else{
            console.log("Ocurrió un error durante la inserción de los datos.");
        }
    });   
    extraerAccidentes(); 
}

/*
========================================================================================================================
>   Función encargada de la inserción de Accidentes en la BD desde un archivo JSON exportado desde la  API de COSEVI   <
========================================================================================================================
*/
function extraerAccidentes(){
    var claseAccidente = '', tipoAccidente = '', anio = '', mes = '', dia = '', hora = '', provincia = '', canton = '', 
    distrito = '', ruta = '', kilometro = '', tipoRuta = '', ruralUbano = '', calzadaVertical = '', calzadaHorizontal = '', 
    tipoCalzada = '', estadoTiempo = '', tipoCirculacion = '';
    
    var object = require("./Accidentes.json");

    async.forEach(object, function(element, callback) {
        claseAccidente = element[1];                
        tipoAccidente = element[2];
        anio = element[3];
        mes = element[4];
        dia = element[5];
        hora = element[7];
        provincia = element[8];         
        canton = element[9];
        distrito = element[10];
        ruta = element[11];
        kilometro = element[12];
        tipoRuta = element[13];
        ruralUbano = element[14];
        calzadaVertical = element[15];
        calzadaHorizontal = element[16];
        tipoCalzada = element[17];
        estadoTiempo = element[18];
        tipoCirculacion = element[19];
    
        const query = client.query("SELECT insertarAccidenteGeneral ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18);",
        [claseAccidente, tipoAccidente, anio, mes, dia, hora, provincia, canton, distrito, ruta, kilometro, 
        tipoRuta, ruralUbano, calzadaVertical, calzadaHorizontal, tipoCalzada, estadoTiempo, tipoCirculacion],callback);
        
    }, function(err) {
        if (err)
            return err;        
        res.json({
            success: true,
            message: "successful insertions on Accidents table."
        });
    });
    extraerPersonasAccidentes();
}

/*
===================================================================================================================================
>   Función encargada de la inserción de Personas Accidentadas en la BD desde un archivo JSON exportado desde la  API de COSEVI   <
===================================================================================================================================
*/
function extraerPersonasAccidentes(){
    var rol = '', tipoLesion = '', edad = '', sexo = '', anio = '', mes = '', dia = '', provincia = '', canton = '', 
    distrito = '';

    var object = require("./PersonasAccidentes.json");
    console.log(object.length);
    async.forEach(object, function(element, callback) {
        rol = element[1];
        tipoLesion = element[2];
        edad = element[3];
        sexo = element[5];
        anio = element[6];
        mes = element[7];
        dia = element[8];
        provincia = element[9];
        canton = element[10];         
        distrito = element[11];  

        const query = client.query("SELECT insertarEnHeridos ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10);",
        [rol, tipoLesion, edad, sexo, anio, mes, dia, provincia, canton, distrito],callback);

    }, function(err) {
        if (err)
            return err;        
        res.json({
            success: true,
            message: "successful insertions on Heridos table."
        });
    });
}

/*
======================================================================================
>   Llamado de las funciones para que procedan con la extracción de la información   <
======================================================================================
*/
extraerFallecidos();