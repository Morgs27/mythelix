import mongoose from 'mongoose';

export const connectDB = async () => {
    if (mongoose.connections[0].readyState) return;

    let url: string = process.env.MONGODB_URL || '';
    
    await mongoose.connect(url, {});
};