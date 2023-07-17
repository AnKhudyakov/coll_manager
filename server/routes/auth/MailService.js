import nodemailer from "nodemailer";

class MailService {
  async sendActivationMail(to, link) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: "Activaton account on " + process.env.CLIENT_URL,
      text: "",
      html: `
              <div>
                <h1>To activate follow the link</h1>
                <a href="${link}">${link}</a>
              </div>
            `,
    });
    console.log("Send message", info.messageId);
  }
}

export default new MailService();
