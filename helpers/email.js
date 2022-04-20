const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.DISENY_API);

const email =  async ( msg ) =>{
    try {
      await sgMail.send(msg);
      // console.log('Correo enviado con exito')
    } catch (error) {
      console.error(error);
      if (error.response) {
        console.error(error.response.body)
      }
    }
}

module.exports = email;

