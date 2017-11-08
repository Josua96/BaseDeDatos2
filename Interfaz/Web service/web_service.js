/*
*     Web Service REST para la BD Accidentes Transito
*
* Autor: Josua Carranza | 2016------
* Contacto: ---@gmail.com, ---, ---@estudiantec.cr
*
*/



var pg = require('pg'); //postgres controller

//formato del string: "postgres://nombreUsuario:contraseña@ip:puerto/baseDeDatos"
var conString = "postgres://postgres:12345@localhost:5432/AccidentesTransito"; //connection link
var client;
var express = require('express');
var app = express(); //restful api
var pgp = require('pg-promise')();
//var base64=require('base-64');

var cn = {
    host: 'localhost',
    port: 5432,
    database: 'AccidentesTransito',
    user: 'postgres',
    password: '12345'

};


//var cn;

var db = pgp(cn);
//var db;

/*
//login ddel usuario en el sistemaa
app.get('/login', function(req, res) {
	//validacion de token
	stringConection="postgres://($1):($2)@localhost:5432/AccidentesTransito",[req.query.user,req.query.password];
	client=new pg.Client(stringConection);
	client.connect(err=>{
			if(err)
				res.end(JSON.stringify(false));
				return;
			client.end();
			res.end.JSON.stringify(true); //conexion exitosa
	});
	
	
})

*/



/*

==========================
forma para hacer una consulta normal y retornar el resultado
============================
client = new pg.Client(conString);
  	client.connect();
    client.query
    ('SELECT *  from Direccion.Provincias',function(err,result){
    		if (err)
   			{
      		console.log(err);
      		res.status(400).send(
      			{message:'Ocurrió un error en el proceso'});
      		return;
    		}
    		console.log(result);
    		res.end(JSON.stringify(result.rows));
    	});
*/


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "DELETE, GET, POST");
    next();
})



//================================================================================================
//      Esquema DIRECCION
//================================================================================================



//Lista!
app.post('/insertarProvincia', function(req, res) {
	
	db.func('insertar_provincia',[req.query.nombre])
	.then(data => {
		console.log(data);
		res.end(JSON.stringify(true));

	})
	.catch(error => {
      		console.log("ERROR: ",error);
      		res.status(400).send(
      			{message:'No fue posible realizar la insercion'});
    	})	
})

app.post('/modificarProvincia', function(req, res) {
	
	db.func('modificar_provincias',[req.query.id,req.query.nombre])
	.then(data => {
		console.log(data);
		res.end(JSON.stringify(true));

	})
	.catch(error => {
      		console.log("ERROR: ",error);
      		res.status(400).send(
      			{message:'No fue posible realizar la actualización'});
    	})
	
})


app.delete('/eliminarProvincia', function(req, res) {
	
	db.proc('borrar_provincia',[req.query.id])
	.then(data => {
		console.log(data);
		res.end(JSON.stringify(true));

	})
	.catch(error => {
      		console.log("ERROR: ",error);
      		res.status(400).send(
      			{message:'La provincia no ha sido eliminada'});
    	})
	
})

app.get('/obtenerProvincias', function(req, res) {
	
	if (req.query.id==-1){
		console.log("cambiado idcanton");
		req.query.id=null;
	}
	
	if(req.query.nombre==-1){
		console.log("cambiado nombre");
		req.query.nombre=null;
	}
	
	db.func('seleccionar_provincias',[req.query.id,req.query.nombre])
	.then(data => {
		console.log(data);
		res.end(JSON.stringify(data));

	})
	.catch(error => {
      		console.log("ERROR: ",error);
      		res.status(400).send(
      			{message:'No fue posible seleccionar ninguna provincia'});
    	})
	
})

app.post('/insertarCanton', function(req, res) {
	
	db.func('insertar_cantones',[req.query.idprovincia,req.query.nombre])
	.then(data => {
		console.log(data);
		res.end(JSON.stringify(true));

	})
	.catch(error => {
      		console.log("ERROR: ",error);
      		res.status(400).send(
      			{message:'Ocurrió un error en el proceso'});
    	})
	
})

app.post('/modificarCanton', function(req, res) {
	
	db.func('modificar_cantones',[req.query.id,req.query.nombre])
	.then(data => {
		console.log(data);
		res.end(JSON.stringify(true));

	})
	.catch(error => {
      		console.log("ERROR: ",error);
      		res.status(400).send(
      			{message:'Ocurrió un error en el proceso'});
    	})
	
})


