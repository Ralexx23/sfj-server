import mongoose, { ConnectOptions, Mongoose } from 'mongoose';

function CreateOptions(): any {
    const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/${process.env.MONGO_DB}?retryWrites=true&w=majority`;    
    const options: any = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };
    return { MONGO_URI, options };
}

const { MONGO_URI, options } = CreateOptions();
async function connectDB(): Promise<Mongoose> {  
    mongoose.set('strictQuery', true);
    mongoose.set('strictPopulate', false);
    return mongoose.connect(MONGO_URI, options as ConnectOptions);
};

export default connectDB;
