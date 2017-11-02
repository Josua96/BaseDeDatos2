/**
Funciones de provincia
**/

CREATE OR REPLACE FUNCTION insertar_provincia
( 
	IN p_nombreProvincia	VARCHAR(50)
) RETURNS BOOLEAN
AS
$BODY$
BEGIN
	INSERT INTO Direccion.Provincias (NombreProvincia) VALUES (p_nombreProvincia);
	RETURN TRUE;
	
	
END;
$BODY$ 
LANGUAGE plpgsql;

-- modificar provincia
CREATE OR REPLACE FUNCTION modificar_provincias
( 
	IN p_idProvincia	INTEGER,
	IN p_nombreProvincia 	VARCHAR(50)	
) RETURNS BOOLEAN 
AS
$BODY$
BEGIN
	UPDATE Direccion.Provincias SET 
		NombreProvincia = p_nombreProvincia
	WHERE IdProvincia = p_idProvincia;
	RETURN TRUE;
	
END;
$BODY$ 
LANGUAGE plpgsql;

-- borrar provincia
CREATE OR REPLACE FUNCTION borrar_provincia
( 
	IN p_idProvincia INTEGER
) RETURNS BOOLEAN 
AS
$BODY$
BEGIN
	DELETE FROM Direccion.Provincias AS P where P.IdProvincia = p_idProvincia ;	
	RETURN TRUE;
	
	
END;
$BODY$ 
LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION seleccionar_provincias
( 
	IN p_idProvincia INTEGER,
	IN p_nombreProvincia VARCHAR(50),
	OUT v_id SMALLINT,
	OUT v_nombreprovincia VARCHAR(50)
	
) RETURNS SETOF RECORD 
AS
$BODY$
BEGIN
	RETURN query SELECT * FROM Direccion.Provincias WHERE
	(p_idProvincia isnull or IdProvincia = p_idProvincia) AND
	(p_nombreProvincia isnull or NombreProvincia similar to '%'||p_nombreProvincia||'%');
END;
$BODY$ 
LANGUAGE plpgsql;

/**Cantones  */

--insertar

CREATE OR REPLACE FUNCTION insertar_cantones
(
	IN p_idProvincia INTEGER,
	IN p_nombreCanton VARCHAR(50)
) RETURNS BOOLEAN 
AS
$BODY$
BEGIN
	INSERT INTO Direccion.Cantones(IdProvincia,NombreCanton) VALUES(CAST(p_idProvincia AS SMALLINT),p_nombreCanton);
	RETURN TRUE;
	
	
END;
$BODY$ 
LANGUAGE plpgsql;

--modificar
CREATE OR REPLACE FUNCTION modificar_cantones
(
	IN p_idCanton INTEGER,
	IN p_nombreCanton VARCHAR(50)
) RETURNS BOOLEAN 
AS
$BODY$
BEGIN
	UPDATE Direccion.Cantones SET 
		NombreCanton=p_nombreCanton
	WHERE IdCanton = p_idCanton;
	RETURN TRUE;
	

END;
$BODY$ 
LANGUAGE plpgsql;

--ELIMINAR
CREATE OR REPLACE FUNCTION borrar_cantones
(
	IN p_idCanton INTEGER
) RETURNS BOOLEAN
AS
$BODY$
BEGIN
	DELETE FROM Direccion.Cantones  where IdCanton = p_idCanton;
	RETURN TRUE;
	
END;
$BODY$ 
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION seleccionar_cantones
( 
	IN p_idCanton INTEGER,
	IN p_idProvincia INTEGER,
	IN p_nombreCanton VARCHAR(50),
	OUT v_id SMALLINT,
	OUT v_idprovincia SMALLINT,
	OUT v_nombrecanton VARCHAR(50)
	
) RETURNS SETOF RECORD 
AS
$BODY$
BEGIN
	
	RETURN query SELECT * FROM Direccion.Cantones WHERE
	(p_idCanton isnull or IdCanton = p_idCanton) AND	
	(p_nombreCanton isnull or NombreCanton similar to '%'||p_nombreCanton||'%')AND
	(p_idProvincia isnull or IdProvincia= p_idProvincia);
