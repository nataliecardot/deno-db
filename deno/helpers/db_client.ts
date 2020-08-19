import {
  MongoClient,
  Database,
} from "https://deno.land/x/mongo@v0.10.0/mod.ts";

let db: Database;

// // Tells server to load anything in .env file into an environment variable
// require('dotenv').config();

// const MONGODB_URI =
//   // process object is globally available in Node app; part of Node core runtime. The env property contains all environment variables known by process object. Using dotenv to store environment variables. It loads environment variables from .env file into process.env (see https://www.youtube.com/watch?v=17UVejOw3zA)
//   `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-4yuid.mongodb.net/${process.env.MONGO_DATABASE_NAME}`;

export function connect() {
  const client = new MongoClient();
  // // Replace password
  // client.connectWithUri(
  //   "mongodb+srv://natalie:<password>@cluster0-4yuid.mongodb.net?retryWrites=true&w=majority",
  // );

  db = client.database("todos-app-deno");
}

export function getDb() {
  return db;
}
