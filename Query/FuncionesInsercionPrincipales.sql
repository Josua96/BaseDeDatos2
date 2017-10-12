/**

	FUNCIONES PRINCIPALES DE INSERCION EN LAS TRES TABLAS DE ACCIDENTES

*/





--RETORNA el numero del dia dependiendo del texto recibido por parametro
CREATE OR REPLACE FUNCTION retornar_dia
(
 p_dia VARCHAR(10)
)
RETURNS INT
AS
$BODY$
DECLARE numero INT;
BEGIN
	IF (p_dia LIKE 'Lunes') THEN 
		numero=1;
	ELSIF (p_dia LIKE 'Martes') THEN
		numero=2;

	ELSIF (p_dia LIKE 'Mierccoles') THEN
		numero=3;
	ELSIF (p_dia LIKE 'Jueves') THEN
		numero=4;
	ELSIF (p_dia LIKE 'Viernes') THEN
		numero=5;
	ELSIF (p_dia LIKE 'Sabado') THEN
		numero=6;
	ELSIF (p_dia LIKE 'Domingo') THEN
		numero=7;
	END IF;
	RETURN numero;	
END;
$BODY$
LANGUAGE plpgsql;

--RETORNA el numero del mes dependiendo del texto recibido por parametro
CREATE OR REPLACE FUNCTION retornar_mes
(
 p_mes VARCHAR(10)
)
RETURNS INT
AS
$BODY$
DECLARE numero INT;
BEGIN
	IF (p_mes LIKE 'Enero') THEN 
		numero=1;
	ELSIF (p_mes LIKE 'Febrero') THEN
		numero=2;

	ELSIF (p_mes LIKE 'Marzo') THEN
		numero=3;
	ELSIF (p_mes LIKE 'Abril') THEN
		numero=4;
	ELSIF (p_mes LIKE 'Mayo') THEN
		numero=5;
	ELSIF (p_mes LIKE 'Junio') THEN
		numero=6;
	ELSIF (p_mes LIKE 'Julio') THEN
		numero=7;

	ELSIF (p_mes LIKE 'Agosto') THEN
		numero=8;

	ELSIF (p_mes LIKE 'Setiembre') THEN
		numero=9;

	ELSIF (p_mes LIKE 'Octubre') THEN
		numero=10;

	ELSIF (p_mes LIKE 'Novimbre') THEN
		numero=11;
		
	ELSIF (p_mes LIKE 'Diciembre') THEN
		numero=12;
			
	END IF;
	RETURN numero;	
END;
$BODY$
LANGUAGE plpgsql;

select insert_calzadaD ('calzadaPrueba');
select * from DetallesAccidentes.DescripcionesCalzadas 
drop function insert_calzadAD(VARCHAR)
CREATE OR REPLACE FUNCTION insert_calzadaD
(p_descripcion VARCHAR(50)
)
RETURNS INTEGER
AS
$BODY$
DECLARE idC INT;
BEGIN
--insertar descripcion
	IF (SELECT COUNT(*) FROM DetallesAccidentes.DescripcionesCalzadas WHERE Descripcion LIKE p_descripcion)=0 THEN
		PERFORM insertar_descripcionCalzada(p_descripcion);
		idC=(SELECT MAX(Id) FROM DetallesAccidentes.DescripcionesCalzadas);
	ELSE 
		idC=(SELECT Id FROM DetallesAccidentes.DescripcionesCalzadas WHERE Descripcion LIKE p_descripcion);
	END IF;
	
	RETURN idC;

END;
$BODY$
LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION insert_rutaKilometro
(

 p_rutaKilometro VARCHAR(20)
)
RETURNS INT
AS
$BODY$
DECLARE idA INT;
BEGIN
	--insertar ruta o kilometro
	IF ((SELECT COUNT(*) FROM DetallesAccidentes.KilometrosRutas WHERE Numero LIKE p_rutaKilometro)=0)THEN
		PERFORM  insertar_kilometrosRutas(p_rutaKilometro);
		idA=(SELECT MAX(Id) FROM DetallesAccidentes.KilometrosRutas);
	ELSE 
		idA=(SELECT Id FROM DetallesAccidentes.KilometrosRutas WHERE Numero LIKE p_rutaKilometro);
	END IF;
	RETURN idA;
END;
$BODY$
LANGUAGE plpgsql;

Select insert_accidente('prueba','2017-02-03')
select * from DetallesAccidentes.TiposLesiones

