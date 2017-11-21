CREATE VIEW SeleccionarFallecidos AS 
	(SELECT FA.IdAccidente AS IdFallecido,AC.Fecha,FA.HoraInicio,FA.HoraFinal,TA.Tipo AS TipoAccidente,KM.Numero AS Ruta,CA.NombreCanton AS Canton,
	AxPe.Edad,AxPe.Sexo,AxPe.Rol
	FROM AccidentesTran.Fallecidos AS FA
	INNER JOIN Direccion.Cantones AS CA ON CA.IdCanton = FA.IdCanton
	INNER JOIN DetallesAccidentes.TiposAccidentes AS TA ON TA.Id = FA.IdTipoAccidente
	INNER JOIN DetallesAccidentes.KilometrosRutas AS KM ON KM.Id = FA.IdRuta
	INNER JOIN (SELECT AP.IdAccidente,RP.Rol,AP.Edad,AP.Sexo FROM DetallesAccidentes.RolesPersonas AS RP 
	INNER JOIN AccidentesTran.AccidentesPersonas AS AP ON RP.Id = AP.IdRolPersona) AS AxPe ON AxPe.IdAccidente = FA.IdAccidente
	INNER JOIN AccidentesTran.Accidentes AS AC ON AC.Id = FA.IdAccidente);
	
select * from SeleccionarFallecidos