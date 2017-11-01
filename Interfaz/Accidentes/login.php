<?php
    error_reporting(-1);
    	$conn=pg_connect("host=localhost port=5432 dbname=AccidentesTransito user=postgres password=12345")or
    	die("[]");

    	$result=pg_query($conn,"SELECT * FROM DetallesAccidentes.TiposLesiones;")or die("[]");
        header('Content-Type: application/json');
    	echo json_encode( pg_fetch_all($result), JSON_UNESCAPED_UNICODE);

?>;