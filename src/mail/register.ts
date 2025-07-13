import nodemailer from "nodemailer";

export async function sendWelcomeEmail(email: string, name: string, businessName: string) {
  const transporter = nodemailer.createTransport({
    // Configure your SMTP settings here
    host: "smtp.zoho.com",
    port: 587, // Use 465 for SSL, or 587 for TLS
    // If using port 587, change secure to false
    // If using port 465, change secure to true
    secure: false, // Use true for port 465, false for port 587
    auth: {
      user: process.env.MAIL || "",
      pass: process.env.PASSWORD || "",
    },
  });

  await transporter.sendMail({
    from: "Ekoru <contacto@ekoru.cl>",
    to: email,
    subject: "Bienvenido a Ekoru",
    text: `Hola ${name || businessName || "usuario"}, ¡gracias por registrarte en Ekoru!`,
    html: `<p>Hola ${name || businessName || "usuario"}, ¡gracias por registrarte en Ekoru!</p>`,
  });
}
