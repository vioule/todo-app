import nodemailer, { Transporter } from "nodemailer";

let mailer: Transporter;
if (process.env.ENV_TARGET === "development") {
  mailer = nodemailer.createTransport({
    host: "mailhog",
    port: 1025,
  });
} else {
  mailer = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: "api",
      pass: process.env.SMTP_PASSWORD,
    },
    tls: { rejectUnauthorized: false },
  });
}

export default mailer;
