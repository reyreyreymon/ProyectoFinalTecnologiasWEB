const nodemailer = require('nodemailer');
module.exports = (formulario) => {
 var transporter = nodemailer.createTransport({
    service:'Gmail',
    secure:true,
    auth:{
       user:'mitienditaofficial@gmail.com',
       pass:'mitiendita1234'
    }
 });
const mailOptions = {
 form:'Mi tiendita Oficial',
 to:'mitienditaofficial@gmail.com',
 subject:'Contacto',
 html: `
 <strong>Nombre:</strong> ${formulario.firstname} <br/>
 <strong>E-mail:</strong> ${formulario.email} <br/>
 <strong>Mensaje:</strong> ${formulario.message}
 `
 };
transporter.sendMail(mailOptions, function (err, info) {
 if (err)
 console.log(err)
 else
 console.log(info);
 });
}