app.delete('/eliminarCanton', function(req, res) {
	
	db.func('borrar_cantones',[req.query.id])
	.then(data => {
		console.log(data);
		res.end(JSON.stringify(true));

	})
	.catch(error => {
      		console.log("ERROR: ",error);
      		res.status(400).send(
      			{message:'Ocurrió un error en el proceso'});
    	})
	
})


//ENVIAR un -1 para los valores que deban ser nulos
app.get('/obtenerCantones', function(req, res) {
	
	
	if (req.query.idcanton==-1){
		console.log("cambiado idcanton");
		req.query.idcanton=null;
	}
	if (req.query.idprovincia==-1){
		console.log("cambiado idprovincia");
		req.query.idprovincia=null;
	}
	if(req.query.nombre==-1){
		console.log("cambiado nombre");
		req.query.nombre=null;
	}
	
	db.func('seleccionar_cantones',[req.query.idcanton,
		req.query.idprovincia, req.query.nombre])
	.then(data => {
		console.log(data);
		res.end(JSON.stringify(data));

	})
	.catch(error => {
      		console.log("ERROR: ",error);
      		res.status(400).send(
      			{message:'No fue posible seleccionar un cantón'});
    	})

    
	
})

app.post('/insertarDistrito', function(req, res) {
	
	db.func('insertar_distritos',[req.query.idcanton,req.query.nombre])
	.then(data => {
		console.log(data);
		res.end(JSON.stringify(true));

	})
	.catch(error => {
      		console.log("ERROR: ",error);
      		res.status(400).send(
      			{message:'Ocurrió un error en el proceso'});
    	})
	
})

app.post('/modificarDistrito', function(req, res) {
	
	db.func('modificar_distritos',[req.query.id,req.query.nombre])
	.then(data => {
		console.log(data);
		res.end(JSON.stringify(true));

	})
	.catch(error => {
      		console.log("ERROR: ",error);
      		res.status(400).send(
      			{message:'Ocurrió un error en el proceso'});
    	})
	
})

app.delete('/eliminarDistrito', function(req, res) {
	
	db.func('borrar_distrito',[req.query.id])
	.then(data => {
		console.log(data);
		res.end(JSON.stringify(true));

	})
	.catch(error => {
      		console.log("ERROR: ",error);
      		res.status(400).send(
      			{message:'Ocurrió un error en el proceso'});
    	})
	
})

app.get('/obtenerDistritos', function(req, res) {
	
	if (req.query.iddistrito==-1){
		console.log("cambiado idcanton");
		req.query.iddistrito=null;
	}
	if (req.query.idcanton==-1){
		console.log("cambiado idprovincia");
		req.query.idcanton=null;
	}
	if(req.query.nombre==-1){
		console.log("cambiado nombre");
		req.query.nombre=null;
	}
	
	db.func('seleccionar_distritos',[req.query.iddistrito,
		req.query.idcanton,req.query.nombre])
	.then(data => {
		console.log(data);
		res.end(JSON.stringify(data));

	})
	.catch(error => {
      		console.log("ERROR: ",error);
      		res.status(400).send(
      			{message:'Ocurrió un error en el proceso'});
    	})
	
})


//================================================================================================
//      Esquema accidentes
//================================================================================================


app.post('/insertarAccidente', function(req, res) {
	
	db.func('insertar_accidente',[req.query.idtipolesion,
		req.query.fecha])
	.then(data => {
		console.log(data);
		res.end(JSON.stringify(true));

	})
	.catch(error => {
      		console.log("ERROR: ",error);
      		res.status(400).send(
      			{message:'Ocurrió un error en el proceso'});
    	})
	
})

app.post('/modificarAccidente', function(req, res) {
	
	db.func('modificar_accidente',[req.query.id,
		req.query.idtipolesion,req.query.fecha])
	.then(data => {
		console.log(data);
		res.end(JSON.stringify(true));

	})
	.catch(error => {
      		console.log("ERROR: ",error);
      		res.status(400).send(
      			{message:'Ocurrió un error en el proceso'});
    	})
	
})

app.delete('/eliminarAccidente', function(req, res) {
	
	db.func('borrar_accidente',[req.query.id])
	.then(data => {
		console.log(data);
		res.end(JSON.stringify(true));

	})
	.catch(error => {
      		console.log("ERROR: ",error);
      		res.status(400).send(
      			{message:'Ocurrió un error en el proceso'});
    	})
	
})


