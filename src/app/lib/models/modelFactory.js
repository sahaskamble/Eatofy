import mongoose from 'mongoose';

export function createModelFactory(modelName, schema) {
  // For client-side, return a dummy model
  if (typeof window !== 'undefined') {
    return {
      modelName,
      schema,
      // Add any methods you need to mock for client-side
      find: async () => [],
      findOne: async () => null,
      create: async () => ({}),
    };
  }

  // For server-side, return the actual model
  try {
    return mongoose.model(modelName);
  } catch {
    return mongoose.model(modelName, schema);
  }
}
