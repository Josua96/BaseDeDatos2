

--insercion de accidentes generales desde el sitio web
CREATE OR REPLACE FUNCTION insertarAccidenteGeneralWeb
(

 IN p_horaInicio TIME,
 IN p_horaFinal TIME,
 IN p_areaGeografica VARCHAR(20),
 IN p_idDistrito INT,
 IN p_tipoRuta VARCHAR(20),
 IN p_idTipoCirculacion INT
 IN p_IdEstadoTiempo INT,
 IN p_idTipoCalzada INT
 IN p_calzadaVertical INT,
 IN p_calzadaHorizontal INT,
 IN p_idTipoAccidente INT,
 IN p_idKilometro INT,
 IN p_idRuta INT, 
 IN p_fecha DATE,
 IN p_idTipoLesion INT
 
)
RETURNS BOOLEAN
AS
$BODY$
DECLARE idAccident INT;  /** VARIABLE REQUERIDA PARA LA INSERCION  */
	tipRuta char(1);
	areaGeo char(1);
		
BEGIN   
	idAccident=(SELECT insert_accidente(p_idTipoLesion,p_fecha));
	
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

	PERFORM insertar_accidentesGenerales(idAccident,p_horaInicio,p_horaFinal,areaGeo,p_idDistrito,
	tipRuta,p_idTipoCirculacion,p_idEstadoTiempo,p_idTipoCalzada,p_idCalzadaVertical,p_idCalzadaHorizontal,p_idTipoAccidente,p_idKilometro,p_idRuta);
	RETURN TRUE;
	
END;
$BODY$
LANGUAGE plpgsql;



select * from AccidentesTran.Accidentes

CREATE OR REPLACE FUNCTION insertarEnFallecidosWeb
(
 IN p_fecha DATE,
 IN p_idRolPersona INT,
 IN p_edad INT,
 IN p_sexo BOOLEAN,
 IN p_idCanton INT,
 IN p_horaInicio TIME,
 IN p_horaFinal TIME,
 IN p_idTipoAccidente INT,
 IN p_idRuta INT 
)

RETURNS void
AS
$BODY$
DECLARE	idAccident INT;  /** VARIABLES REQUERIDAS PARA LA INSERCION  **/
	idLesion INT;
	
	
BEGIN
	idLesion=(SELECT id FROM DetallesAccidentes.TiposLesiones WHERE Tipo SIMILAR TO '%Muerte%' );

	PERFORM insertar_accidente(idLesion,p_fecha);
	idAccident=(SELECT MAX(id) FROM AccidentesTran.Accidentes);

	--insercion en accidentes personas
	PERFORM insertar_accidentePersona(p_edad,p_sexo,p_idRolPersona,idAccident);
	
	PERFORM insertar_fallecido(p_idCanton,p_horaInicio,p_horaFinal,p_idTipoAccidente,p_idRuta,idAccident);

	
END;
$BODY$
LANGUAGE plpgsql;



/**
	INSERTAR EN PERSONAS ACCIDENTADAS
**/

CREATE OR REPLACE FUNCTION insertarEnHeridosWeb
(

 IN p_idTipoLesion INT,
 IN p_fecha DATE,
 IN p_idRolPersona INT,
 IN p_edad INT, 
 IN p_sexo BOOLEAN,
 IN p_idDistrito INT
)

RETURNS BOOLEAN 
AS
$BODY$
DECLARE	idAccident INT;  /** VARIABLES REQUERIDAS PARA LA INSERCION  */
	
	
BEGIN

	--insertar  en la tabla accidentes
	PERFORM insertar_accidente(p_idTipoLesion,p_fecha);
	idAccident=(SELECT MAX(id) FROM AccidentesTran.Accidentes);
	
	--insercion en la tabla accidentes personas
	PERFORM insertar_accidentePersona(p_edad,p_sexo,p_idRolPersona,idAccident);
	
	PERFORM insertar_Heridos(idAccident,p_idDistrito);
	RETURN TRUE;
END;
$BODY$
LANGUAGE plpgsql;

-- esta funcion es de los CRUDS
CREATE OR REPLACE FUNCTION insertAccidenteGeneralWeb
(
 IN p_horaInicio TIME,
 IN p_horaFinal TIME,
 IN p_areaGeografica CHAR(1),
 IN p_idDistrito INT,
 IN p_tipoRuta CHAR(1),
 IN p_idTipoCirculacion INT,
 IN p_idEstadoTiempo INT,
 IN p_idTipoCalzada INT,
 IN p_idCalzadaVertical INT,
 IN p_idCalzadaHorizontal INT,
 IN p_idTipoAccidente INT,
 IN p_idKilometro INT,
 IN p_idRuta INT, 

 IN p_fecha DATE,--
 IN p_idTipoLesion INT --
)
RETURNS BOOLEAN
AS
$BODY$
	DECLARE idAccident INT;  /** VARIABLE REQUERIDA PARA LA INSERCION  */		
BEGIN   
	PERFORM insertar_accidente(p_idTipoLesion,p_fecha);
	idAccident=(SELECT MAX(id) FROM AccidentesTran.Accidentes);

	PERFORM insertar_accidentesGenerales(idAccident,p_horaInicio,p_horaFinal,p_areaGeografica,p_idDistrito,
	p_tipoRuta,p_idTipoCirculacion,p_idEstadoTiempo,p_idTipoCalzada,p_idCalzadaVertical,p_idCalzadaHorizontal,p_idTipoAccidente,p_idKilometro,p_idRuta);
	RETURN TRUE;
	
END;
$BODY$
LANGUAGE plpgsql;


select * from accidentestran.accidentesgenerales 