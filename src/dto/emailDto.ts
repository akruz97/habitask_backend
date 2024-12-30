import  nodemailer  from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/json-transport';




  const sendEmailNotification = async (text: string, to: string) => {

    let options: MailOptions = {
        from: '"Habitask" <jcruzal97@gmail>',
        to: to,
        subject: "Habitask",
        text: text,
    }

    const transporter = nodemailer.createTransport({
      host:  String(process.env.EMAIL_HOST) || '',
      port: parseInt(process.env.EMAIL_PORT),
      secure: true,
      auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.PASS_EMAIL,
      }
        // host: String(process.env.EMAIL_HOST),
        // port: Number(process.env.PORT),
        // secure: process.env.EMAIL_SECURITY,
        // auth: {
        //   user: process.env.USER_EMAIL,
        //   pass: process.env.PASS_EMAIL,
        // },
      } );

      transporter.sendMail(options, (error, info) => {
        if (error) {
          console.error("Error sending email: ", error);
          return false
        } else {
          console.log("Email sent: ", info.response);
          return true;
        }
      });
  }

  export {
    // transporter,
    sendEmailNotification
  }