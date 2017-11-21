
-- 1) Obtener el número de personas fallecidas durante accidentes de tránsito entre el 2016 y 2017, en la provincia de San José.

SELECT info.nombreprovincia AS "Provincia",COUNT(*) AS "Fallecidos" FROM (SELECT * FROM (SELECT * FROM (SELECT * FROM (SELECT * FROM accidentestran.accidentes 
WHERE fecha BETWEEN '2016-01-01' AND '2018-01-01') AS accidentes INNER JOIN accidentestran.fallecidos af ON accidentes.id = af.idaccidente) 
tabla INNER JOIN direccion.cantones cant ON tabla.idcanton = cant.idcanton) consulta INNER JOIN direccion.provincias prov ON consulta.idprovincia = prov.idprovincia 
AND prov.nombreprovincia = 'San José') info GROUP BY info.nombreprovincia

-- 2) Obtener el número de heridos por cada causa de accidentes, entre los años 2012 y 2016.

CREATE OR REPLACE FUNCTION c2()
  RETURNS void AS
$BODY$
DECLARE
	numTiposAccidentes INT DEFAULT 0;-- Almacena la cantidad de accidentes que existen
	heridos INT DEFAULT 0;
	cont INT DEFAULT 0;
	causa VARCHAR(50);
	
BEGIN
	SELECT INTO numTiposAccidentes count(*) from detallesaccidentes.tiposaccidentes; -- Se obtiene la cantidad de accidentes

	LOOP 
	EXIT WHEN numTiposAccidentes = 0; -- Se realiza un ciclo hasta encontrar todas las causas de accidentes

		IF (SELECT COUNT(*) FROM detallesaccidentes.tiposaccidentes WHERE id = cont) = 0 THEN -- Se verIFica que sea valido el id del tipo de accidente

			cont = cont+1;

		ELSE

			-- Se obtiene el nombre de la causa
			SELECT INTO causa tipo FROM detallesaccidentes.tiposaccidentes WHERE id = cont ; 

			-- Se obtiene el numero de personas heridas en accidentes entre el 2012 y 2016, por cada tipo de accidente
			
			SELECT INTO heridos COUNT(*) FROM (SELECT * FROM (SELECT * FROM (SELECT * FROM 
			accidentestran.accidentes ac WHERE ac.fecha 
			BETWEEN '2012-01-01' AND '2016-01-01') AS accidentes
			INNER JOIN accidentestran.accidentesgenerales ag ON 
			accidentes.id = ag.idaccidente) AS accidentes INNER JOIN 
			detallesaccidentes.tiposaccidentes tipo ON accidentes.idtipoaccidente 
			= tipo.id) informacion WHERE informacion.tipo = causa;

			-- Se imprimen en pantalla los resultados
			
			RAISE notice 'Causa: %',causa;
			RAISE notice 'Numero de Heridos: %',heridos;
			RAISE notice '%','';
			cont = cont+1;
			numTiposAccidentes = numTiposAccidentes-1;
		
		
		END IF;

	END LOOP ;
END;
$BODY$
  LANGUAGE plpgsql

SELECT c2() -- Ejecucion de la consulta

--forma alternativa para hacerla

SELECT Ti.Tipo,COUNT(Id) as CantidadAccidentes FROM DetallesAccidentes.TiposAccidentes as Ti 
	INNER JOIN 
	(SELECT Ag.* FROM AccidentesTran.AccidentesGenerales as Ag
	INNER JOIN 
	(SELECT * FROM AccidentesTran.Accidentes) as Ac ON  Ag.IdAccidente=Ac.Id)as H
	ON H.idTipoAccidente=Ti.Id
	GROUP BY Ti.Id

select * from AccidentesTran.Accidentes

---------------------------------------------------------------------------------------------------------------------------------

-- 3) Obtener el numero de accidentes provocados por cada estado del tiempo durante el transcurso del año 2012 

CREATE OR REPLACE FUNCTION c3()
  RETURNS void AS
