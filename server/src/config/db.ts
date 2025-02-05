import mongoose, { Mongoose } from "mongoose";

async function connectToDB(address: string): Promise<Mongoose> {
  try {
    // Connect to database
    return mongoose.connect(address);
  
  } catch (error) {
    // Log error and throw new database connection error
    console.error(error)
    throw new Error(`Failed to connect to database at ${address}`); 
  }
};

export default connectToDB;