END;
$BODY$ 
LANGUAGE plpgsql;


/**
Distritos
*/
-- insertar distrito
CREATE OR REPLACE FUNCTION insertar_distritos
(
	IN p_IdCanton 		INTEGER,
	IN p_nombreDistrito 	VARCHAR(50)
) RETURNS BOOLEAN 
AS
$BODY$
BEGIN
	INSERT INTO Direccion.Distritos(IdCanton,nombreDistrito) VALUES (p_IdCanton,p_nombreDistrito);
	RETURN TRUE;
	

END;
$BODY$ 
LANGUAGE plpgsql;

-- modificar distrito
CREATE OR REPLACE FUNCTION modificar_distritos
( 
	IN p_idDistrito 	INTEGER,
	IN p_nombreDistrito 	VARCHAR(50)	
) RETURNS BOOLEAN 
AS
$BODY$
BEGIN
	UPDATE Direccion.Distritos SET 
		NombreDistrito = p_nombreDistrito
	WHERE IdDistrito = p_idDistrito;
	RETURN TRUE;
	
	
END;
$BODY$ 
LANGUAGE plpgsql;

-- borrar distrito
CREATE OR REPLACE FUNCTION borrar_distrito
( 
	IN p_idDistrito	INTEGER
) RETURNS BOOLEAN
AS
$BODY$
BEGIN
	DELETE FROM Direccion.Distritos AS D where D.IdDistrito = p_idDistrito;	
	RETURN TRUE;
	
END;
$BODY$ 
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION seleccionar_distritos
( 
	IN p_idDistrito INTEGER,
	IN P_idCanton INTEGER,
	IN p_nombreDistrito VARCHAR (50),
	OUT v_id SMALLINT,
	OUT v_idcanton SMALLINT,
	OUT v_nombredistrito VARCHAR(50)
	
) RETURNS SETOF RECORD 
AS
$BODY$
BEGIN
	RETURN query SELECT * FROM Direccion.Distritos WHERE
	(p_idCanton isnull or IdCanton = p_idCanton) AND	
	(p_nombreDistrito isnull or NombreDistrito similar to '%'||p_nombreDistrito||'%') AND
	(p_idDistrito isnull or IdDistrito= p_idDistrito);
END;
$BODY$ 
LANGUAGE plpgsql;


/**
--Accidentes
**/
-- insertar accidente
CREATE OR REPLACE FUNCTION insertar_accidente
(
	IN p_idTipoLesion       INTEGER,
	IN p_fechaAccidente 	DATE
) RETURNS BOOLEAN 
AS
$BODY$
BEGIN
	INSERT INTO AccidentesTran.Accidentes(IdTipoLesion, Fecha) VALUES (p_idTipoLesion, p_fechaAccidente);
	RETURN TRUE;
	
END;
$BODY$ 
LANGUAGE plpgsql;


-- modificar accidente
CREATE OR REPLACE FUNCTION modificar_accidente
( 
	IN  p_idAccidente	INTEGER,
	IN  p_idTipoLesion 	INTEGER,
	IN  p_fechaAccidente 	DATE	
) RETURNS BOOLEAN 
AS
$BODY$
BEGIN
	UPDATE AccidentesTran.Accidentes SET 
		IdTipoLesion = p_idDistrito,
		Fecha = p_fechaAccidente
	WHERE Id = p_idAccidente;
	RETURN TRUE;
	
END;
$BODY$ 
LANGUAGE plpgsql;