CREATE OR REPLACE FUNCTION insert_accidente
(
 p_tipoLesion VARCHAR(50),
 p_fecha DATE
)
RETURNS INT
AS
$BODY$
DECLARE idA INT;
BEGIN

	--insertar tipo lesion
	IF ((SELECT COUNT(*) FROM DetallesAccidentes.TiposLesiones WHERE Tipo LIKE p_tipoLesion)=0)THEN

		PERFORM  insertar_TiposLesiones(p_tipoLesion);
		
		idA=(SELECT MAX(Id) FROM DetallesAccidentes.TiposLesiones);
		
	ELSE 
	
		idA=(SELECT Id FROM DetallesAccidentes.TiposLesiones WHERE Tipo LIKE p_tipoLesion);
	END IF;
	

	PERFORM  insertar_accidente(idA,p_fecha);
	idA=(SELECT MAX(Id) FROM AccidentesTran.Accidentes);

	RETURN idA;
END;
$BODY$
LANGUAGE plpgsql;

/**
	INSERCION ACCIDENTES GENERALES
*/
CREATE OR REPLACE FUNCTION insertarAccidenteGeneral
(

 p_tipoLesion VARCHAR(50),
 p_tipoAccidente VARCHAR(20),
 p_year CHAR(4),
 p_mes VARCHAR(10),
 p_dia VARCHAR(10),
 p_hora VARCHAR(20),
 p_provincia VARCHAR (50),
 p_canton VARCHAR(50),
 p_distrito VARCHAR(50),
 p_ruta VARCHAR(20), 
 p_kilometro VARCHAR(20),
 p_tipoRuta VARCHAR(20),
 p_areaGeografica VARCHAR(20),
 p_calzadaVertical VARCHAR(20),
 p_calzadaHorizontal VARCHAR(20),
 p_tipoCalzada VARCHAR(20),
 p_estadoTiempo VARCHAR(20),
 p_tipoCirculacion VARCHAR(20)
)
RETURNS VOID
AS
$BODY$
DECLARE idAccident INT;  /** VARIABLES REQUERIDAS PARA LA INSERCION  */
	idLesion INT;
	idTipoAccidente INT;
	fecha DATE;
	horaIni TIME;
	horaFin TIME;
	idProvince INT;
	idCant INT;
	idDistrit INT;
	idRut INT;
	idKilom INT;
	tipRuta CHAR(1);
	areaGeo CHAR(1);
	idCalzadaVer INT;
	idCalzadaHor INT;
	idTipCalzada INT;
	idEstadoT INT;
	idTipoCir INT;
		
