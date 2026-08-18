import nodemailer from "nodemailer";

export async function sendVerificationEmail(email: string, token: string) {
  const transport = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: Number(process.env.MAILTRAP_PORT) || 2525,
    secure: false,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });

  const verificationUrl = `${process.env.DOMAIN || "http://localhost:3000"}/verifyemail?token=${token}`;

  await transport.sendMail({
    from: process.env.MAILTRAP_FROM || "noreply@example.com",
    to: email,
    subject: "Verify your email address",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Email Verification</h2>
        <p>Thanks for signing up. Please verify your email address by clicking the button below:</p>
        <p>
          <a href="${verificationUrl}" style="display: inline-block; padding: 10px 18px; background: #2563eb; color: #fff; text-decoration: none; border-radius: 6px;">
            Verify Email
          </a>
        </p>
        <p>If the button does not work, copy and paste this link in your browser:</p>
        <p>${verificationUrl}</p>
      </div>
    `,
  });
}
