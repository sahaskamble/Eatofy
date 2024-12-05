import mongoose from 'mongoose';
import dbConnect from '../db';

export async function getModel(modelName, schema) {
  if (typeof window !== 'undefined') {
    throw new Error('This function should only be called on the server side');
  }

  await dbConnect();

  try {
    // Try to get existing model
    return mongoose.model(modelName);
  } catch (error) {
    // Model doesn't exist, create it
    return mongoose.model(modelName, schema);
  }
}
