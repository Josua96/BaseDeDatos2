CREATE VIEW SeleccionarHeridos AS
SELECT H.IdAccidente,Di.NombreDistrito,AP.Sexo,AP.Edad,AP.Rol, AC.Fecha, TL.Tipo FROM AccidentesTran.Heridos AS H
	INNER JOIN (SELECT AxP.IdAccidente, RP.Rol,AxP.Sexo,AxP.Edad FROM AccidentesTran.AccidentesPersonas AS AxP 
		INNER JOIN DetallesAccidentes.RolesPersonas AS RP ON RP.Id = AxP.IdRolPersona) AS AP ON AP.IdAccidente = H.IdAccidente
	INNER JOIN Direccion.Distritos AS Di ON Di.IdDistrito = H.IdDistrito
	INNER JOIN AccidentesTran.Accidentes AS AC ON AC.Id = H.IdAccidente
	INNER JOIN DetallesAccidentes.TiposLesiones AS TL ON TL.Id = AC.IdTipoLesion

