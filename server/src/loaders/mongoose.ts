import mongoose, { ConnectOptions } from 'mongoose';

export default async () => {
  try {
    if (process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', true);
    }
    const uri = process.env.DB_URL as string;
    await mongoose.connect(uri, { useNewUrlParser: true, dbName: 'NogariHouse' } as ConnectOptions);
  } catch (error) {
    console.error(error);
  }
};
