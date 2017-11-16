CREATE VIEW SeleccionarAccidentesGenerales 
AS 
	(SELECT AG.IdAccidente,AG.HoraInicio AS HoraAccidente,AG.AreaGeografica,Di.NombreDistrito,AG.TipoRuta,TC.Tipo AS TipoCurculacion,ET.Estado AS EstadoTiempo,TiC.Tipo AS tipoCarretera,DCV.Descripcion AS DescripcionCalzadaVertical,DCH.Descripcion AS DescripcionCalzadaHorizontal,
	TA.Tipo AS TipoAccidente,KM.Numero AS Kilometro,KMR.Numero AS NumeroRuta
	FROM AccidentesTran.AccidentesGenerales AS AG
	INNER JOIN Direccion.Distritos AS Di ON AG.IdDistrito = Di.IdDistrito
	INNER JOIN DetallesAccidentes.TiposCirculacion AS TC ON AG.IdTipoCirculacion = TC.Id
	INNER JOIN DetallesAccidentes.EstadosTiempo AS ET ON ET.Id = AG.IdEstadoTiempo
	INNER JOIN DetallesAccidentes.TiposCalzadas AS TiC ON TiC.Id = AG.IdTipoCalzada
	INNER JOIN DetallesAccidentes.DescripcionesCalzadas AS DCV ON DCV.Id = AG.IdDescripcionCalzadaVertical
	INNER JOIN DetallesAccidentes.DescripcionesCalzadas AS DCH ON DCH.Id = AG.IdDescripcionCalzadaHorizontal
	INNER JOIN DetallesAccidentes.TiposAccidentes AS TA ON TA.Id = AG.IdTipoAccidente
	INNER JOIN DetallesAccidentes.KilometrosRutas AS KM ON KM.Id = AG.IdKilometro
	INNER JOIN DetallesAccidentes.KilometrosRutas AS KMR ON KMR.Id = AG.IdRuta)


CREATE VIEW SeleccionarAccidentes AS
	(SELECT AC.Id,AC.Fecha,TL.Tipo FROM AccidentesTran.Accidentes AS AC 
	INNER JOIN DetallesAccidentes.TiposLesiones AS TL ON TL.Id = AC.IdTipoLesion)


SELECT AG.HoraAccidente,AG.AreaGeografica,AG.NombreDistrito,AG.TipoRuta,AG.TipoCurculacion,AG.EstadoTiempo,AG.tipoCarretera,AG.DescripcionCalzadaVertical,
	AG.DescripcionCalzadaHorizontal,AG.TipoAccidente,AG.Kilometro,AG.NumeroRuta,A.Id,A.Fecha,A.Tipo from SeleccionarAccidentesGenerales AS AG 
	INNER JOIN SeleccionarAccidentes AS A ON A.Id = AG.IdAccidente 

