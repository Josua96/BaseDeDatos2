var request = require('request');
request('http://cosevi.cloudapi.junar.com/api/v2/datastreams/CLASE-Y-TIPOS-DE-ACCID/data.ajson/?auth_key=722b63380011db5403ebf1a9cdd63de186b1bc36&', 
 	function (error, response, body) {
    	if (!error && response.statusCode == 200) {
         console.log(body) // Print the google web page.
     }
 }) 