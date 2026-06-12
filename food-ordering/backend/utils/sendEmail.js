// // // // // backend/utils/sendEmail.js
// // // // const { Resend } = require("resend");

// // // // // Initialize the Resend client with your API key from .env
// // // // const resend = new Resend(process.env.RESEND_API_KEY);

// // // // /**
// // // //  * Automatically sends emails (like OTPs) using Resend API.
// // // //  * This is called from your authController during registration or OTP resend.
// // // //  */
// // // // const sendEmail = async (to, subject, html) => {
// // // //   try {
// // // //     const fromEmail = process.env.RESEND_FROM || "Foodify 🍴 <onboarding@resend.dev>";

// // // //     const response = await resend.emails.send({
// // // //       from: fromEmail,
// // // //       to,
// // // //       subject,
// // // //       html,
// // // //     });

// // // //     console.log(`✅ Email sent automatically via Resend to ${to}`);
// // // //     return response;
// // // //   } catch (error) {
// // // //     console.error("❌ Resend email error:", error.message || error);
// // // //     throw new Error("Failed to send OTP email via Resend");
// // // //   }
// // // // };

// // // // module.exports = sendEmail;









// // // // backend/utils/sendEmail.js
// // // const { Resend } = require("resend");

// // // // Initialize Resend client with your API key from .env
// // // const resend = new Resend(process.env.RESEND_API_KEY);

// // // /**
// // //  * Automatically sends OTP or other transactional emails
// // //  * via Resend (no SMTP or app passwords needed).
// // //  */
// // // const sendEmail = async (to, subject, html) => {
// // //   try {
// // //     const fromEmail = process.env.RESEND_FROM || "Foodify 🍴 <onboarding@resend.dev>";

// // //     const response = await resend.emails.send({
// // //       from: fromEmail,
// // //       to,
// // //       subject,
// // //       html,
// // //     });

// // //     console.log(`✅ Email sent automatically to ${to}`);
// // //     return response;
// // //   } catch (error) {
// // //     console.error("❌ Resend email error:", error.message || error);
// // //     throw new Error("Failed to send OTP email via Resend.");
// // //   }
// // // };

// // // module.exports = sendEmail;

// // const { Resend } = require("resend");

// // const resend = new Resend(process.env.RESEND_API_KEY);

// // const sendEmail = async (to, subject, html) => {
// //   try {
// //     const fromEmail = process.env.RESEND_FROM || "Foodify 🍴 <onboarding@resend.dev>";

// //     const response = await resend.emails.send({
// //       from: fromEmail,
// //       to,
// //       subject,
// //       html,
// //     });

// //     console.log(`✅ Email sent automatically to ${to}`);
// //     return response;
// //   } catch (error) {
// //     console.error("❌ Resend email error:", error.message || error);
// //     throw new Error("Failed to send OTP email via Resend.");
// //   }
// // };

// // module.exports = sendEmail;





// // backend/utils/sendEmail.js
// const { Resend } = require("resend");

// // Initialize Resend client with API key from environment
// const resend = new Resend(process.env.RESEND_API_KEY);

// /**
//  * Sends an OTP or verification email via Resend (no SMTP required)
//  * @param {string} to - recipient email
//  * @param {string} subject - email subject
//  * @param {string} otp - the OTP or message body content
//  * @param {string} [name] - optional user name for personalization
//  */
// const sendEmail = async (to, subject, otp, name = "User") => {
//   try {
//     const fromEmail = process.env.RESEND_FROM || "onboarding@resend.dev";

//     // 🧠 Create beautiful responsive HTML body
//     const html = `
//       <html>
//         <body style="font-family: 'Poppins', Arial, sans-serif; background: #f9fafb; padding: 30px; color: #333;">
//           <div style="max-width: 500px; margin: 0 auto; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.1); padding: 30px;">
            
//             <h2 style="color: #ff4b2b; text-align: center;">🍴 Foodify Verification</h2>
//             <p style="font-size: 16px;">Hi <strong>${name}</strong>,</p>

//             <p style="font-size: 15px; line-height: 1.6;">
//               Thank you for signing up with <strong>Foodify</strong>! To complete your registration, please use the OTP below to verify your email.
//             </p>

//             <div style="text-align: center; margin: 30px 0;">
//               <div style="display: inline-block; background: linear-gradient(135deg, #ff4b2b, #9333ea); color: #fff; padding: 15px 40px; font-size: 28px; font-weight: bold; border-radius: 12px; letter-spacing: 5px;">
//                 ${otp}
//               </div>
//             </div>

//             <p style="font-size: 14px; color: #555; line-height: 1.5;">
//               This OTP is valid for <strong>10 minutes</strong>. If you did not request this verification, please ignore this email.
//             </p>

//             <p style="margin-top: 30px; text-align: center; font-size: 13px; color: #999;">
//               — The Foodify Team 🍕<br/>
//               <a href="#" style="color: #9333ea; text-decoration: none;">www.foodify-campus.com</a>
//             </p>
//           </div>
//         </body>
//       </html>
//     `;

//     // Send via Resend API
//     const response = await resend.emails.send({
//       from: fromEmail,
//       to,
//       subject,
//       html,
//     });

