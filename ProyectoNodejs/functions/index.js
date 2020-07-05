const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const configMensaje = require('./enviar');
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/', (req, res) => {
    configMensaje(req.body);
    res.status(200).send();
});



exports.app = functions.https.onRequest(app);

