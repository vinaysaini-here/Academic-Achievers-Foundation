import transporter from "../config/emailConfig.js";
import EmailVerificationModel from "../models/emailVerification.js";

const sendEmailVerificationEmail = async (req, user) => {
  const otp = Math.floor(1000 + Math.random() * 9000);

  await new EmailVerificationModel({
    userId: user._id,
    otp: otp,
  }).save();

  await transporter.sendMail({
    from: process.env.Email_FROM,
    to: user.email,
    subject: "OTP - Verify your account",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email</title>
    <style>
        @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
        }
        @keyframes shine {
            to {
                background-position: 200% center;
            }
        }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #2d3748;
            margin: 0;
            padding: 0;
            background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
            background-size: 400% 400%;
            animation: gradient 15s ease infinite;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
        }
        .card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 15px 35px rgba(0,0,0,0.2);
        }
        .header {
            text-align: center;
            padding: 40px 0;
            background: linear-gradient(120deg, #6b46c1, #805ad5, #6b46c1);
            background-size: 200% auto;
            animation: shine 3s linear infinite;
            position: relative;
            overflow: hidden;
        }
        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
        }
        .header h1 {
            color: white;
            margin: 0;
            font-size: 32px;
            text-transform: uppercase;
            letter-spacing: 3px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            position: relative;
        }
        .content {
            padding: 40px;
            background: linear-gradient(135deg, #ffffff 0%, #f8faff 100%);
        }
        .otp-container {
            text-align: center;
            margin: 35px 0;
            padding: 30px;
            background: linear-gradient(135deg, #f6f8ff 0%, #f1f4ff 100%);
            border-radius: 15px;
            border: 2px dashed #6b46c1;
            position: relative;
            animation: float 6s ease-in-out infinite;
        }
        .otp-container::before {
            content: '🔐';
            position: absolute;
            top: -15px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 24px;
        }
        .otp-code {
            font-size: 40px;
            font-weight: bold;
            letter-spacing: 12px;
            color: #4a5568;
            padding: 20px 30px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1),
                        0 10px 20px rgba(107, 70, 193, 0.1);
            display: inline-block;
            position: relative;
            overflow: hidden;
        }
        .otp-code::after {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(
                to right,
                rgba(255,255,255,0) 0%,
                rgba(255,255,255,0.3) 50%,
                rgba(255,255,255,0) 100%
            );
            transform: rotate(45deg);
            animation: shine 3s linear infinite;
        }
        .button {
            display: inline-block;
            padding: 15px 40px;
            background: linear-gradient(45deg, #6b46c1, #805ad5);
            color: white;
            text-decoration: none;
            border-radius: 30px;
            font-weight: bold;
            margin: 20px 0;
            text-align: center;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(107, 70, 193, 0.4);
            position: relative;
            overflow: hidden;
        }
        .button:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(107, 70, 193, 0.6);
        }
        .button::after {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(
                to right,
                rgba(255,255,255,0) 0%,
                rgba(255,255,255,0.3) 50%,
                rgba(255,255,255,0) 100%
            );
            transform: rotate(45deg);
            animation: shine 3s linear infinite;
        }
        .highlight {
            background: linear-gradient(120deg, #6b46c1 0%, #805ad5 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-weight: 600;
        }
        .info-box {
            background: rgba(107, 70, 193, 0.1);
            border-left: 4px solid #6b46c1;
            padding: 15px;
            margin: 20px 0;
            border-radius: 0 10px 10px 0;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #718096;
            margin-top: 30px;
            padding: 20px;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 10px;
        }
        .social-icons {
            margin: 20px 0;
        }
        .social-icons span {
            display: inline-block;
            margin: 0 10px;
            font-size: 24px;
        }
        .sparkle {
            position: relative;
        }
        .sparkle::before, .sparkle::after {
            content: '✨';
            position: absolute;
            animation: float 3s ease-in-out infinite;
        }
        .sparkle::before {
            left: -25px;
            top: -5px;
        }
        .sparkle::after {
            right: -25px;
            top: -5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <div class="header">
                <h1 class="sparkle">Verify Your Email</h1>
            </div>
            <div class="content">
                <p>Hello <span class="highlight">${user.name}</span>! 👋</p>
                
                <p>We're thrilled to welcome you to our community! To get started, please verify your email using this secure code:</p>
                
                <div class="otp-container">
                    <span class="otp-code">${otp}</span>
                </div>
                
                <div class="info-box">
                    <p>⏰ <strong>Important:</strong> This code will expire in <span class="highlight">10 minutes</span></p>
                    <p>🔒 Never share this verification code with anyone, including our support team.</p>
                </div>
                
              
                
                <p>If you didn't request this code, please ignore this email or contact our support team immediately.</p>
                
                <p>Welcome aboard!<br>
                <span class="highlight">Achievers
Education and Research Foundation</span> ✨</p>
                
                <div class="social-icons">
                    <span>📱</span>
                    <span>💌</span>
                    <span>💬</span>
                </div>
            </div>
            <div class="footer">
                <p>This is an automated message from our secure verification system.</p>
                <p>© All rights reserved.</p>
                <p>🔐 Protected by Academics Achievers Foundation Security</p>
            </div>
        </div>
    </div>
</body>
</html>`,
  });
};

export default sendEmailVerificationEmail;
