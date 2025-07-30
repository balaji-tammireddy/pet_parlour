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