-- borrar accidente
CREATE OR REPLACE FUNCTION borrar_accidente
( 
	IN p_idAccidente INTEGER
) RETURNS BOOLEAN 
AS
$BODY$
BEGIN
	DELETE FROM AccidentesTran.Accidentes AS A where A.Id = p_idAccidente;	
	RETURN TRUE;
	
END;
$BODY$ 
LANGUAGE plpgsql;


/**
Accidentes Generales
**/



--INSERTAR
CREATE OR REPLACE FUNCTION insertar_accidentesGenerales
(	IN p_idAccidente INTEGER,
	IN p_horaInicio TIME,
	IN p_horaFinal TIME,
	IN p_areaGeografica CHAR(1),
	IN p_idDistrito INTEGER,
	IN p_tipoRuta CHAR(1),
	IN p_idTipoCirculacion INTEGER,
	IN p_idEstadoTiempo INTEGER,
	IN p_idTipoCalzada INTEGER,
	IN p_idDescripcionCalzadaVertical INTEGER,
	IN p_idDescripcionCalzadaHorizontal INTEGER,
	IN p_idTipoAccidente INTEGER,
	IN p_idKilometro INTEGER,
	IN p_idRuta INTEGER
) RETURNS BOOLEAN
AS
$BODY$
BEGIN
	INSERT INTO AccidentesTran.AccidentesGenerales 
	VALUES(p_idAccidente,p_horaInicio,p_horaFinal,p_areaGeografica,CAST(p_idDistrito AS SMALLINT),
	p_tipoRuta,CAST(p_idTipoCirculacion AS SMALLINT),CAST(p_idEstadoTiempo AS SMALLINT),
	CAST(p_idTipoCalzada AS SMALLINT),CAST(p_idDescripcionCalzadaVertical AS SMALLINT),
	CAST(p_idDescripcionCalzadaHorizontal AS SMALLINT),CAST(p_idTipoAccidente AS SMALLINT),CAST(p_idKilometro AS SMALLINT),CAST(p_idRuta AS SMALLINT));

	RETURN TRUE;

	

END;
$BODY$ 
LANGUAGE plpgsql;

--MODIFICAR

CREATE OR REPLACE FUNCTION modificar_accidentesGenerales
(	IN p_idAccidente INTEGER,
	IN p_horaInicio TIME,
	IN p_horaFinal TIME,
	IN p_areaGeografica CHAR(1),
	IN p_idDistrito INTEGER,
	IN p_tipoRuta CHAR(1),
	IN p_idTipoCirculacion INTEGER,
	IN p_idEstadoTiempo INTEGER,
	IN p_idTipoCalzada INTEGER,
	IN p_idDescripcionCalzadaVertical INTEGER,
	IN p_idDescripcionCalzadaHorizontal INTEGER,
	IN p_idTipoAccidente INTEGER,
	IN p_idKilometro INTEGER,
	IN p_idRuta INTEGER
) RETURNS BOOLEAN 
AS
$BODY$
BEGIN
	UPDATE AccidentesTran.AccidentesGenerales SET
	HoraInicio=p_horaInicio,HoraFinal=p_horaFinal,AreaGeografica=p_areaGeografica,IdDistrito=p_idDistrito,TipoRuta=p_tipoRuta,IdTipoCirculacion=p_idTipoCirculacion,
	IdEstadoTiempo=p_idEstadoTiempo,IdTipoCalzada=p_idTipoCalzada,IdDescripcionCalzadaVertical=p_idDescripcionCalzadaVertical,
	IdDescripcionCalzadaHorizontal=p_idDescripcionCalzadaHorizontal,IdTipoAccidente=p_idTipoAccidente,IdKilometro=p_idKilometro,IdRuta=p_idRuta
	WHERE IdAccidente=p_idAccidente;

	RETURN TRUE;
	

END;
$BODY$ 
LANGUAGE plpgsql;


