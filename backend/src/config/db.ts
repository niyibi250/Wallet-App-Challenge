import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || '', { dbName: 'walletdb' });
    console.log('MongoDB Connected...');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

export default connectDB;
