const nodemailer = require('nodemailer');
const ejs = require('ejs');
const { htmlToText } = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.url = url;
    this.from = `<${process.env.EMAIL_FROM}>`;
  }
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
    // Send the actual email - Render HTML based on a template
    const html = await ejs.renderFile(
      `${__dirname}/../views/emails/${template}.ejs`,
      {
        to: this.to,
        url: this.url,
        subject
      }
    );

    // 2) Define email options
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
