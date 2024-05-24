var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import sendMail from "./mailer";
const sendCodeMail = (email, randomCode) => __awaiter(void 0, void 0, void 0, function* () {
    const mailResult = yield sendMail({
        to: email,
        subject: `Codigo de inicio de sesión: ${randomCode}`,
        html: `Este es tu código para iniciar sesión: ${randomCode}`,
    });
    return mailResult;
});
export default sendCodeMail;