BEGIN   --buscar tipo de lesion
	fecha=(SELECT CAST(((SELECT retornar_mes(p_mes))||'-'||(SELECT retornar_dia(p_dia))||'-'||p_year) AS DATE));
	idAccident=(SELECT insert_accidente(p_tipoLesion,fecha));
	
	--buscar tipo accidente
	IF ((SELECT COUNT(*) FROM DetallesAccidentes.TiposAccidentes WHERE Tipo LIKE p_tipoAccidente)=0)THEN
		PERFORM insertar_TiposAccidente(p_tipoAccidente);
		idTipoAccidente=(SELECT MAX(Id) FROM DetallesAccidentes.TiposAccidentes);
	ELSE 
		idTipoAccidente=(SELECT Id FROM DetallesAccidentes.TiposAccidentes WHERE Tipo LIKE p_tipoAccidente);
	END IF;
	----establecer hora inicio y hora final
	horaIni=(SELECT (CAST((SUBSTRING (p_hora FROM 0 FOR 6)) AS TIME)));
	horaFin=(SELECT (CAST((SUBSTRING (p_hora FROM 7 FOR 11)) AS TIME)));

	IF ((SELECT COUNT(*) FROM Direccion.Provincias WHERE NombreProvincia LIKE p_provincia)=0) THEN
		PERFORM insertar_provincia(p_provincia);
		idProvince=(SELECT MAX(IdProvincia) FROM Direccion.Provincias);
	ELSE
		idProvince=(SELECT IdProvincia FROM Direccion.Provincias WHERE NombreProvincia LIKE p_provincia);
	END IF;


	IF ((SELECT COUNT(*) FROM Direccion.Cantones WHERE NombreCanton LIKE p_canton)=0) THEN
		PERFORM insertar_cantones(idProvince,p_canton);
		idCant=(SELECT MAX(IdCanton) FROM Direccion.Cantones);
	ELSE
		idCant=(SELECT IdCanton FROM Direccion.Cantones WHERE NombreCanton LIKE p_canton);
	END IF;

	IF ((SELECT COUNT(*) FROM Direccion.Distritos WHERE NombreDistrito LIKE p_distrito)=0) THEN
		PERFORM insertar_distritos(idCant,p_distrito);
		idDistrit=(SELECT MAX(IdDistrito) FROM Direccion.Distritos);
	ELSE
		idDistrit=(SELECT IdDistrito FROM Direccion.Distritos WHERE NombreDistrito LIKE p_distrito);
	END IF;
	--ruta y kilometro
	idRut=(SELECT insert_rutaKilometro(p_ruta));
	idKilom=(SELECT insert_rutaKilometro(p_kilometro));

	--verificando tipo de ruta
	IF (p_tipoRuta LIKE 'Nacional') THEN
		tipRuta='N';
	ELSIF(p_tipoRuta LIKE 'Cantonal') THEN
		tipRuta='C';

	ELSE
		tipRuta='D';
	END IF;

	--verificando area geografica
	IF (p_areaGeografica LIKE 'Rural') THEN
		areaGeo='R';
	ELSIF(p_areaGeografica LIKE 'Urbana') THEN
		areaGeo='U';

	ELSE
		areaGeo='O';
	END IF;

	idCalzadaVer=(SELECT insert_calzadaD (p_calzadaVertical));
	idCalzadaHor=(SELECT insert_calzadaD (p_calzadaHorizontal));
	--tipo de calzada
	IF ((SELECT COUNT(*) FROM DetallesAccidentes.TiposCalzadas WHERE Tipo LIKE p_tipoCalzada)=0)THEN
		PERFORM insertar_TiposCalzadas(p_tipoCalzada);
		idTipCalzada=(SELECT MAX(Id) FROM DetallesAccidentes.TiposCalzadas);
	ELSE 
		idTipCalzada=(SELECT Id FROM DetallesAccidentes.TiposCalzadas WHERE Tipo LIKE p_tipoCalzada);
	END IF;
	-- estado del tiempo
	IF ((SELECT COUNT(*) FROM DetallesAccidentes.EstadosTiempo WHERE Estado LIKE p_estadoTiempo)=0)THEN
		PERFORM insertar_estadoTiempo(p_estadoTiempo);
		idEstadoT=(SELECT MAX(Id) FROM DetallesAccidentes.EstadosTiempo);
	ELSE 
		idEstadoT=(SELECT Id FROM DetallesAccidentes.EstadosTiempo WHERE Estado LIKE p_estadoTiempo);
	END IF;

	--TIPO circulacion
	IF ((SELECT COUNT(*) FROM DetallesAccidentes.TiposCirculacion WHERE Tipo LIKE p_tipoCirculacion)=0)THEN
		PERFORM insertar_TiposCirculacion(p_tipoCirculacion);
		idTipoCir=(SELECT MAX(Id) FROM DetallesAccidentes.TiposCirculacion);
	ELSE 
		idTipoCir=(SELECT Id FROM DetallesAccidentes.TiposCirculacion WHERE Tipo LIKE p_tipoCirculacion);
	END IF;

	raise notice 'tipo de ruta %',tipRuta;

	PERFORM insertar_accidentesGenerales(idAccident,horaIni,horaFin,areaGeo,idDistrit,
	tipRuta,idTipoCir,idEstadoT,idTipCalzada,idCalzadaVer,idCalzadaHor,idTipoAccidente,idKilom,idRut);
	
END;
$BODY$
LANGUAGE plpgsql;

SELECT insertarAccidenteGeneral('Con muertos y/o graves','Salió de la vía','2015','Enero','Domingo',
'18:00-23:59','Puntarenas','Coto Brus','Sabalito','617','11','Nacional','Urbana','Desconocida',
'Curva','Asfalto','Oscuro','Objeto Fijo');


/**

	Insertar accidentes fallecidos

*/


CREATE OR REPLACE FUNCTION insertarEnFallecidos
(
 p_dia VARCHAR(10),
 p_mes VARCHAR(10),
 p_year CHAR(4),
 p_tipoAccidente VARCHAR(20),
 p_provincia VARCHAR(50),
 p_canton VARCHAR(50),
 p_ruta VARCHAR(20),
 p_rolPersona VARCHAR(20),
 p_sexo VARCHAR(10),
 p_edad VARCHAR(15),
 p_hora VARCHAR(10)
 
)