//     console.log(`✅ OTP email sent to ${to}`);
//     console.log("📬 Resend Response:", response);
//     return response;
//   } catch (error) {
//     console.error("❌ Failed to send email via Resend:", error.message || error);
//     throw new Error("Failed to send OTP email.");
//   }
// };

// module.exports = sendEmail;



// const { Resend } = require("resend");
// const resend = new Resend(process.env.RESEND_API_KEY);

// const sendEmail = async (to, subject, otp, name = "User") => {
//   try {
//     const fromEmail = process.env.RESEND_FROM || "Foodify 🍴 <onboarding@resend.dev>";

//     const html = `
//       <html>
//         <body style="font-family: Poppins, Arial, sans-serif; background: #fafafa; padding: 30px; color: #333;">
//           <div style="max-width: 520px; margin: 0 auto; background: white; border-radius: 14px; box-shadow: 0 4px 14px rgba(0,0,0,0.08); padding: 25px;">
//             <h2 style="color: #ff4b2b; text-align:center;">🍴 Foodify Email Verification</h2>
//             <p style="font-size: 16px;">Hi <strong>${name}</strong>,</p>
//             <p style="font-size: 15px;">Use the following code to verify your Foodify account:</p>
//             <div style="text-align:center; margin: 25px 0;">
//               <div style="background: linear-gradient(135deg, #ff4b2b, #9333ea); color: white; padding: 15px 35px; border-radius: 10px; display:inline-block; font-size: 28px; letter-spacing: 6px; font-weight:bold;">
//                 ${otp}
//               </div>
//             </div>
//             <p style="font-size: 14px; color: #555;">This OTP will expire in <strong>10 minutes</strong>.</p>
//             <p style="font-size: 13px; color: #999; text-align:center;">— The Foodify Team 🍕</p>
//           </div>
//         </body>
//       </html>
//     `;

//     await resend.emails.send({ from: fromEmail, to, subject, html });
//     console.log(`✅ Sent OTP to ${to}`);
//   } catch (err) {
//     console.error("❌ Failed to send email via Resend:", err.message);
//     throw new Error("Email delivery failed");
//   }
// };

// module.exports = sendEmail;






const { Resend } = require("resend");
const nodemailer = require("nodemailer");

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY || "temp");

// Configure Nodemailer Transporter if credentials are in .env
let transporter = null;
if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_PORT === "465",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  console.log("✉️ [Nodemailer] SMTP Transporter configured.");
} else if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  console.log("✉️ [Nodemailer] Gmail Transporter configured.");
}

const sendEmail = async (to, subject, otp, name = "User") => {
  const html = `
    <html>
      <body style="font-family: Poppins, Arial, sans-serif; background: #fafafa; padding: 30px; color: #333;">
        <div style="max-width: 520px; margin: 0 auto; background: white; border-radius: 14px; box-shadow: 0 4px 14px rgba(0,0,0,0.08); padding: 25px;">
          <h2 style="color: #ff4b2b; text-align:center;">🍴 Foodify Verification</h2>
          <p style="font-size: 16px;">Hi <strong>${name}</strong>,</p>
          <p style="font-size: 15px;">Use the following code for your Foodify request:</p>
          <div style="text-align:center; margin: 25px 0;">
            <div style="background: linear-gradient(135deg, #ff4b2b, #9333ea); color: white; padding: 15px 35px; border-radius: 10px; display:inline-block; font-size: 28px; letter-spacing: 6px; font-weight:bold;">
              ${otp}
            </div>
          </div>
          <p style="font-size: 14px; color: #555;">This OTP will expire in <strong>10 minutes</strong>.</p>
          <p style="font-size: 13px; color: #999; text-align:center;">— The Foodify Team 🍕</p>
        </div>
      </body>
    </html>
  `;

  // Try Nodemailer if configured
  if (transporter) {
    try {
      const fromEmail = process.env.EMAIL_USER || process.env.SMTP_USER || "Foodify <noreply@foodify.com>";
      await transporter.sendMail({
        from: `"Foodify" <${fromEmail}>`,
        to,
        subject,
        html,
      });
      console.log(`✅ [Nodemailer] Sent email to ${to}`);
      return;
    } catch (err) {
      console.error("❌ Nodemailer failed, falling back to Resend:", err.message);
    }
  }

  // Try Resend fallback
  try {
    const fromEmail = process.env.RESEND_FROM || "onboarding@resend.dev";
    await resend.emails.send({
      from: fromEmail.startsWith("Foodify") ? fromEmail : `Foodify 🍴 <${fromEmail}>`,
      to,
      subject,
      html,
    });
    console.log(`✅ [Resend] Sent OTP to ${to}`);
  } catch (err) {
    console.error("❌ Failed to send email via Resend:", err.message);
    
    // In development mode, do not fail the login/reset request if emails fail to send
    if (process.env.NODE_ENV === "development") {
      console.log(`⚠️ [Dev Mode] Email failed but request allowed. OTP generated is: ${otp}`);
      return;
    }
    
    throw new Error("Email delivery failed");
  }
};

module.exports = sendEmail;