$BODY$
DECLARE
	numTiposEstados INT DEFAULT 0;-- Almacena la cantidad de estados de tiempo que existen
	numAccidentes INT DEFAULT 0;
	cont INT DEFAULT 0;
	est VARCHAR(50);
	
BEGIN
	SELECT INTO numTiposEstados COUNT(*) FROM detallesaccidentes.estadostiempo; -- Se obtiene la cantidad de estados de tiempo

	LOOP 
	EXIT WHEN numTiposEstados = 0; -- Se realiza un ciclo para utilizar cada estado del tiempo

		IF (SELECT COUNT(*) FROM detallesaccidentes.estadostiempo WHERE id = cont) = 0 THEN -- Se verIFica que sea valido el id del estado del tiempo

			cont = cont+1;

		ELSE

			SELECT INTO est estado FROM detallesaccidentes.estadostiempo WHERE id = cont ; -- Se selecciona el nombre del estado del tiempo

			-- Se selecciona el numero de accidentes ocurridos entre el 2012, segun cada estado del tiempo
		
			SELECT INTO numAccidentes COUNT(*) FROM (SELECT * FROM (SELECT * FROM (SELECT * FROM 
			accidentestran.accidentes ac WHERE ac.fecha BETWEEN '2012-01-01'AND '2013-01-01') AS accidentes
			INNER JOIN accidentestran.accidentesgenerales ag ON 
			accidentes.id = ag.idaccidente) AS accidentes INNER JOIN 
			detallesaccidentes.tiposaccidentes tipo ON accidentes.idtipoaccidente 
			= tipo.id) informacion WHERE informacion.idestadotiempo = cont;

			-- Se imprimen en pantalla los resultados
		
			RAISE notice 'Estado: %',est;
			RAISE notice 'Numero de Accidentes: %',numAccidentes;
			RAISE notice '%','';
			cont = cont+1;
			numTiposEstados = numTiposEstados-1;
		
		END IF;


	END LOOP ;
END;
$BODY$
  LANGUAGE plpgsql

SELECT c3() -- Ejecucion de la consulta


--FORMA ALTERNATIVA DE HACERLA
SELECT Ti.Estado,COUNT(Id)AS CantidadAccidentes FROM DetallesAccidentes.EstadosTiempo as Ti 
	INNER JOIN 
	(SELECT Ag.* FROM AccidentesTran.AccidentesGenerales as Ag
	INNER JOIN 
	(SELECT * FROM AccidentesTran.Accidentes
	WHERE fecha BETWEEN '2012-01-01'AND '2013-01-01') as Ac ON  Ag.IdAccidente=Ac.Id)as H
	ON H.idEstadoTiempo=Ti.Id
	GROUP BY Ti.Id

------------------------------------------------------------------------------------------------------------
select * from AccidentesTran.AccidentesGenerales
select * from DetallesAccidentes.EstadosTiempo

-- 4) Obtener el numero de accidentes por cada tipo de accidente que registrado en la provincia de San Jose 

CREATE OR REPLACE FUNCTION c4()
  RETURNS void AS
$BODY$
DECLARE
	numTiposAccidentes INT DEFAULT 0;-- Almacena la cantidad de tipos de accidentes que existen
	numAccidentes INT DEFAULT 0;
	cont INT DEFAULT 0;
	acci VARCHAR(50);
	