RETURNS VOID 
AS
$BODY$
DECLARE	idAccident INT;  /** VARIABLES REQUERIDAS PARA LA INSERCION  */
	idLesion INT;
	idTipoAccidente INT;
	idRolPersona INT;
	fecha DATE;
	horaIni TIME;
	horaFin TIME;
	idProvince INT;
	idCant INT;
	idRut INT;
	edad INT;
	sexo BOOLEAN;
	
BEGIN
	fecha=(SELECT CAST(((SELECT retornar_mes(p_mes))||'-'||(SELECT retornar_dia(p_dia))||'-'||p_year) AS DATE));
	idAccident=(SELECT insert_accidente('Muerte',fecha));


	IF ((SELECT COUNT(*) FROM DetallesAccidentes.RolesPersonas WHERE Rol LIKE p_rolPersona)=0) THEN
		PERFORM insertar_RolesPersonas(p_rolPersona);
		idRolPersona=(SELECT MAX(Id) FROM DetallesAccidentes.RolesPersonas);
	ELSE
		idRolPersona=(SELECT Id FROM DetallesAccidentes.RolesPersonas WHERE Rol LIKE p_rolPersona);
	END IF;

	IF((p_edad LIKE 'Desconocida' or p_edad LIKE 'Desconocido'))THEN
		edad=-1;
	ELSE
		edad=(SELECT CAST(p_edad AS INT));
	END IF;

	IF (p_sexo LIKE 'Hombre') THEN 
		sexo=TRUE;
	ELSE
		sexo=FALSE;
	END IF;

	--insercion en accidentes personas
	PERFORM insertar_accidentePersona(edad,sexo,idRolPersona,idAccident);
	
	--buscar tipo accidente
	IF ((SELECT COUNT(*) FROM DetallesAccidentes.TiposAccidentes WHERE Tipo LIKE p_tipoAccidente)=0)THEN
		PERFORM insertar_TiposAccidente(p_tipoAccidente);
		idTipoAccidente=(SELECT MAX(Id) FROM DetallesAccidentes.TiposAccidentes);
	ELSE 
		idTipoAccidente=(SELECT Id FROM DetallesAccidentes.TiposAccidentes WHERE Tipo LIKE p_tipoAccidente);
	END IF;

	IF ((SELECT COUNT(*) FROM Direccion.Provincias WHERE NombreProvincia LIKE p_provincia)=0) THEN
		PERFORM insertar_provincia(p_provincia);
		idProvince=(SELECT MAX(IdProvincia) FROM Direccion.Provincias);
	ELSE
		idProvince=(SELECT IdProvincia FROM Direccion.Provincias WHERE NombreProvincia LIKE p_provincia);
	END IF;


	IF ((SELECT COUNT(*) FROM Direccion.Cantones WHERE NombreCanton LIKE p_canton)=0) THEN
		PERFORM insertar_cantones(idProvince,p_canton);
		idCant=(SELECT MAX(IdCanton) FROM Direccion.Cantones);
	ELSE
		idCant=(SELECT IdCanton FROM Direccion.Cantones WHERE NombreCanton LIKE p_canton);
	END IF;

	horaIni=(SELECT (CAST((SUBSTRING (p_hora FROM 0 FOR 3)||':00') AS TIME)));
	horaFin=(SELECT (CAST((SUBSTRING (p_hora FROM 4 FOR 5)||':00') AS TIME)));
	idRut=(SELECT insert_rutaKilometro(p_ruta));

	PERFORM insertar_fallecido(idCant,horaIni,horaFin,idTipoAccidente,idRut,idAccident);

	
END;
$BODY$
LANGUAGE plpgsql;


SELECT insertarEnFallecidos('Domingo','Enero','2016','Vuelco','Puntarenas',
'Puntarenas','17','Pasajero Carro','Mujer','22','00-06'); 

/**

	INSERTAR EN PERSONAS ACCIDENTADAS

**/

CREATE OR REPLACE FUNCTION insertarEnHeridos
(
 p_rolPersona VARCHAR(20),
 p_tipoLesion VARCHAR(20),
 p_edad VARCHAR(15), 
 p_sexo VARCHAR(10),
 p_year CHAR(4),
 p_mes VARCHAR(10),
 p_dia VARCHAR(10),
 p_provincia VARCHAR(50),
 p_canton VARCHAR(50),
 p_distrito VARCHAR(50)
)

