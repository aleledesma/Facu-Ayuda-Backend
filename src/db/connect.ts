import mongoose from "mongoose"

const connectDB = async () => {
  if (!process.env.MONGODB_URL) {
    throw new Error("No existe la URL de la base de datos")
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL, { dbName: "dev" })
    console.log("Conectado a la Base de Datos")
  } catch (error) {
    console.log("Hubo un error al conectarse a la base de datos", error)
  }
}

export default connectDB