BEGIN
	SELECT INTO numTiposAccidentes COUNT(*) FROM detallesaccidentes.tiposaccidentes; -- Se obtiene la cantidad de tipos de accidentes

	RAISE notice 'Provincia: San José';

	LOOP 
	EXIT WHEN numTiposAccidentes = 0; 

		IF (SELECT COUNT(*) FROM detallesaccidentes.tiposaccidentes WHERE id = cont) = 0 THEN -- Se verIFica que sea valido el id del tipo de accidente
	
			cont = cont+1;

		ELSE

			SELECT INTO acci tipo FROM detallesaccidentes.tiposaccidentes WHERE id = cont ; -- Se selecciona el nombre del tipo de accidente

			-- Se selecciona el numero de accidentes ocurridos en la provincia de San Jose, segun cada tipo de accidente
		
			SELECT INTO numAccidentes COUNT(*) FROM (SELECT * FROM (SELECT * FROM (SELECT * FROM (SELECT * FROM 
			accidentestran.accidentes ac) AS accidentes
			INNER JOIN accidentestran.accidentesgenerales ag ON 
			accidentes.id = ag.idaccidente) AS accidentes INNER JOIN 
			detallesaccidentes.tiposaccidentes acc ON accidentes.idtipoaccidente 
			= acc.id) info WHERE info.idtipoaccidente= cont) datos INNER JOIN (SELECT dis.iddistrito,
			cant.idcanton,prov.idprovincia,prov.nombreprovincia FROM direccion.distritos dis INNER JOIN 
			direccion.cantones cant ON dis.idcanton = cant.idcanton INNER JOIN direccion.provincias prov 
			ON cant.idprovincia = prov.idprovincia) direccion ON datos.iddistrito = direccion.iddistrito
			AND direccion.nombreprovincia = 'San José';

			-- Se imprimen en pantalla los resultados
			
			RAISE notice 'Tipo de Accidente: %',acci;
			RAISE notice 'Numero de Accidentes: %',numAccidentes;
			RAISE notice '%','';
			cont = cont+1;
			numTiposAccidentes = numTiposAccidentes-1;
		
		
		END IF;

	END LOOP ;
END;
$BODY$
  LANGUAGE plpgsql;

SELECT c4() -- Ejecucion de la consulta

--------------------------------------------------------------------------------------------------------------
-- Se crea un tipo de dato para retornar los datos de la funcion
CREATE TYPE returntype AS (a VARCHAR(50), b INT);

-- Esta funcion se encarga de retorna la causa de accidentes con mayor ocurrencia, de cada provincia

CREATE OR REPLACE FUNCTION buscar_causa_mayor(idProv int)
  RETURNS returntype AS
$BODY$
DECLARE
	numTiposAccidentes INT DEFAULT 0;-- Almacena la cantidad de accidentes que existen
	numAccidentes INT DEFAULT 0;
	cont INT DEFAULT 0;
	acci VARCHAR(50);
	mayor INT DEFAULT 0;
	causa VARCHAR(50);
	dev returntype;
	
BEGIN
	SELECT INTO numTiposAccidentes COUNT(*) FROM detallesaccidentes.tiposaccidentes;-- Se obtiene la cantidad de accidentes
	
	LOOP 
	EXIT WHEN numTiposAccidentes = 0;  -- Se realiza un ciclo hasta encontrar todas las causas de accidentes

		IF (SELECT COUNT(*) FROM detallesaccidentes.tiposaccidentes WHERE id = cont) = 0 THEN -- Se verIFica que sea valido el id del tipo de accidente

			cont = cont+1;
		ELSE

			SELECT INTO acci tipo FROM detallesaccidentes.tiposaccidentes WHERE id = cont ; -- Se obtiene el nombre del tipo de accidente 

			-- Se cuenta el numero de accidentes asociados a cada causa, de una provincia especifica
			
			SELECT INTO numAccidentes COUNT(*) FROM (SELECT * FROM (SELECT * FROM (SELECT * FROM (SELECT * FROM 
			accidentestran.accidentes ac) AS accidentes
			INNER JOIN accidentestran.accidentesgenerales ag ON 
			accidentes.id = ag.idaccidente) AS accidentes INNER JOIN 
			detallesaccidentes.tiposaccidentes acc ON accidentes.idtipoaccidente 
			= acc.id) info WHERE info.idtipoaccidente= cont) datos INNER JOIN (SELECT dis.iddistrito,
			cant.idcanton,prov.idprovincia,prov.nombreprovincia FROM direccion.distritos dis INNER JOIN 
			direccion.cantones cant ON dis.idcanton = cant.idcanton INNER JOIN direccion.provincias prov 
			ON cant.idprovincia = prov.idprovincia) direccion ON datos.iddistrito = direccion.iddistrito
			AND direccion.idprovincia = idProv;
		
			IF(mayor <= numAccidentes) THEN -- Se verifica cual causa tiene mas accidentes
		
				mayor = numAccidentes;
				causa = acci;
			
			END IF;
		
			cont = cont+1;
			numTiposAccidentes = numTiposAccidentes-1;
		
		
		END IF;

	END LOOP ;
	
	dev.a = causa;
	dev.b = mayor;

	RETURN dev; -- Se retorna la causa
	
