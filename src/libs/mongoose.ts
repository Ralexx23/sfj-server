import mongoose, { ConnectOptions, Mongoose } from "mongoose";

function CreateOptions(): any {
  //const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
  //const MONGO_URI = `mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.1`;
  const MONGO_URI = `mongodb://127.0.0.1:27017/sfj`;
  //const MONGO_URI = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;
  const options: any = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  return { MONGO_URI, options };
}

const { MONGO_URI, options } = CreateOptions();
async function connectDB(): Promise<Mongoose> {
  mongoose.set("strictQuery", true);
  mongoose.set("strictPopulate", false);
  return mongoose.connect(MONGO_URI, options as ConnectOptions);
}

export default connectDB;
