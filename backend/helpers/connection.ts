import mongoose from 'mongoose'

export const connectDb = () => {
  mongoose
    .connect(
      `mongodb://${process.env.MONGO_ROOT_USERNAME}:${process.env.MONGO_ROOT_PASSWORD}@mongodb:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}?authSource=admin`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    )
    .then(() => console.log('MongoDB Connected'))
    .catch((err: Error) => console.log(err))
}
