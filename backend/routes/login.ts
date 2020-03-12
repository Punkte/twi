import express from 'express'
import jwt from 'jsonwebtoken'
import UserSchema, { User } from '../models/users'
import bcrypt from 'bcrypt'

const router = express.Router()

router.post('/', async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    res.status(400).json({ error: 'please provide a username and a password' })
  }
  // console.log(username, password)
  const userExists = await UserSchema.exists({ username })
  let response

  if (userExists) {
    const user: User = await UserSchema.findOne({ username })
    const match = await bcrypt.compare(password, user.password)
    if (match) {
      const token = jwt.sign({ username }, process.env.JWTSECRET)
      response = { payload: { token }, code: 200 }
    } else {
      response = { payload: { error: 'invalid password' }, code: 400 }
    }
  } else {
    response = { payload: { error: 'user not found' }, code: 400 }
  }
  res.status(response.code).json(response.payload)
})

export default router