--ELIMINAR
CREATE OR REPLACE FUNCTION borrar_accidentesGenerales
(	IN p_idAccidente INTEGER
) RETURNS BOOLEAN
AS
$BODY$
BEGIN
	DELETE FROM AccidentesTran.AccidentesGenerales  where IdAccidente = p_idAccidente;

	RETURN TRUE;

END;
$BODY$ 
LANGUAGE plpgsql;

/**
Accidentes Personas
**/
-- insertar accidente persona

CREATE OR REPLACE FUNCTION insertar_accidentePersona
(
	IN p_edad		INTEGER,
	IN p_sexo		BOOLEAN,
	IN p_idRolPersona	INTEGER,
	IN p_idAccidente        INTEGER
) RETURNS BOOLEAN 
AS
$BODY$
BEGIN
	INSERT INTO AccidentesTran.AccidentesPersonas(IdAccidente,Edad, Sexo, IdRolPersona) VALUES (p_idAccidente, p_edad, p_sexo, p_idRolPersona);

	RETURN TRUE;

	
END;
$BODY$ 
LANGUAGE plpgsql;

-- modificar accidente persona
CREATE OR REPLACE FUNCTION modificar_accidentePersona
( 
	IN p_idAccidentePersona INTEGER,
	IN p_edad		INTEGER,
	IN p_sexo		BOOLEAN,
	IN p_idRolPersona	INTEGER	
) RETURNS BOOLEAN
AS
$BODY$
BEGIN
	
	UPDATE AccidentesTran.Accidentes SET 
		Edad = p_edad,
		Sexo = p_sexo,
		IdRolPersona = p_idRolPersona
	WHERE IdAccidente = p_idAccidentePersona;

	RETURN TRUE;


END;
$BODY$ 
LANGUAGE plpgsql;

-- borrar accidente persona
CREATE OR REPLACE FUNCTION borrar_accidentePersona
( 
	IN p_idAccidentePersona	INTEGER
) RETURNS BOOLEAN
AS
$BODY$
BEGIN
	DELETE FROM AccidentesTran.Accidentes AS A where A.IdAccidente = p_idAccidentePersona;	

	RETURN TRUE;

END;
$BODY$ 
LANGUAGE plpgsql;


--Heridos

--INSERTAR
CREATE OR REPLACE FUNCTION insertar_Heridos
(
	IN p_idAccidente INTEGER,
	IN p_idDistrito INTEGER
) RETURNS BOOLEAN
AS
$BODY$
BEGIN
	INSERT INTO AccidentesTran.Heridos VALUES(p_idAccidente,p_idDistrito);

	RETURN TRUE;

END
$BODY$ 
LANGUAGE plpgsql;

--MODIFICIAR
CREATE OR REPLACE FUNCTION modificar_Heridos
(
	IN p_idAccidente INTEGER,
	IN p_idDistrito INTEGER
) RETURNS BOOLEAN
AS
$BODY$
BEGIN
	UPDATE AccidentesTran.Heridos SET
	IdDistrito=p_idDistrito
	WHERE IdAccidente=p_idAccidente;

	RETURN TRUE;

END
$BODY$ 
LANGUAGE plpgsql;

--ELIMINAR
CREATE OR REPLACE FUNCTION borrar_Heridos
(
	IN p_idAccidente INTEGER
) RETURNS BOOLEAN
AS
$BODY$
BEGIN
	DELETE FROM AccidentesTran.Heridos  where IdAccidente = p_idAccidente;

	RETURN TRUE;
	

END
$BODY$ 
LANGUAGE plpgsql;

--Fallecidos

-- insertar fallecido
CREATE OR REPLACE FUNCTION insertar_fallecido
(
	IN p_idCanton	 	INTEGER,
	IN p_horaInicio	 	TIME,
	IN p_horaFinal	 	TIME,
	IN p_idTipoAccidente 	INTEGER,
	IN p_idRuta	 	INTEGER,
	IN p_idAccidente	INTEGER
) RETURNS BOOLEAN 
AS
$BODY$
BEGIN
	INSERT INTO AccidentesTran.Fallecidos(IdAccidente,IdCanton, HoraInicio, HoraFinal, IdTipoAccidente, IdRuta) 
	VALUES (p_idAccidente,p_idCanton, p_horaInicio, p_horaFinal, p_idTipoAccidente, p_idRuta);

	RETURN TRUE;
	

