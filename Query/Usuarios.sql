﻿/**
	usuario administrador (con permisos de súper usuario),

*/

drop user administrador
CREATE USER administrador WITH LOGIN PASSWORD 'admin123';
--REVOKE ALL PRIVILEGES ON detallesAccidentes.TiposLesiones FROM administrador;
ALTER USER administrador WITH SUPERUSER;
SELECT rolname, rolsuper FROM pg_roles;

/**

	un usuario normal,
	el cual solo tendrá acceso a las tablas 
	y funciones
	
*/
drop user normal
	
	CREATE USER normal WITH LOGIN PASSWORD 'normal12';
	GRANT SELECT,INSERT,UPDATE,DELETE ON ALL TABLES IN SCHEMA DetallesAccidentes TO normal;
	GRANT SELECT,INSERT,UPDATE,DELETE ON ALL TABLES IN SCHEMA AccidentesTran TO normal;
	GRANT SELECT,INSERT,UPDATE,DELETE ON ALL TABLES IN SCHEMA Direccion TO normal;

	Grant ALL PRIVILEGES ON ALL TABLES IN SCHEMA 
	DetallesAccidentes to normal;
	grant ALL PRIVILEGES ON ALL TABLES IN SCHEMA
	AccidentesTran to normal;
	grant ALL PRIVILEGES ON ALL TABLES IN SCHEMA
	Direccion to normal;

	REVOKE ALL PRIVILEGES ON ALL TABLES IN SCHEMA 
	DetallesAccidentes FROM normal;
	REVOKE ALL PRIVILEGES ON ALL TABLES IN SCHEMA
	AccidentesTran FROM normal;
	REVOKE ALL PRIVILEGES ON ALL TABLES IN SCHEMA
	Direccion FROM normal;

/**
	Un usuario respaldo que
	solo podrá realizar respaldo de base de datos		
*/
drop user backupUser
	CREATE USER backup WITH LOGIN PASSWORD 'backup123';
--	GRANT CONNECT ON DATABASE AccidentesTransito TO backupUser; --permitir conexion del usuario
	REVOKE ALL PRIVILEGES ON ALL TABLES IN SCHEMA
	DetallesAccidentes FROM backupUser;
	REVOKE ALL PRIVILEGES ON ALL TABLES IN SCHEMA
	AccidentesTran FROM backupUser;
	REVOKE ALL PRIVILEGES ON ALL TABLES IN SCHEMA
	Direccion FROM backupUser
	--Permisos de lectura únicamente
	GRANT SELECT ON ALL TABLES IN SCHEMA DetallesAccidentes TO backup;
	GRANT SELECT ON ALL TABLES IN SCHEMA AccidentesTran TO backup;
	GRANT SELECT ON ALL TABLES IN SCHEMA Direccion TO backup;
	--SE REQUIERE PARA DAR PERMISOS DE LECTURA EN OBJETOS AÚN NO CREADOS
	ALTER DEFAULT PRIVILEGES IN SCHEMA DetallesAccidentes
	GRANT SELECT ON TABLES TO backup;
	ALTER DEFAULT PRIVILEGES IN SCHEMA AccidentesTran
	GRANT SELECT ON TABLES TO backup;
	ALTER DEFAULT PRIVILEGES IN SCHEMA Direccion
	GRANT SELECT ON TABLES TO backup;
	REVOKe
	