END;
$BODY$
  LANGUAGE plpgsql


  SELECT * from Direccion.Provincias
  SELECT buscar_causa_mayor(16);
-------------------------------------------------------------------------------------------------------------

-- 5) Obtener el tipo de accidente con mayor ocurrencia de casos registrados en cada provincia del pais 

CREATE OR REPLACE FUNCTION c5()
  RETURNS void AS
$BODY$
DECLARE-- Se obtiene la cantidad de accidentes
	numTiposAccidentes INT DEFAULT
BEGIN
	SELECT INTO numProvincias COUNT(*) FROM direccion.provincias; -- Se obtiene la cantidad de provincias
	SELECT INTO numTiposAccidentes COUNT(*) FROM detallesaccidentes.estadostiempo; -- Se obtiene la cantidad de tipos de accidentes


	LOOP 
	EXIT WHEN numProvincias = 0;  -- Se recorre cada provincia

	  IF (SELECT COUNT(*) FROM direccion.provincias WHERE idprovincia = idProv) = 0 THEN -- Se verifica que el id de la provincia sea valido

		idProv = idProv+1;

	   ELSE

		SELECT INTO acci nombreprovincia FROM direccion.provincias WHERE direccion.provincias.idprovincia = idProv; -- Se obtiene el nombre de la provincia
		RAISE NOTICE 'Provincia: %',acci;
		numProvincias =numProvincias-1;

		SELECT INTO XS buscar_causa_mayor(idProv); -- Se obtiene la causa con mayor numero de accidentes
		RAISE NOTICE 'Causa Y Numero de Accidentes: %',XS;
		
		idProv = idProv+1;
		
		
	   END IF;

		

	END LOOP ;
END;
$BODY$
  LANGUAGE plpgsql

SELECT c5() -- Ejecucion de la consulta
---------------------------------------------------------------------------------------------------------------------------------------------------

---------------------------------------------------------------------------------------------------------------------------------------------

-- 6) Obtener el numero de fallecidos totales en cada mes entre 2012 y el 2018 por Colision entre vehiculos 

CREATE OR REPLACE FUNCTION c6()
  RETURNS void AS
$BODY$
DECLARE

	numMes INT DEFAULT 1;-- Almacena el numero del mes
	numFallecidos INT DEFAULT 0;
BEGIN
	

	LOOP 
	EXIT WHEN numMes = 13; 

		SELECT INTO numFallecidos COUNT(*) FROM(SELECT * FROM (SELECT * FROM accidentestran.accidentes accidentes 
		WHERE accidentes.fecha BETWEEN '2012-01-01' AND '2018-01-01' AND EXTRACT(MONTH FROM accidentes.fecha) = numMes) info 
		INNER JOIN accidentestran.fallecidos fallecidos ON info.id = fallecidos.idaccidente) datos WHERE datos.idtipoaccidente = 6;

		IF(numFallecidos) > 0 THEN
		
		RAISE notice 'Mes: %',numMes;
		RAISE notice 'Tipo de accidente : Colisión entre vehículos';
		RAISE notice 'Numero de Fallecidos: %',numFallecidos;
		RAISE notice '%','';

		END IF;

		numMes = numMes +1;
		
	END LOOP ;
END;
$BODY$
  LANGUAGE plpgsql

SELECT c6()  -- Ejecucion de la consulta

------------------------------------------------------------------------------------------------------------------------------

