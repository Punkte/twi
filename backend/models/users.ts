import { Schema, model, Document } from 'mongoose'
import bcrypt from 'bcrypt'
const SALT_WORK_FACTOR = 10

// définition de l'interface qui correspond à l'entité User
export interface User extends Document {
  username: string
  password: string
}

// définition de l'entité User
const UserSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
  },
})

// à l'export, transformation du Schema en model mongoose
export default model<User>('User', UserSchema)
