const nodemailer = require('nodemailer');
const ejs = require('ejs');
const { htmlToText } = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.url = url;
    this.from = `<${process.env.EMAIL_FROM}>`;
  }

  // this function will return two different functions: one in the production environment that uses SendGrid as its service with SendGrid user/pass as its auth creds, and one for development that uses MailTrap and its respective creds.
  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD
        }
      });
    }
    return nodemailer.createTransport({
      // service: 'Gmail',
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }
  async send(template, subject) {
    // Render template as HTML; the 2nd argument in 'ejs.renderFile' is the data that you want to be passed to and used by the template.
    const html = await ejs.renderFile(
      `${__dirname}/../views/emails/${template}.ejs`,
      {
        from: this.from,
        to: this.to,
        url: this.url
      }
    );

    // This is the mail options object that's passed as an arg into the sendMail() method of our newTransport function defined above; it defines information about the message, mostly self-explanatory.
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText(html)
      // 3) create transport and send email
    };
    await this.newTransport().sendMail(mailOptions);
  }

  // Here are defined the email actions. Each one takes a template name as well as the subject of the email. (see 'send' method above.)
  // email actions
  async sendWelcome() {
    await this.send('welcome', 'Welcome to 12 Hour Study!');
  }
  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Reset Your Password - 12 Hour Study (valid for only 10 minutes)'
    );
  }
};
