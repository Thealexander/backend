// db.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Carga las variables de entorno desde el archivo .env

const cn = async () => {
  try {
    const dbUrl = process.env.MONGODB_URI || `mongodb://testserver:${process.env.MONGODB_PORT}/bchat`;
    await mongoose.connect(dbUrl);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export default cn;
