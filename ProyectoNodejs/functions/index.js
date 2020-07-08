const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const configMensaje = require('./enviar');

const correo = express();

correo.use(bodyParser.json());
correo.use(cors());

correo.post('/', (req, res) => {
    configMensaje(req.body);
    res.status(200).send();
});
exports.correo = functions.https.onRequest(correo);

const admin2 = require('firebase-admin');

const alta = express();
alta.use(bodyParser.json());
alta.use(cors());
admin2.initializeApp(functions.config().firebase);
let db2 = admin2.firestore();

alta.post('/', (req, res) => {
    let docRef = db2.collection('Productos').doc();
    let setAda = docRef.set(req.body);
   res.status(200).send();
});
exports.alta = functions.https.onRequest(alta);

const eliminar = express();
eliminar.use(bodyParser.json());
eliminar.use(cors());
eliminar.post('/', (req, res) => {
    let deleteDoc = db2.collection('Productos').doc(req.body).delete();
   res.status(200).send();
});
exports.eliminar = functions.https.onRequest(eliminar);

const consulta = express();
consulta.use(bodyParser.json());
consulta.use(cors());

consulta.get('/', (req, res) => {
    (async () => {
        try {
            let query = db2.collection('Productos');
            let response = [];
            await query.get().then(querySnapshot => {
            let docs = querySnapshot.docs;
            for (let doc of docs) {
                const selectedItem = {
                    id: doc.id,
                    descripcion: doc.data().descripcion,
                    existencia: doc.data().existencia,
                    marca: doc.data().marca,
                    precio: doc.data().precio
                };
                response.push(selectedItem);
            }
            });
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
    });
exports.consulta = functions.https.onRequest(consulta);