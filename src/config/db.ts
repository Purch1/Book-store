import mongoose from "mongoose";
import Logging from "../library/Logging";

export const connectToMongoDB = (): void => {
  const MONGO_URL = 'mongodb://0.0.0.0:27017/typescript';

  mongoose.Promise = Promise;
  mongoose.connect(MONGO_URL)
  .then(() => { Logging.info("Mongo connected successfully.");
  })
  .catch((error) => Logging.error(error));

  mongoose.connection.on('error', (error: Error) => console.log(error));
};
