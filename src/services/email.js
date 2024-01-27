import nodemailer from "nodemailer";
import dotenv from 'dotenv';  

dotenv.config();

class mailing {

    async usemailing(email) {

        var transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            auth: {
             user: 'mitchell.roberts@ethereal.email',
              pass: '	YmM4k9kkbxMkAC9sfR'
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
           user: 'mitchell.roberts@ethereal.email',
            pass: 'YmM4k9kkbxMkAC9sfR'
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


  async ticketmailing(ticket, purchaser) {

    const tokenvalue = `Se genero con exito su ticket de compra: ${ticket}`;
    console.log(tokenvalue);
    const message = tokenvalue.toString(); 

    var transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        auth: {
         user: 'mitchell.roberts@ethereal.email',
          pass: 'YmM4k9kkbxMkAC9sfR'
        },
        tls: {
            rejectUnauthorized: false
        }
      });
      
      var mailOptions = {
        from: 'anthony44@ethereal.email',
        to: 'davidferere@gmail.com',
        subject: 'ticket de compra de Ecommerce MI EMPRENDIMIENTO',
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


async deleteprodmailing(product, owner) {

  const tokenvalue = `Se he eliminado el producto: ${product}`;
  console.log(tokenvalue);
  const message = tokenvalue.toString(); 

  var transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      auth: {
       user: 'mitchell.roberts@ethereal.email',
        pass: 'YmM4k9kkbxMkAC9sfR'
      },
      tls: {
          rejectUnauthorized: false
      }
    });
    
    var mailOptions = {
      from: 'anthony44@ethereal.email',
      to: owner,
      subject: 'ticket de compra de Ecommerce MI EMPRENDIMIENTO',
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
