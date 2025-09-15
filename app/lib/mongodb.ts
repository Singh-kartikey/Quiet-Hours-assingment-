// lib/mongodb.ts
import mongoose, { Mongoose } from "mongoose";

// ---------------- TYPES ----------------
type CachedMongoose = {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
};

declare global {
  // Add cached mongoose to globalThis to avoid multiple connections in dev
  // eslint-disable-next-line no-var
  var mongoose: CachedMongoose | undefined;
}

// ---------------- ENV ----------------
const MONGODB_URI: string | undefined = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Add MONGODB_URI to .env.local");
}

// ---------------- CACHE ----------------
let cached: CachedMongoose = global.mongoose ?? { conn: null, promise: null };
global.mongoose = cached;

// ---------------- CONNECT FUNCTION ----------------
export async function dbConnect(): Promise<Mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI as string).then((mongoose) => {
      console.log("MongoDB connected ✅");
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
