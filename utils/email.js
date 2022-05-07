const nodemailer = require('nodemailer');

// new Email(user, url).sendWelcome();

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.url = url;
    this.from = `Matthew Smilansky <${process.env.EMAIL_FROM}>`;
  }
  createTransport() {
    if (process.env.NODE_ENV === 'production') {
      return 1;
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
  send(template, subject) {
    // Send the actual email - Render HTML based on a template
    res.render('o');
    // 2) Define email options
    const mailOptions = {
      from: 'Matthew Smilansky <msmilansky@gmail.com>',
      to: options.email,
      subject: options.subject,
      text: options.message
      // 3) create transport and send email
    };
  }
  sendWelcome() {
    this.send('welcome', 'Welcome to 12 Hour Study!');
  }
};

const sendEmail = async (options) => {
  // 2) Define the email options
  const mailOptions = {
    from: 'Matthew Smilansky <msmilansky@gmail.com>',
    to: `${user.email}`,
    subject: options.subject,
    text: options.message
    // html:
  };
  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};
