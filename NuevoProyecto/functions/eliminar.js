const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');

const eliminar = express();
eliminar.use(bodyParser.json());
eliminar.use(cors());
admin.initializeApp(functions.config().firebase);
let db = admin.firestore();

eliminar.post('/', (req, res) => {
    let deleteDoc = db.collection('Productos').doc(req.body).delete();
   res.status(200).send();
});
exports.eliminar = functions.https.onRequest(eliminar);
