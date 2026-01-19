import mongoose from 'mongoose';

// TypeScript interface to define the structure of our global mongoose connection
interface MongooseConnection {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
}

// Extend the global object to include our mongoose connection cache
declare global {
  var mongoose: MongooseConnection | undefined;
}

// Get MongoDB URI from environment variables
const MONGODB_URI: string = process.env.MONGODB_URI!;

// Validate that MongoDB URI is provided
if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

/**
 * Global cache for the MongoDB connection.
 * In development, Next.js hot reloads can cause multiple connections to be created.
 * This cache prevents that by reusing the existing connection.
 */
const cached: MongooseConnection = global.mongoose || {
  conn: null,
  promise: null,
};

// Store the cached connection in the global object for development
if (!global.mongoose) {
  global.mongoose = cached;
}

/**
 * Establishes a connection to MongoDB using Mongoose.
 * Uses connection caching to prevent multiple connections during development.
 * 
 * @returns Promise<mongoose.Connection> - The MongoDB connection
 */
async function connectDB(): Promise<mongoose.Connection> {
  // If connection already exists, return it
  if (cached.conn) {
    return cached.conn;
  }

  // If no promise exists, create a new connection
  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false, // Disable command buffering for better error handling
      maxPoolSize: 10, // Maximum number of connections in the pool
      serverSelectionTimeoutMS: 5000, // How long to try selecting a server
      socketTimeoutMS: 45000, // How long a send or receive on a socket can take before timeout
      family: 4, // Use IPv4, skip trying IPv6
    };

    // Create the connection promise
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('Connected to MongoDB');
      return mongoose.connection;
    });
  }

  try {
    // Wait for the connection to be established
    cached.conn = await cached.promise;
  } catch (e) {
    // If connection fails, reset the promise so we can try again
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

/**
 * Disconnects from MongoDB.
 * Useful for cleanup in serverless environments or testing.
 */
async function disconnectDB(): Promise<void> {
  if (cached.conn) {
    await mongoose.disconnect();
    cached.conn = null;
    cached.promise = null;
    console.log('Disconnected from MongoDB');
  }
}

// Export the connection function and disconnect utility
export { connectDB, disconnectDB };
export default connectDB;