-- 7) Obtener el numero de accidentes ocurridos cada mes desde el año 2000 hasta el 2020 relacionados a un tipo de lesion especIFica

CREATE OR REPLACE FUNCTION c7(lesion int)
  RETURNS void AS
$BODY$
DECLARE

	numMes INT DEFAULT 1;-- Almacena el numero del mes
	numAño INT DEFAULT 2000;
	numHeridos INT DEFAULT 0;
	tipoLesion VARCHAR(50);
BEGIN

	SELECT INTO tipoLesion tipo FROM detallesaccidentes.tiposlesiones WHERE id = lesion;
	
	LOOP 
	EXIT WHEN numAño = 2020;

		numMes = 1;

		LOOP 
		EXIT WHEN numMes = 13; 

			SELECT INTO numHeridos COUNT(*) FROM(SELECT * FROM (SELECT * FROM accidentestran.accidentes accidentes 
			WHERE (EXTRACT(MONTH FROM accidentes.fecha) = numMes) AND (EXTRACT(YEAR FROM accidentes.fecha) = numAño)) info 
			INNER JOIN accidentestran.heridos heridos ON info.id = heridos.idaccidente) datos WHERE datos.idtipolesion = lesion;

			IF(numHeridos) > 0 THEN

				RAISE notice 'Año: %',numAño;
				RAISE notice 'Mes: %',numMes;
				RAISE notice 'Numero de Accidentes: %',numHeridos;
				RAISE notice 'Tipo de lesion: %',tipoLesion;
				RAISE notice '%','';

			END IF;
		
			numMes = numMes +1;
			
		END LOOP ;

		numAño = numAño+1;
	
	END LOOP;
END;
$BODY$
  LANGUAGE plpgsql

SELECT c7(6) -- Ejecucion de la consulta


------------------------------------------------------------------------------------------------------------------------------

-- 8) Obtener el numero de fallecidos cada mes desde el año 2000 hasta el 2020 relacionados a un tipo de accidente especIFico

CREATE OR REPLACE FUNCTION c8(idTacc int)
  RETURNS void AS
$BODY$
DECLARE

	numMes INT DEFAULT 1;-- Almacena el numero del mes
	numAño INT DEFAULT 2000;
	numFallecidos INT DEFAULT 0;
	tipoAccidente VARCHAR(50);
BEGIN

	SELECT INTO tipoAccidente tipo FROM detallesaccidentes.tiposaccidentes WHERE id = idTacc;
	
	LOOP 
	EXIT WHEN numAño = 2020;

		numMes = 1;

		LOOP 
		EXIT WHEN numMes = 13; 

			SELECT INTO numFallecidos COUNT(*) FROM (SELECT * FROM(SELECT * FROM (SELECT * FROM accidentestran.accidentes accidentes 
			WHERE (EXTRACT(MONTH FROM accidentes.fecha) = numMes) AND (EXTRACT(YEAR FROM accidentes.fecha) = numAño)) info 
			INNER JOIN accidentestran.fallecidos fallecidos ON info.id = fallecidos.idaccidente) datos INNER JOIN 
			detallesaccidentes.tiposaccidentes tacc ON datos.idtipoaccidente = tacc.id) datos WHERE datos.idtipoaccidente = idTacc;

			IF(numFallecidos) > 0 THEN

				RAISE notice 'Año: %',numAño;
				RAISE notice 'Mes: %',numMes;
				RAISE notice 'Numero de Fallecidos: %',numFallecidos;
				RAISE notice 'Tipo de Accidente: %',tipoAccidente;
				RAISE notice '%','';

			END IF;
		
			numMes = numMes +1;
			
		END LOOP ;

		numAño = numAño+1;
	
	END LOOP;
END;
$BODY$
  LANGUAGE plpgsql

SELECT c8(4) -- Ejecucion de la consulta


-- 9) Obtener el numero de accidentes relacionados a una provincia, filtrados por año y mes de cada uno de los tipos de accidentes desde el año 2000 hasta el 2020 

