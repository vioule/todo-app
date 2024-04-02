import mongoose from "mongoose";
import { ENV_TARGET } from "./constants";
declare global {
  var mongoose: any; // This must be a `var` and not a `let / const`
}

const DATABASE_URIS = {
  development: process.env.DATABASE_URI_DEVELOPMENT!,
  staging: process.env.DATABASE_URI_STAGING!,
  production: process.env.DATABASE_URI_PRODUCTION!,
};

const DATABASE_URI = DATABASE_URIS[ENV_TARGET];

if (!DATABASE_URI) {
  throw new Error(
    "Please define the DATABASE_URI_DEVELOPMENT, DATABASE_URI_STAGING and DATABASE_URI_PRODUCTION environment variables inside .env"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(DATABASE_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
