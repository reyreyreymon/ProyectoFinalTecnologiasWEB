/*
const express = require('express');

const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(cors());
//const app = await NestFactory.create(AppModule, {cors: true});
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(express.json());
*/
const express = require('express'); // Esto para importar express
const bodyParser = require('body-parser');
const cors = require('cors'); // <--- para que funcione con angular
const app = express(); // Crear el servidor
app.use(cors());// <--- para que funcione con angular
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/'));

app.post('/contacto', (req, res) => {
   console.log(req.body);
   console.log('Entreeee');
   res.status(200).send();
}); 
app.listen(3000, () =>{
   console.log("Servidor en el puerto 3000");
});