END;
$BODY$ 
LANGUAGE plpgsql;


-- modificar fallecido
CREATE OR REPLACE FUNCTION modificar_fallecido
( 
	IN p_idFallecido	INTEGER,
	IN p_idCanton	 	INTEGER,
	IN p_horaInicio	 	TIME,
	IN p_horaFinal	 	TIME,
	IN p_idTipoAccidente 	INTEGER,
	IN p_idRuta	 	INTEGER
	
) RETURNS BOOLEAN
AS
$BODY$
BEGIN
	UPDATE AccidentesTran.Fallecidos SET 
		IdCanton = p_idCanton,
		HoraInicio = p_horaInicio,
		HoraFinal = p_horaFinal,
		IdTipoAccidente = p_idTipoAccidente,
		IdRuta = p_idRuta
	WHERE IdAccidente = p_idFallecido;

	RETURN TRUE;


END;
$BODY$ 
LANGUAGE plpgsql;

-- borrar fallecido
CREATE OR REPLACE FUNCTION borrar_fallecido
( 
	IN p_idFallecido INTEGER
) RETURNS BOOLEAN
AS
$BODY$
BEGIN
	DELETE FROM AccidentesTran.Fallecidos AS F where F.IdAccidente = p_idFallecido;	

	RETURN TRUE;

END;
$BODY$ 
LANGUAGE plpgsql;



--TiposCirculacion

--INSERTAR 
CREATE OR REPLACE FUNCTION insertar_TiposCirculacion
(
	IN p_tipo VARCHAR(50)
) RETURNS BOOLEAN
AS
$BODY$
BEGIN
	INSERT INTO DetallesAccidentes.TiposCirculacion (Tipo) VALUES(p_tipo);

	RETURN TRUE;


END
$BODY$ 
LANGUAGE plpgsql;

--MODIFICAR
CREATE OR REPLACE FUNCTION modificar_TiposCirculacion
(
	IN p_id INTEGER,
	IN p_tipo VARCHAR(50)
) RETURNS BOOLEAN
AS
$BODY$
BEGIN
	UPDATE DetallesAccidentes.TiposCirculacion SET
	Tipo=p_tipo WHERE Id=p_id;

	RETURN TRUE;

END
$BODY$ 
LANGUAGE plpgsql;

--ELIMINAR
CREATE OR REPLACE FUNCTION borrar_TiposCirculacion
(
	IN p_id INTEGER
) RETURNS BOOLEAN
AS
$BODY$
BEGIN
	DELETE FROM DetallesAccidentes.TiposCirculacion WHERE Id=p_id;
	RETURN TRUE;

END
$BODY$ 
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION seleccionar_tiposCirculacion
( 
	OUT v_id SMALLINT,
	OUT v_tipocirculacion VARCHAR(50)
	
) RETURNS SETOF RECORD 
AS
$BODY$
BEGIN
	RETURN query SELECT * FROM DetallesAccidentes.TiposCirculacion;
END;
$BODY$ 
LANGUAGE plpgsql;


--EstadosTiempo
-- insertar estados tiempo
CREATE OR REPLACE FUNCTION insertar_estadoTiempo
(
	IN p_estadoTiempo VARCHAR(50)
) RETURNS BOOLEAN 
AS
$BODY$
BEGIN
	INSERT INTO DetallesAccidentes.EstadosTiempo(Estado) VALUES (p_estadoTiempo);

	RETURN TRUE;

	
END;
$BODY$ 
LANGUAGE plpgsql;