app.post('/insertarAccidenteGeneral', function(req, res) {
	var id;
	client = new pg.Client(conString);
  	client.connect();
    client.query
    ('SELECT MAX(Id) into ($1) from AccidentesTran.Accidentes',
    	[id],function(err,result){
    		if (err)
   			{
      		console.log(err);
      		res.status(400).send(
      			{message:'Ocurrió un error en el proceso'});
      		return;
    		}
    		console.log("true");
    		client.end();
    		//insertar accidente general y relacionarlo con esa id
    		db.func('insertar_accidentesGenerales',
    			[id,
    			req.query.horainicio,
    			req.query.horafinal,
    			req.query.area,
    			req.query.distrito,
    			req.query.tiporuta,
    			req.query.circulacion,
    			req.query.tiempo,
    			req.query.calzada,
    			req.query.calzadavertical,
    			req.query.calzadahorizontal,
    			req.query.tipoaccidente,
    			req.query.kilometro,
    			req.query.ruta])
				.then(data => {
					console.log(data);
					res.end(JSON.stringify(true));

				})
				.catch(error => {
      			    console.log("ERROR: ",error);
      				res.status(400).send(
      			{message:'Ocurrió un error en el proceso'});
    			})

    			});

   })



app.post('/modificarAccidenteGeneral', function(req, res) {
	
	db.func('modificar_accidentesGenerales',
		[req.query.id,
    	req.query.horainicio,
    	req.query.horafinal,
    	req.query.area,
    	req.query.distrito,
    	req.query.tiporuta,
    	req.query.circulacion,
    	req.query.tiempo,
    	req.query.calzada,
    	req.query.calzadavertical,
    	req.query.calzadahorizontal,
    	req.query.tipoaccidente,
    	req.query.kilometro,
    	req.query.ruta])
	.then(data => {
		console.log(data);
		res.end(JSON.stringify(true));

	})
	.catch(error => {
      		console.log("ERROR: ",error);
      		res.status(400).send(
      			{message:'Ocurrió un error en el proceso'});
    	})
	
})


app.delete('/eliminarAccidenteGeneral', function(req, res) {
	
	db.func('borrar_accidentesGenerales',[req.query.id])
	.then(data => {
		console.log(data);
		res.end(JSON.stringify(true));

	})
	.catch(error => {
      		console.log("ERROR: ",error);
      		res.status(400).send(
      			{message:'Ocurrió un error en el proceso'});
    	})
	
})


app.post('/insertarAccidentePersona', function(req, res) {
	
	var id;
	client = new pg.Client(conString);
  	client.connect();
    client.query
    ('SELECT MAX(Id) into ($1) from AccidentesTran.Accidentes',
    	[id],function(err,result){
    		if (err)
   			{
      		console.log(err);
      		res.status(400).send(
      			{message:'Ocurrió un error en el proceso'});
      		return;
    		}
    		console.log("true");
    		client.end();
    		//insertar accidente general y relacionarlo con esa id
    		db.func('insertar_accidentesGenerales',
    			[req.query.edad,
    			req.query.sexo,
    			req.query.rolpersona,
    			id])
				.then(data => {
					console.log(data);
					res.end(JSON.stringify(true));

				})
					.catch(error => {
      				console.log("ERROR: ",error);
      				res.status(400).send(
      			{message:'Ocurrió un error en el proceso'});
    			})

    			});
	
})


app.post('/modificarAccidentePersona', function(req, res) {
	
	db.func('modificar_accidentePersona',
		[req.query.id,
		req.query.edad,req.query.sexo,req.query.rolpersona])
	.then(data => {
		console.log(data);
		res.end(JSON.stringify(true));

	})
	.catch(error => {
      		console.log("ERROR: ",error);
      		res.status(400).send(
      			{message:'Ocurrió un error en el proceso'});
    	})
	
})

app.delete('/eliminarAccidentePersona', function(req, res) {
	
	db.func('borrar_accidentePersona',[req.query.id])
	.then(data => {
		console.log(data);
		res.end(JSON.stringify(true));

	})
	.catch(error => {
      		console.log("ERROR: ",error);
      		res.status(400).send(
      			{message:'Ocurrió un error en el proceso'});
    	})
	
})


