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
const nodemiler = require('nodemailer');
app.use(cors());// <--- para que funcione con angular

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
// app.use(express.static(__dirname + '/'));
var smtpTransport = nodemiler.createTransport({
   service:'Gmail',
   secure:true,
   auth:{
      user:'mitienditaofficial@gmail.com',
      pass:'mitiendita1234'
   }
});
var nombre='Ramon';
var correo='joseramon030299@gmail.com';
var mensaje='Mensajeeee x';
  var variable = '<html style="background-color: darkturquoise"><h2 align="center"> <b>Contacto Usuario </b></h2><p>Estimado administrador se realizo una peticion de contacto, enseguida se muestran los datos del usuario que realizo el contacto con la pagina</p></html>';
  var mailOptions ={
   form:'Mi tiendita Oficial',
   to:'mitienditaofficial@gmail.com',
   subject:'Contacto',
   html:variable + '<p> <b> Nombre: </b></p>' + nombre + '<p> <b> Mensaje : </b></p>' + mensaje + '<p><b> Correo usuario: </b></p>' + correo,
   
}
smtpTransport.sendMail(mailOptions, (error,respuesta) =>{
   console.log('Se envioo');
 });
 
app.post('/#/contacto', (req, res) => {
   console.log(req.body);
   console.log('Entreeee');
}); 
app.listen(3000, () =>{
   console.log("Servidor en el puerto 3000");
});