-- modificar estados tiempo
CREATE OR REPLACE FUNCTION modificar_estadoTiempo
(
	IN p_idEstadoTiempo	INTEGER,
	IN p_estadoTiempo	VARCHAR(50)
) RETURNS BOOLEAN 
AS
$BODY$
BEGIN
	UPDATE DetallesAccidentes.EstadosTiempo SET 
		Estado = p_estadoTiempo
	WHERE Id = p_idEstadoTiempo;

	RETURN TRUE;

END;
$BODY$ 
LANGUAGE plpgsql;


-- borrar estados tiempo
CREATE OR REPLACE FUNCTION borrar_estadoTiempo
( 
	IN p_idEstadoTiempo	INTEGER
) RETURNS BOOLEAN
AS
$BODY$
BEGIN
	DELETE FROM DetallesAccidentes.EstadosTiempo AS E where E.Id = p_idEstadoTiempo;	

	RETURN TRUE;

END;
$BODY$ 
LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION seleccionar_estadoTiempo
( 
	OUT v_id SMALLINT,
	OUT v_estadotiempo VARCHAR(50)
	
) RETURNS SETOF RECORD 
AS
$BODY$
BEGIN
	RETURN query SELECT * FROM DetallesAccidentes.EstadosTiempo;
END;
$BODY$ 
LANGUAGE plpgsql;

--TiposCalzadas

--INSERTAR
CREATE OR REPLACE FUNCTION insertar_tiposCalzadas
(
	IN p_tipo VARCHAR(50)
) RETURNS BOOLEAN
AS
$BODY$
BEGIN
	INSERT INTO DetallesAccidentes.TiposCalzadas (Tipo) VALUES (p_tipo);

	RETURN TRUE;

	
END
$BODY$ 
LANGUAGE plpgsql;

--MODIFICAR
CREATE OR REPLACE FUNCTION modificar_tiposCalzadas
(
	IN p_id INTEGER,
	IN p_tipo VARCHAR(50)
) RETURNS BOOLEAN
AS
$BODY$
BEGIN
	UPDATE DetallesAccidentes.TiposCalzadas SET
	Tipo=p_tipo WHERE Id=p_id;

	RETURN TRUE;

END
$BODY$ 
LANGUAGE plpgsql;

--ELIMINAR
CREATE OR REPLACE FUNCTION borrar_tiposCalzadas
(
	IN p_id INTEGER
) RETURNS BOOLEAN
AS
$BODY$
BEGIN
	DELETE FROM DetallesAccidentes.TiposCalzadas WHERE id=p_id;

	RETURN TRUE;

END
$BODY$ 
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION seleccionar_tiposCalzadas
( 
	OUT v_id SMALLINT,
	OUT v_tipocalzada VARCHAR(50)
	
) RETURNS SETOF RECORD 
AS
$BODY$
BEGIN
	RETURN query SELECT * FROM DetallesAccidentes.TiposCalzadas;
END;
$BODY$ 
LANGUAGE plpgsql;


--DescripcionesCalzadas

-- insertar descripcion calzada
CREATE OR REPLACE FUNCTION insertar_descripcionCalzada
(
	IN p_descripcionCalzada	 	VARCHAR(50)
) RETURNS BOOLEAN
AS
$BODY$
BEGIN
	INSERT INTO DetallesAccidentes.DescripcionesCalzadas(Descripcion) VALUES (p_descripcionCalzada);

	RETURN TRUE;

END;
$BODY$ 
LANGUAGE plpgsql;

-- modificar descripcion calzada
CREATE OR REPLACE FUNCTION modificar_descripcionCalzada
(
	IN p_idDescripCalzada	INTEGER,
	IN p_descripcion	VARCHAR(50)
) RETURNS BOOLEAN
AS
$BODY$
BEGIN
	UPDATE DetallesAccidentes.DescripcionesCalzadas SET 
		Descripcion = p_descripcion
	WHERE Id = p_idDescripCalzada;

	RETURN TRUE;