app.post('/insertarHeridos', function(req, res) {
	var id;
	client = new pg.Client(conString);
  	client.connect();
    client.query
    ('SELECT MAX(Id) into ($1) from AccidentesTran.Accidentes',
    	[id],function(err,result){
    		if (err)
   			{
      		console.log(err);
      		res.status(400).send(
      			{message:'Ocurrió un error en el proceso'});
      		return;
    		}
    		console.log("true");
    		client.end();
    		//insertar accidente general y relacionarlo con esa id
    		db.func('insertar_Heridos',
    			[id,
    			req.query.iddistrito])
				.then(data => {
					console.log(data);
					res.end(JSON.stringify(true));

				})
					.catch(error => {
      				console.log("ERROR: ",error);
      				res.status(400).send(
      			{message:'Ocurrió un error en el proceso'});
    			})

    			});

   })



app.post('/modificarHeridos', function(req, res) {
	
	db.func('modificar_Heridos',
		[req.query.id,
		req.query.iddistrito])
	.then(data => {
		console.log(data);
		res.end(JSON.stringify(true));

	})
	.catch(error => {
      		console.log("ERROR: ",error);
      		res.status(400).send(
      			{message:'Ocurrió un error en el proceso'});
    	})
	
})

app.delete('/eliminarHeridos', function(req, res) {
	
	db.func('borrar_Heridos',
		[req.query.id])
	.then(data => {
		console.log(data);
		res.end(JSON.stringify(true));

	})
	.catch(error => {
      		console.log("ERROR: ",error);
      		res.status(400).send(
      			{message:'Ocurrió un error en el proceso'});
    	})
	
})


app.post('/insertarFallecido', function(req, res) {
	var id;
	client = new pg.Client(conString);
  	client.connect();
    client.query
    ('SELECT MAX(Id) into ($1) from AccidentesTran.Accidentes',
    	[id],function(err,result){
    		if (err)
   			{
      		console.log(err);
      		res.status(400).send(
      			{message:'Ocurrió un error en el proceso'});
      		return;
    		}
    		console.log("true");
    		client.end();
    		//insertar accidente general y relacionarlo con esa id
    		db.func('insertar_fallecido',
    			[req.query.idcanton,
    			req.query.horainicio,
    			req.query.horafinal,
    			req.query.tipoaccidente,
    			req.query.ruta,
    			id])
				.then(data => {
					console.log(data);
					res.end(JSON.stringify(true));

				})
					.catch(error => {
      				console.log("ERROR: ",error);
      				res.status(400).send(
      			{message:'Ocurrió un error en el proceso'});
    			})

    			});

    

   })


app.post('/modificarFallecido', function(req, res) {
	
	db.func('modificar_fallecido',
		[req.query.id,
		req.query.idcanton,
		req.query.horainicio,
		req.query.horafinal,
		req.query.tipoaccidente,
		req.query.ruta])
	.then(data => {
		console.log(data);
		res.end(JSON.stringify(true));

	})
	.catch(error => {
      		console.log("ERROR: ",error);
      		res.status(400).send(
      			{message:'Ocurrió un error en el proceso'});
    	})
	
})

app.delete('/eliminarFallecido', function(req, res) {
	
	db.func('borrar_fallecido',
		[req.query.id])
	.then(data => {
		console.log(data);
		res.end(JSON.stringify(true));

	})
	.catch(error => {
      		console.log("ERROR: ",error);
      		res.status(400).send(
      			{message:'Ocurrió un error en el proceso'});
    	})
	
})



//============================================================
// Esquema Detalles Accidentes
//============================================================

app.post('/insertarTipoCirculacion', function(req, res) {
	
	db.func('insertar_TiposCirculacion',
		[req.query.valor])
	.then(data => {
		console.log(data);
		res.end(JSON.stringify(true));

	})
	.catch(error => {
      		console.log("ERROR: ",error);
      		res.status(400).send(
      			{message:'Ocurrió un error en el proceso'});
    	})
	
})


app.post('/modificarTipoCirculacion', function(req, res) {
	
	db.func('modificar_TiposCirculacion',
		[req.query.id,req.query.valor])
	.then(data => {
		console.log(data);
		res.end(JSON.stringify(true));

	})
	.catch(error => {
      		console.log("ERROR: ",error);
      		res.status(400).send(
      			{message:'Ocurrió un error en el proceso'});
    	})
	
})

