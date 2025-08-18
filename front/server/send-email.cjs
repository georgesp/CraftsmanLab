/* Minimal email sending server using Express + Nodemailer (CommonJS)
   - Expects environment variables: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_EMAIL
   - Run with: node server/send-email.cjs
*/
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

// Basic health
app.get('/health', (req, res) => res.send('ok'));

app.post('/send-email', async (req, res) => {
  const { name, email, subject, message } = req.body || {};
  if (!name || !email || !subject || !message) {
    return res.status(400).send('Champs manquants');
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const contactEmail = process.env.CONTACT_EMAIL;

  if (!smtpHost || !smtpPort || !smtpUser || !smtpPass || !contactEmail) {
    console.error('Missing SMTP configuration');
    return res.status(500).send('Serveur mal configuré');
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: Number(smtpPort),
    secure: Number(smtpPort) === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const mailOptions = {
    from: `${name} <${email}>`,
    to: contactEmail,
    subject: `[Site CraftsmanLab] ${subject}`,
    text: `Message de ${name} <${email}>:\n\n${message}`,
    html: `<p>Message de <strong>${name}</strong> &lt;${email}&gt; :</p><p>${message.replace(/\n/g, '<br/>')}</p>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email envoyé:', info.messageId);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Failed to send email:', err);
    return res.status(500).send('Erreur lors de l\'envoi de l\'email');
  }
});

app.listen(port, () => {
  console.log(`Send-email server listening on port ${port}`);
});
