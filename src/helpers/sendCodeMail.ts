import sendMail from "./mailer.js"

const sendCodeMail = async (email: string, randomCode: string) => {
  const mailResult = await sendMail({
    to: email,
    subject: `Codigo de inicio de sesión: ${randomCode}`,
    html: `Este es tu código para iniciar sesión: ${randomCode}`,
  })
  return mailResult
}

export default sendCodeMail