RETURNS VOID 
AS
$BODY$
DECLARE	idAccident INT;  /** VARIABLES REQUERIDAS PARA LA INSERCION  */
	idLesion INT;
	idRolPersona INT;
	fecha DATE;
	idProvince INT;
	idCant INT;
	idDistrit INT;
	edad INT;
	sexo BOOLEAN;
	
BEGIN
	fecha=(SELECT CAST(((SELECT retornar_mes(p_mes))||'-'||(SELECT retornar_dia(p_dia))||'-'||p_year) AS DATE));
	idAccident=(SELECT insert_accidente(p_tipoLesion,fecha));


	IF ((SELECT COUNT(*) FROM DetallesAccidentes.RolesPersonas WHERE Rol LIKE p_rolPersona)=0) THEN
		PERFORM insertar_RolesPersonas(p_rolPersona);
		idRolPersona=(SELECT MAX(Id) FROM DetallesAccidentes.RolesPersonas);
	ELSE
		idRolPersona=(SELECT Id FROM DetallesAccidentes.RolesPersonas WHERE Rol LIKE p_rolPersona);
	END IF;

	IF((p_edad LIKE 'Desconocida' or p_edad LIKE 'Desconocido'))THEN
		edad=-1;
	ELSE
		edad=(SELECT CAST(p_edad AS INT));
	END IF;

	IF (p_sexo LIKE 'Hombre') THEN 
		sexo=TRUE;
	ELSE
		sexo=FALSE;
	END IF;

	--insercion en accidentes personas
	PERFORM insertar_accidentePersona(edad,sexo,idRolPersona,idAccident);
	

	IF ((SELECT COUNT(*) FROM Direccion.Provincias WHERE NombreProvincia LIKE p_provincia)=0) THEN
		PERFORM insertar_provincia(p_provincia);
		idProvince=(SELECT MAX(IdProvincia) FROM Direccion.Provincias);
	ELSE
		idProvince=(SELECT IdProvincia FROM Direccion.Provincias WHERE NombreProvincia LIKE p_provincia);
	END IF;


	IF ((SELECT COUNT(*) FROM Direccion.Cantones WHERE NombreCanton LIKE p_canton)=0) THEN
		PERFORM insertar_cantones(idProvince,p_canton);
		idCant=(SELECT MAX(IdCanton) FROM Direccion.Cantones);
	ELSE
		idCant=(SELECT IdCanton FROM Direccion.Cantones WHERE NombreCanton LIKE p_canton);
	END IF;

	IF ((SELECT COUNT(*) FROM Direccion.Distritos WHERE NombreDistrito LIKE p_distrito)=0) THEN
		PERFORM insertar_distritos(idCant,p_distrito);
		idDistrit=(SELECT MAX(IdDistrito) FROM Direccion.Distritos);
	ELSE
		idDistrit=(SELECT IdDistrito FROM Direccion.Distritos WHERE NombreDistrito LIKE p_distrito);
	END IF;

	PERFORM insertar_Heridos(idAccident,idDistrit);

	
END;
$BODY$
LANGUAGE plpgsql;


SELECT insertarEnHeridos ('Motociclista','Herido grave','48','Hombre','2012','Agosto',
			'Martes','San Jose','Puriscal','San Antonio');
			
select * from detallesAccidentes.TiposLesiones;
select * from detallesAccidentes.TiposAccidentes
select * from detallesAccidentes.KilometrosRutas
select * from detallesAccidentes.TiposCalzadas
select * from detallesAccidentes.TiposCirculacion
select * from detallesAccidentes.DescripcionesCalzadas
select * from detallesAccidentes.EstadosTiempo
select * from AccidentesTran.Accidentes;
select * from AccidentesTran.AccidentesGenerales
select * from AccidentesTran.AccidentesPersonas;
select * from AccidentesTran.Fallecidos;
select * from AccidentesTran.Heridos;

select * from Direccion.Provincias
select * from Direccion.Cantones
select * from Direccion.Distritos


select cast('1' as INT)+5
select cast(('2016-'||'3-'||'2') AS DATE)+5
select cast('18:00' as Time)
select substring('18-23' from 4 for 5)
select substring('18:00-23:59' from 7 for 11)
