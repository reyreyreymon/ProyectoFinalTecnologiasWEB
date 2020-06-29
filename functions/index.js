const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const configMensaje = require('./enviar');
const formulario = express();

formulario.use(bodyParser.json());
formulario.use(cors());

formulario.post('/', (req, res) => {
    configMensaje(req.body);
    res.status(200).send();
});



exports.formulario = functions.https.onRequest(formulario);
