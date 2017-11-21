/**************************
Indice sobre atributo fecha de la tabla accidentes
***************************/
CREATE INDEX fecha_index ON AccidentesTran.Accidentes(Fecha);

/**************************
Indice sobre atributo fecha de la tabla distritos
***************************/
CREATE INDEX NombreDistrito_index ON Direccion.Distritos(NombreDistrito);

/**************************
Indice sobre atributo numero de la tabla KilometrosRutas
***************************/
CREATE INDEX Numero_index ON DetallesAccidentes.KilometrosRutas(Numero);

/**************************
Indice sobre atributos fecha final y fecha inicio en la tabla accidentes generales
***************************/
CREATE INDEX horas_index ON AccidentesTran.AccidentesGenerales(HoraInicio,HoraFinal);

/**************************
Indice sobre atributos fecha final y fecha inicio en la tabla fallecidos
***************************/
CREATE INDEX horasFallecidos_index ON AccidentesTran.Fallecidos(HoraInicio,HoraFinal);

/**************************
Indice sobre atributo edad en la tabla accidentes personas
***************************/
CREATE INDEX edad_index ON AccidentesTran.AccidentesPersonas(Edad);

