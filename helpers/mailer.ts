import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
})

interface EmailParams {
    to: string,
    subject: string,
    html: string
}

const sendMail = async ({to, subject, html} : EmailParams) => {
    try {
        await transporter.sendMail({
            from: `FacuAyuda ${process.env.EMAIL}`,
            to,
            subject,
            html
        })
        return {ok: true, message: "mail enviado correctamente"}
    } catch (error) {
        console.log(error)
        return {ok: false, message: "error al enviar el mail"}
    }
    
}

export default sendMail