CREATE OR REPLACE FUNCTION c9(idProv int)
  RETURNS void AS
$BODY$
DECLARE
	numTiposAccidentes INT DEFAULT 0;-- Almacena la cantidad de accidentes que existen
	numAccidentes INT DEFAULT 0;
	cont INT DEFAULT 0;
	acci VARCHAR(50);
	prov VARCHAR(50);
	
	numMes INT DEFAULT 1;-- Almacena el numero de comercios
	numAño INT DEFAULT 2000;
	numFallecidos INT DEFAULT 0;
	tipoAccidente VARCHAR(50);
	
BEGIN
	SELECT INTO prov nombreprovincia FROM direccion.provincias WHERE idprovincia = idProv;

	RAISE notice 'Provincia: %',prov;

	LOOP 
	EXIT WHEN numAño = 2020;

		numMes = 1;
		
		LOOP 
		EXIT WHEN numMes = 13; 
		
			SELECT INTO numTiposAccidentes COUNT(*) FROM detallesaccidentes.tiposaccidentes;
	
			LOOP 
			EXIT WHEN numTiposAccidentes = 0; 

				IF (SELECT COUNT(*) FROM detallesaccidentes.tiposaccidentes WHERE id = cont) = 0 THEN
				
					cont = cont+1;

				ELSE

					SELECT INTO acci tipo FROM detallesaccidentes.tiposaccidentes WHERE id = cont ; 

		
					SELECT INTO numAccidentes COUNT(*) FROM (SELECT * FROM (SELECT * FROM (SELECT * FROM (SELECT * FROM accidentestran.accidentes accidentes 
					WHERE (EXTRACT(MONTH FROM accidentes.fecha) = numMes) AND (EXTRACT(YEAR FROM accidentes.fecha) = numAño)
					) AS accidentes INNER JOIN accidentestran.accidentesgenerales ag ON accidentes.id = ag.idaccidente) AS accidentes 
					INNER JOIN detallesaccidentes.tiposaccidentes acc ON accidentes.idtipoaccidente = acc.id) info WHERE info.idtipoaccidente = cont) datos INNER JOIN (
					SELECT dis.iddistrito,cant.idcanton,prov.idprovincia,prov.nombreprovincia FROM direccion.distritos dis INNER JOIN 
					direccion.cantones cant ON dis.idcanton = cant.idcanton INNER JOIN direccion.provincias prov 
					ON cant.idprovincia = prov.idprovincia) direccion ON datos.iddistrito = direccion.iddistrito
					AND direccion.idprovincia = idProv;

					IF(numAccidentes) > 0 THEN
						RAISE notice 'Año: %',numAño;
						RAISE notice 'Mes: %',numMes;
						RAISE notice 'Tipo de Accidente: %',acci;
						RAISE notice 'Numero de Accidentes: %',numAccidentes;
						RAISE notice '%','';

					END IF;
					cont = cont+1;
					numTiposAccidentes = numTiposAccidentes-1;
		
		
				END IF;


			END LOOP ;

			cont = 0;

			numMes = numMes +1;
			
		END LOOP ;

		numAño = numAño+1;
	
	END LOOP;
END;
$BODY$
  LANGUAGE plpgsql
SELECT c9(12) -- Ejecucion de la consulta


-- Devuelve el numero de accidentes ocurridos en una provincia, durante un mes y un año especificos

CREATE OR REPLACE FUNCTION cantidad_accidentes(numAño int ,numMes int,idProv int)
  RETURNS INT AS
$BODY$
DECLARE
	numAccidentes INT DEFAULT 0; -- Almacena la cantidad de accidentes que existen