END;
$BODY$ 
LANGUAGE plpgsql;

-- borrar descripcion calzada
CREATE OR REPLACE FUNCTION borrar_descripcionCalzada
( 
	IN p_idDescripCalzada	INTEGER
) RETURNS BOOLEAN
AS
$BODY$
BEGIN
	DELETE FROM DetallesAccidentes.DescripcionesCalzadas AS D where D.Id = p_idDescripCalzada;	

	RETURN TRUE;

	
END;
$BODY$ 
LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION seleccionar_descripcionCalzada
( 
	OUT v_id SMALLINT,
	OUT v_descripcioncalzada VARCHAR(50)
	
) RETURNS SETOF RECORD 
AS
$BODY$
BEGIN
	RETURN query SELECT * FROM DetallesAccidentes.DescripcionesCalzadas;

END;
$BODY$ 
LANGUAGE plpgsql;

--TiposLesiones

--INSERTAR
CREATE OR REPLACE FUNCTION insertar_tiposLesiones
(
	IN p_tipo VARCHAR(50)
) RETURNS BOOLEAN
AS
$BODY$
BEGIN
	INSERT INTO DetallesAccidentes.TiposLesiones(Tipo) VALUES 
	(p_tipo);

	RETURN TRUE;
	
END
$BODY$ 
LANGUAGE plpgsql;


--MODIFICAR
CREATE OR REPLACE FUNCTION modificar_tiposLesiones
(
	IN p_id INTEGER,
	IN p_tipo VARCHAR(50)
) RETURNS BOOLEAN
AS
$BODY$
BEGIN
	UPDATE DetallesAccidentes.TiposLesiones SET
	Tipo=p_tipo WHERE Id=p_id;

	RETURN TRUE;

END
$BODY$ 
LANGUAGE plpgsql;

--ELIMINAR
CREATE OR REPLACE FUNCTION borrar_tiposLesiones
(
	IN p_id INTEGER
) RETURNS BOOLEAN 
AS
$BODY$
BEGIN
	DELETE FROM DetallesAccidentes.TiposLesiones WHERE Id=p_id;

	RETURN TRUE;

END
$BODY$ 
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION seleccionar_tiposLesiones
( 
	OUT v_id SMALLINT,
	OUT v_tipolesion VARCHAR(50)
	
) RETURNS SETOF RECORD 
AS
$BODY$
BEGIN
	RETURN query SELECT * FROM DetallesAccidentes.TiposLesiones;
END;
$BODY$ 
LANGUAGE plpgsql;


--KilometrosRutas

--INSERTAR
CREATE OR REPLACE FUNCTION insertar_kilometrosRutas
(
	IN p_numero VARCHAR(50)
) RETURNS BOOLEAN
AS
$BODY$
BEGIN
	INSERT INTO DetallesAccidentes.KilometrosRutas(Numero) VALUES 
	 (p_numero);

	RETURN TRUE;

END
$BODY$ 
LANGUAGE plpgsql;



--MODIFICAR
CREATE OR REPLACE FUNCTION modificar_kilometrosRutas
(	IN p_id INTEGER,
	IN p_numero VARCHAR(50)
) RETURNS BOOLEAN
AS
$BODY$
BEGIN
	UPDATE DetallesAccidentes.KilometrosRutas SET
	NUMERO=p_numero WHERE Id=p_id;

	RETURN TRUE;

END
$BODY$ 
LANGUAGE plpgsql;

--ELIMINAR
CREATE OR REPLACE FUNCTION borrar_kilometrosRutas
(	
	IN p_id INTEGER
) RETURNS BOOLEAN
AS
$BODY$
BEGIN
	DELETE FROM DetallesAccidentes.KilometrosRutas 
	WHERE id=p_id;

	RETURN TRUE;

