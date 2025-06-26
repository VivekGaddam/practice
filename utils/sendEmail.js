const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, html) => {
  try {
    console.log(`📤 Sending email to: ${to}, subject: ${subject}`);
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"FoodBank" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log('✅ Email sent:', info.response);
  } catch (err) {
    console.error('❌ Email send error:', err);
  }
};

module.exports = sendEmail;