BEGIN

	-- Se cuenta el numero de accidentes ocurridos en una provincia, durante un mes y un año especificos

	SELECT INTO numAccidentes COUNT(*) FROM (SELECT * FROM (SELECT * FROM (SELECT * FROM (SELECT * FROM accidentestran.accidentes accidentes 
	WHERE (EXTRACT(MONTH FROM accidentes.fecha) = numMes) AND (EXTRACT(YEAR FROM accidentes.fecha) = numAño)) AS accidentes INNER JOIN accidentestran.accidentesgenerales ag ON accidentes.id = ag.idaccidente) AS accidentes 
	INNER JOIN detallesaccidentes.tiposaccidentes acc ON accidentes.idtipoaccidente = acc.id) info) datos INNER JOIN (
	SELECT dis.iddistrito,cant.idcanton,prov.idprovincia,prov.nombreprovincia FROM direccion.distritos dis INNER JOIN 
	direccion.cantones cant ON dis.idcanton = cant.idcanton INNER JOIN direccion.provincias prov 
	ON cant.idprovincia = prov.idprovincia) direccion ON datos.iddistrito = direccion.iddistrito
	AND direccion.idprovincia = idProv;
		
	RETURN numAccidentes;
END;
$BODY$
LANGUAGE plpgsql



-- 10) Obtener la provincia con menor numero de accidentes de cada mes de cada años desde el año 2000 hasta el 2020 

CREATE OR REPLACE FUNCTION c10()
  RETURNS void AS
$BODY$
DECLARE
	numProvincias INT DEFAULT 0;-- Almacena el numero de provincias que existen
	numAccidentes INT DEFAULT 0;
	cont INT DEFAULT 0;
	acci VARCHAR(50);
	prov VARCHAR(50);

	numMes INT DEFAULT 1;-- Almacena el numero del mes
	numAño INT DEFAULT 2000;
	numFallecidos INT DEFAULT 0;
	menorAccidentes INT DEFAULT 0;
	menorProv INT DEFAULT 0;
	
BEGIN

	LOOP 
	EXIT WHEN numAño = 2020; -- Se recorre cada año

		numMes = 1;
		
		LOOP 
		EXIT WHEN numMes = 13;  -- Se recorre cada mes 

			IF(SELECT COUNT(*) FROM (SELECT * FROM accidentestran.accidentes accidentes 
				WHERE (EXTRACT(MONTH FROM accidentes.fecha) = numMes) AND (EXTRACT(YEAR FROM accidentes.fecha) = numAño)) AS accidentes) > 0 THEN -- Se verifica que el numero de accidentes es mayor a 0
				
				SELECT INTO numProvincias COUNT(*) FROM direccion.provincias; -- Se obtiene el numero de provincias
			
				LOOP 
				EXIT WHEN numProvincias = 0; -- Se recorre cada provincia
			

					IF (SELECT COUNT(*) FROM direccion.provincias WHERE idprovincia = cont) = 0 THEN -- Se verifica que el id de la provincia sea valido
				
						cont = cont+1;

					ELSE
					
						SELECT INTO numAccidentes cantidad_accidentes(numAño,numMes,cont); -- Se obtiene el numero de accidentes de esa provincia ese mes de ese año

						IF(numAccidentes < menorAccidentes) OR (menorAccidentes = 0) THEN -- Se comprueba cual es la provincia con menos accidentes

							menorAccidentes = numAccidentes;
							menorProv = cont; 

						END IF;
					
						cont = cont+1;
						numProvincias = numProvincias-1;
		
		
					END IF;


				END LOOP ;

					-- Se muestra la provincia con menos accidentes ese mes de ese año


					IF(menorAccidentes) > 0 THEN
					
						SELECT INTO prov nombreprovincia FROM direccion.provincias WHERE idprovincia = menorProv;

						RAISE notice 'Año: %',numAño;
						RAISE notice 'Mes: %',numMes;
						RAISE notice 'Provincia con menos acidentes: %',prov;
						RAISE notice 'Numero de Accidentes: %',menorAccidentes;
						RAISE notice '%','';

					
					END IF;

				cont = 0;
				menorAccidentes = 0;


			END IF;

			numMes = numMes +1;
			
		END LOOP ;

		numAño = numAño+1;
	
	END LOOP;
	
END;
$BODY$
  LANGUAGE plpgsql
SELECT c10() -- Ejecucion de la consulta

