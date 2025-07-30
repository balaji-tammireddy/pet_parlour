import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendWelcomeEmail = async (to: string, name: string) => {
  const logoUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/logo.png`;

  const mailOptions = {
    from: `"The Pet Parlour" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Welcome to The Pet Parlour 🎉",
    html: `
      <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f9fafb;">
        <img src="${logoUrl}" alt="The Pet Parlour Logo" style="width: 120px; margin-bottom: 15px;" />
        <h2 style="color: #4ade80;">Welcome, ${name}! 🐾</h2>
        <p style="font-size: 16px; color: #374151;">
          We're thrilled to have you at <strong>The Pet Parlour</strong>.
        </p>
        <p style="font-size: 14px; color: #6b7280;">
          You can now book grooming services, manage your pets, and enjoy the best experience for your furry friends.
        </p>
        <a href="${process.env.NEXT_PUBLIC_BASE_URL}" 
           style="display:inline-block; margin-top:20px; padding: 10px 20px; background-color: #4ade80; color: white; text-decoration:none; border-radius: 8px;">
          Visit Website
        </a>
        <p style="margin-top: 20px; font-size: 12px; color: #9ca3af;">
          © ${new Date().getFullYear()} The Pet Parlour. All rights reserved.
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export const sendResetPasswordEmail = async (to: string, resetLink: string) => {
  const mailOptions = {
    from: `"The Pet Parlour" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Reset Your Password - The Pet Parlour",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
        <div style="text-align: center;">
          <img src="${process.env.NEXT_PUBLIC_BASE_URL}/logo.png" alt="The Pet Parlour" width="120" style="margin-bottom: 20px;" />
        </div>
        <h2 style="color: #333;">Reset Your Password</h2>
        <p>Hello,</p>
        <p>You requested to reset your password. Click the button below to reset it. This link is valid for <strong>15 minutes</strong>.</p>
        <a href="${resetLink}" 
          style="display: inline-block; background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 10px;">
          Reset Password
        </a>
        <p style="margin-top: 20px; color: #555;">
          If you didn't request this, you can safely ignore this email.
        </p>
        <p style="margin-top: 20px; font-size: 12px; color: #aaa;">
          &copy; ${new Date().getFullYear()} The Pet Parlour. All rights reserved.
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export async function sendContactConfirmationToUser(name: string, email: string) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email, 
    subject: "Thank you for contacting The Pet Parlour!",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Hello ${name}!</h2>
        <p>Thank you for reaching out to <strong>The Pet Parlour</strong>.</p>
        <p>We have received your request, and our team will get back to you as soon as possible.</p>
        <p>Best regards,<br>The Pet Parlour Team</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}