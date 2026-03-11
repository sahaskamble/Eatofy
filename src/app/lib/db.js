import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGO_URI || 'mongodb://root:admin%409987@13.234.143.89:51265/?directConnection=true';

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local',
  )
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) {
    console.log("This is Existing connection");
    return cached.conn
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }
    cached.promise = mongoose.connect(MONGODB_URI, opts).then(mongoose => {
      console.log('Db connected')
      return mongoose
    })
  }
  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  console.log("This is New connection");
  return cached.conn
}

export default dbConnect