app.delete('/eliminarTipoCirculacion', function(req, res) {
	
	db.func('borrar_TiposCirculacion',
		[req.query.id])
	.then(data => {
		console.log(data);
		res.end(JSON.stringify(true));

	})
	.catch(error => {
      		console.log("ERROR: ",error);
      		res.status(400).send(
      			{message:'Ocurrió un error en el proceso'});
    	})
	
})


app.get('/obtenerTiposCirculacion', function(req, res) {
	
	db.func('seleccionar_tiposCirculacion')
	.then(data => {
		console.log(data);
		res.end(JSON.stringify(data));

	})
	.catch(error => {
      		console.log("ERROR: ",error);
      		res.status(400).send(
      			{message:'Ocurrió un error en el proceso'});
    	})
	
})



app.post('/insertarEstadoTiempo', function(req, res) {
	
	db.func('insertar_estadoTiempo',
		[req.query.valor])
	.then(data => {
		console.log(data);
		res.end(JSON.stringify(true));

	})
	.catch(error => {
      		console.log("ERROR: ",error);
      		res.status(400).send(
      			{message:'Ocurrió un error en el proceso'});
    	})
	
})


app.post('/modificarEstadoTiempo', function(req, res) {
	
	db.func('modificar_estadoTiempo',
		[req.query.id,req.query.valor])
	.then(data => {
		console.log(data);
		res.end(JSON.stringify(true));

	})
	.catch(error => {
      		console.log("ERROR: ",error);
      		res.status(400).send(
      			{message:'Ocurrió un error en el proceso'});
    	})
	
})

app.delete('/eliminarEstadoTiempo', function(req, res) {
	
	db.func('borrar_estadoTiempo',
		[req.query.id])
	.then(data => {
		console.log(data);
		res.end(JSON.stringify(true));

	})
	.catch(error => {
      		console.log("ERROR: ",error);
      		res.status(400).send(
      			{message:'Ocurrió un error en el proceso'});
    	})
	
})


app.get('/obtenerEstadosTiempo', function(req, res) {
	
	db.func('seleccionar_estadoTiempo')
	.then(data => {
		console.log(data);
		res.end(JSON.stringify(data));

	})
	.catch(error => {
      		console.log("ERROR: ",error);
      		res.status(400).send(
      			{message:'Ocurrió un error en el proceso'});
    	})
	
})

app.post('/insertarTipoCalzada', function(req, res) {
	
	db.func('insertar_tiposCalzadas',
		[req.query.valor])
	.then(data => {
		console.log(data);
		res.end(JSON.stringify(true));

	})
	.catch(error => {
      		console.log("ERROR: ",error);
      		res.status(400).send(
      			{message:'Ocurrió un error en el proceso'});
    	})
	
})


app.post('/modificarTipoCalzada', function(req, res) {
	
	db.func('modificar_tiposCalzadas',
		[req.query.id,req.query.valor])
	.then(data => {
		console.log(data);
		res.end(JSON.stringify(true));

	})
	.catch(error => {
      		console.log("ERROR: ",error);
      		res.status(400).send(
      			{message:'Ocurrió un error en el proceso'});
    	})
	
})

app.delete('/eliminarTipoCalzada', function(req, res) {
	
	db.func('borrar_TiposCalzadas',
		[req.query.id])
	.then(data => {
		console.log(data);
		res.end(JSON.stringify(true));

	})
	.catch(error => {
      		console.log("ERROR: ",error);
      		res.status(400).send(
      			{message:'Ocurrió un error en el proceso'});
    	})
	
})


app.get('/obtenerTiposCalzadas', function(req, res) {
	
	db.func('seleccionar_tiposCalzadas')
	.then(data => {
		console.log(data);
		res.end(JSON.stringify(data));

	})
	.catch(error => {
      		console.log("ERROR: ",error);
      		res.status(400).send(
      			{message:'Ocurrió un error en el proceso'});
    	})
	
})

app.post('/insertarDescripcionCalzada', function(req, res) {
	
	db.func('insertar_descripcionCalzada',
		[req.query.valor])
	.then(data => {
		console.log(data);
		res.end(JSON.stringify(true));

	})
	.catch(error => {
      		console.log("ERROR: ",error);
      		res.status(400).send(
      			{message:'Ocurrió un error en el proceso'});
    	})
	
})


