import { Response } from "express"
import sendMail from "./mailer"

const sendCodeMail = async (email: string,randomCode: string, res: Response) => {
    const mailResult = await sendMail({
        to: email,
        subject: `Codigo de inicio de sesión: ${randomCode}`,
        html: `Este es tu código para iniciar sesión: ${randomCode}`
    })
    return mailResult
}

export default sendCodeMail