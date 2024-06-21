const { MongoClient } = require("mongodb");

const connectDB = async (options = {}) => {
  try {
    const client = new MongoClient(process.env.DB_URL, options);
    await client.connect();
    console.log("MongoDB Connected Successfully");
    const db = client.db(); // use the default database specified in the connection string
    return db;
  } catch (error) {
    console.error("Error connecting to MongoDB, error: " + error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