app.post('/modificarDescripcionCalzada', function(req, res) {
	
	db.func('modificar_descripcionCalzada',
		[req.query.id,req.query.valor])
	.then(data => {
		console.log(data);
		res.end(JSON.stringify(true));

	})
	.catch(error => {
      		console.log("ERROR: ",error);
      		res.status(400).send(
      			{message:'Ocurrió un error en el proceso'});
    	})
	
})

app.delete('/eliminarDescripcionCalzada', function(req, res) {
	
	db.func('borrar_descripcionCalzada',
		[req.query.id])
	.then(data => {
		console.log(data);
		res.end(JSON.stringify(true));

	})
	.catch(error => {
      		console.log("ERROR: ",error);
      		res.status(400).send(
      			{message:'Ocurrió un error en el proceso'});
    	})
	
})


app.get('/obtenerDescripcionesCalzadas', function(req, res) {
	
	db.func('seleccionar_descripcionCalzada')
	.then(data => {
		console.log(data);
		res.end(JSON.stringify(data));

	})
	.catch(error => {
      		console.log("ERROR: ",error);
      		res.status(400).send(
      			{message:'Ocurrió un error en el proceso'});
    	})
	
})

app.post('/insertarTipoLesion', function(req, res) {
	
	db.func('insertar_tiposLesiones',
		[req.query.valor])
	.then(data => {
		console.log(data);
		res.end(JSON.stringify(true));

	})
	.catch(error => {
      		console.log("ERROR: ",error);
      		res.status(400).send(
      			{message:'Ocurrió un error en el proceso'});
    	})
	
})


app.post('/modificarTipoLesion', function(req, res) {
	
	db.func('modificar_tiposLesiones',
		[req.query.id,req.query.valor])
	.then(data => {
		console.log(data);
		res.end(JSON.stringify(true));

	})
	.catch(error => {
      		console.log("ERROR: ",error);
      		res.status(400).send(
      			{message:'Ocurrió un error en el proceso'});
    	})
	
})

app.delete('/eliminarTipoLesion', function(req, res) {
	
	db.func('borrar_tiposLesiones',
		[req.query.id])
	.then(data => {
		console.log(data);
		res.end(JSON.stringify(true));

	})
	.catch(error => {
      		console.log("ERROR: ",error);
      		res.status(400).send(
      			{message:'Ocurrió un error en el proceso'});
    	})
	
})


app.get('/obtenerTiposLesiones', function(req, res) {
	
	db.func('seleccionar_tiposLesiones')
	.then(data => {
		console.log(data);
		res.end(JSON.stringify(data));

	})
	.catch(error => {
      		console.log("ERROR: ",error);
      		res.status(400).send(
      			{message:'Ocurrió un error en el proceso'});
    	})
	
})

app.post('/insertarKilometroRuta', function(req, res) {
	
	db.func('insertar_kilometrosRutas',
		[req.query.valor])
	.then(data => {
		console.log(data);
		res.end(JSON.stringify(true));

	})
	.catch(error => {
      		console.log("ERROR: ",error);
      		res.status(400).send(
      			{message:'Ocurrió un error en el proceso'});
    	})
	
})


app.post('/modificarKilometroRuta', function(req, res) {
	
	db.func('modificar_kilometrosRutas',
		[req.query.id,req.query.valor])
	.then(data => {
		console.log(data);
		res.end(JSON.stringify(true));

	})
	.catch(error => {
      		console.log("ERROR: ",error);
      		res.status(400).send(
      			{message:'Ocurrió un error en el proceso'});
    	})
	
})

app.delete('/eliminarKilometroRuta', function(req, res) {
	
	db.func('borrar_kilometrosRutas',
		[req.query.id])
	.then(data => {
		console.log(data);
		res.end(JSON.stringify(true));

	})
	.catch(error => {
      		console.log("ERROR: ",error);
      		res.status(400).send(
      			{message:'Ocurrió un error en el proceso'});
    	})
	
})


app.get('/obtenerKilometrosRutas', function(req, res) {
	
	db.func('seleccionar_kilometrosRutas')
	.then(data => {
		console.log(data);
		res.end(JSON.stringify(data));

	})
	.catch(error => {
      		console.log("ERROR: ",error);
      		res.status(400).send(
      			{message:'Ocurrió un error en el proceso'});
    	})
	
})

