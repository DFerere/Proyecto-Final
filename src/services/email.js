import nodemailer from "nodemailer";
import dotenv from 'dotenv';  

dotenv.config();

class mailing {

    async usemailing(email) {

        var transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            auth: {
             user: 'lulu25@ethereal.email',
              pass: 'jD2Tdgug98b6ug5HSd'
            },
            tls: {
                rejectUnauthorized: false
            }
          });
          
          var mailOptions = {
            from: 'anthony44@ethereal.email',
            to: 'davidcoderhouse@gmail.com',
            subject: 'MI EMPRENDIMIENTO',
            text: 'Bienvenido a nuestro ecommerce MI EMPRENDIEMIENTO'
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });



    };



    async changepasswordmailing(token) {

      const tokenvalue = `Copie y pegue el siguiente link en su buscador para recuperar la contraseña http://localhost:8080/ecommerce/user/recovery y coloque el siguiente token: ${token}`;
      console.log(tokenvalue);
      const message = tokenvalue.toString(); 

      var transporter = nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          auth: {
           user: 'lulu25@ethereal.email',
            pass: 'jD2Tdgug98b6ug5HSd'
          },
          tls: {
              rejectUnauthorized: false
          }
        });
        
        var mailOptions = {
          from: 'anthony44@ethereal.email',
          to: 'davidferere@gmail.com',
          subject: 'Recuperacion de contraseña Ecommerce',
          text: message, 
        };
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });



  };

  
}; 

export default mailing;
