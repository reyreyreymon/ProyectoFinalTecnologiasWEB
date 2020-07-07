const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');

const appi = express();
appi.use(bodyParser.json());
appi.use(cors());
admin.initializeApp(functions.config().firebase);
let db = admin.firestore();

/*
var serviceAccount = require("./papeleria-f3646-firebase-adminsdk-cms04-8954892d37.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "papeleria-f3646.appspot.com"
});
var bucket = admin.storage().bucket();
  
// const db = admin.firestore();
*/
appi.post('/', (req, res) => {
    let docRef = db.collection('Productos').doc();

let setAda = docRef.set(req.body);
    //db.ref('Pord').push(req.body);
   //db.ref('Productos').push(req.body);
   res.status(200).send();
});
exports.appi = functions.https.onRequest(appi);

const eliminar = express();
eliminar.use(bodyParser.json());
eliminar.use(cors());
eliminar.post('/', (req, res) => {
    let deleteDoc = db.collection('Productos').doc(req.body).delete();
   res.status(200).send();
});
exports.eliminar = functions.https.onRequest(eliminar);

const consulta = express();
consulta.use(bodyParser.json());
consulta.use(cors());
consulta.get('/', (req, res) => {
    let citiesRef = db.collection('Productos');
    let query = citiesRef.where('existencia', '>', 0 ).get();
    console.log(query);
   res.status(200).send(query);
});
exports.consulta = functions.https.onRequest(consulta);