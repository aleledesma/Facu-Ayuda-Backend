import { ObjectId } from "mongoose"

export interface UserInterface {
  //interfaz del usuario que se guarda en la sesión (no son todos los campos del usuario en la base de datos)
  id: ObjectId
  email: string
  username: string
  roles: { admin: boolean; student: boolean }
}
