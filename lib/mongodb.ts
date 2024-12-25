import mongoose, { ConnectOptions } from 'mongoose';

const connectMongo = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  await mongoose.connect(process.env.MONGODB_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
};

export default connectMongo;