END
$BODY$ 
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION seleccionar_kilometrosRutas
( 
	OUT v_id SMALLINT,
	OUT v_kilometroruta VARCHAR(50)
	
) RETURNS SETOF RECORD 
AS
$BODY$
BEGIN
	RETURN query SELECT * FROM DetallesAccidentes.KilometrosRutas;
END;
$BODY$ 
LANGUAGE plpgsql;



--TiposAccidentes
-- insertar Tipos Accidentes
CREATE OR REPLACE FUNCTION insertar_tiposAccidente
(
	IN p_tipo  VARCHAR(50)
) RETURNS BOOLEAN
AS
$BODY$
BEGIN
	INSERT INTO DetallesAccidentes.TiposAccidentes(Tipo) VALUES (p_tipo);

	RETURN TRUE;

END;
$BODY$ 
LANGUAGE plpgsql;

-- modificar Tipos Accidentes
CREATE OR REPLACE FUNCTION modificar_tiposAccidente
(
	IN p_idTipoAccidente	INTEGER,
	IN p_tipo		VARCHAR(50)
) RETURNS BOOLEAN
AS
$BODY$
BEGIN
	UPDATE DetallesAccidentes.TiposAccidentes SET 
		Tipo = p_tipo
	WHERE Id = p_idTipoAccidente;

	RETURN TRUE;

END;
$BODY$ 
LANGUAGE plpgsql;

-- borrar Tipos Accidentes
CREATE OR REPLACE FUNCTION borrar_tiposAccidente
( 
	IN p_idTipoAccidente	INTEGER
) RETURNS BOOLEAN
AS
$BODY$
BEGIN
	DELETE FROM DetallesAccidentes.TiposAccidentes AS T where T.Id = p_idTipoAccidente;	

	RETURN TRUE;

END;
$BODY$ 
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION seleccionar_tiposAccidente
( 
	OUT v_id SMALLINT,
	OUT v_tipoAccidente VARCHAR(50)
	
) RETURNS SETOF RECORD 
AS
$BODY$
BEGIN
	RETURN query SELECT * FROM DetallesAccidentes.TiposAccidentes;
END;
$BODY$ 
LANGUAGE plpgsql;



--RolesPersonas

--INSERTAR
CREATE OR REPLACE FUNCTION insertar_rolesPersonas
(
	IN p_rol VARCHAR(50)
) RETURNS BOOLEAN
AS
$BODY$
BEGIN
	INSERT INTO DetallesAccidentes.RolesPersonas(Rol) VALUES 
	(p_rol);

	RETURN TRUE;

END
$BODY$ 
LANGUAGE plpgsql;

--MODIFICAR
CREATE OR REPLACE FUNCTION modificar_rolesPersonas
(	IN p_id INTEGER,
	IN p_rol VARCHAR(50)
) RETURNS BOOLEAN
AS
$BODY$
BEGIN
	UPDATE DetallesAccidentes.RolesPersonas SET
	Rol=p_rol WHERE Id=p_id;

	RETURN TRUE;

END
$BODY$ 
LANGUAGE plpgsql;

--ELIMINAR
CREATE OR REPLACE FUNCTION borrar_rolesPersonas
(	
	IN p_id INTEGER
) RETURNS BOOLEAN
AS
$BODY$
BEGIN
	DELETE FROM DetallesAccidentes.RolesPersonas
	WHERE id=p_id;

	RETURN TRUE;

END
$BODY$ 
LANGUAGE plpgsql;

--SELECCIONAR
CREATE OR REPLACE FUNCTION seleccionar_rolesPersonas
( 
	OUT v_id SMALLINT,
	OUT v_rolPersona VARCHAR(50)
	
) RETURNS SETOF RECORD 
AS
$BODY$
BEGIN
	RETURN query SELECT * FROM DetallesAccidentes.RolesPersonas;
END;
$BODY$ 
LANGUAGE plpgsql;