app.post('/insertarTipoAccidente', function(req, res) {
	
	db.func('insertar_tiposAccidente',
		[req.query.valor])
	.then(data => {
		console.log(data);
		res.end(JSON.stringify(true));

	})
	.catch(error => {
      		console.log("ERROR: ",error);
      		res.status(400).send(
      			{message:'Ocurrió un error en el proceso'});
    	})
	
})


app.post('/modificarTipoAccidente', function(req, res) {
	
	db.func('modificar_tiposAccidente',
		[req.query.id,req.query.valor])
	.then(data => {
		console.log(data);
		res.end(JSON.stringify(true));

	})
	.catch(error => {
      		console.log("ERROR: ",error);
      		res.status(400).send(
      			{message:'Ocurrió un error en el proceso'});
    	})
	
})

app.delete('/eliminarTipoAccidente', function(req, res) {
	
	db.func('borrar_tiposAccidente',
		[req.query.id])
	.then(data => {
		console.log(data);
		res.end(JSON.stringify(true));

	})
	.catch(error => {
      		console.log("ERROR: ",error);
      		res.status(400).send(
      			{message:'Ocurrió un error en el proceso'});
    	})
	
})


app.get('/obtenerTiposAccidentes', function(req, res) {
	
	db.func('seleccionar_tiposAccidente')
	.then(data => {
		console.log(data);
		res.end(JSON.stringify(data));

	})
	.catch(error => {
      		console.log("ERROR: ",error);
      		res.status(400).send(
      			{message:'Ocurrió un error en el proceso'});
    	})
	
})

app.post('/insertarRolPersona', function(req, res) {
	
	db.func('insertar_rolesPersonas',
		[req.query.valor])
	.then(data => {
		console.log(data);
		res.end(JSON.stringify(true));

	})
	.catch(error => {
      		console.log("ERROR: ",error);
      		res.status(400).send(
      			{message:'Ocurrió un error en el proceso'});
    	})
	
})


app.post('/modificarRolPersona', function(req, res) {
	
	db.func('modificar_rolesPersonas',
		[req.query.id,req.query.valor])
	.then(data => {
		console.log(data);
		res.end(JSON.stringify(true));

	})
	.catch(error => {
      		console.log("ERROR: ",error);
      		res.status(400).send(
      			{message:'Ocurrió un error en el proceso'});
    	})
	
})

app.delete('/eliminarRolPersona', function(req, res) {
	
	db.func('borrar_rolesPersonas',
		[req.query.id])
	.then(data => {
		console.log(data);
		res.end(JSON.stringify(true));

	})
	.catch(error => {
      		console.log("ERROR: ",error);
      		res.status(400).send(
      			{message:'Ocurrió un error en el proceso'});
    	})
	
})


app.get('/obtenerRolesPersonas', function(req, res) {
	
	db.func('seleccionar_rolesPersonas')
	.then(data => {
		console.log(data);
		res.end(JSON.stringify(data));

	})
	.catch(error => {
      		console.log("ERROR: ",error);
      		res.status(400).send(
      			{message:'Ocurrió un error en el proceso'});
    	})
	
})


//================================================================================================
//      Configuración e inicio del sistema
//================================================================================================


var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Servicio web escuchando en http://%s:%s", host, port)

})






// solicitudes
// 	**AgregarSolicitud (datos)
// 	**ObtenerSolicitud (identificador)
//  **eliminarSolicitud (identificador)
// 	**ObtenerSolicitudesNoAtendidas
// 	ObtenerSolicitudesAtendidas ?
// 	**ActualizarEstado (identificador)


// informes
// 	**AgregarInforme (datos)
// 	**ObtenerInforme (profesor | area | identificador) [obtenerlo para modificarlo, por lo que requiere el idInforme]
// 	**ObtenerInformes () [sin parámetros]
//  **ActualizarInforme (idInforme)


//[Comentario***] puede requerirse el endpoint obtenerInforme y obtenerSolicitud (por id)

//Las funciones ObtenerInforme y ObtenerInformes son básicamente la misma con diferentes parámetros y con diferentes nombres
//(debido a que el parámetro es del mismo tipo para la mayoría de los casos)

//Asumiendo que sólo se mantendrán registrados los informes de un semestres el procedimiento para obtener todos será un 'select *'

// 	**ObtenerImagenes (idInforme | area)
// 	**ModificarInforme
// 	*EliminarInforme


//Procedimientos almacenados realizados (faltan pruebas con datos)