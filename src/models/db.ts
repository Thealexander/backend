// db.ts
import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Carga las variables de entorno desde el archivo .env
//todo: mejorar la coneccion de la base de datos  useNewUrlParser y useUnifiedTopology
const cn = async () => {
  try {
    const dbUrl = `mongodb://${process.env.MONGODB_URI}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DB}`;
    const options: ConnectOptions = {
  
    };

    await mongoose.connect(dbUrl, options);
    
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default cn;
