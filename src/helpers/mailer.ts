import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

export default async function sendEmail({email, emailType, userId}: any) {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if(emailType === "RESET") {    
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000
            });
        } else if(emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            });
        }

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "6b230b80c6caec",
                pass: "e00438b6abf707"
            }
        });

        const mailOptions = {
            from: "shreyasnk532@gmail.com",
            to: email,
            subject: emailType === "RESET" ? "Reset your password" : "Verify your email",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        };

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;
    } catch (error: any) {
        console.log("Error sending email", error.message);
        throw new Error("Error sending email");
    }
}