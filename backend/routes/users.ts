import express from 'express'
import UserSchema, { User } from '../models/users'
import bcrypt from 'bcrypt'

const router = express.Router()

router.post('/create', async (req, res) => {
  const { username, password } = req.body
  const passwordHash: string = await bcrypt.hash(password, 10)
  const exists: boolean = await UserSchema.exists({ username })

  if (exists === false) {
    const user = new UserSchema({
      username,
      password: passwordHash,
    })
    const createdUser: User = await user.save()
    res.status(201).json({ createdUser })
  } else {
    res.status(501).json({ error: 'user already exists', headers: req.headers })
  }
  res.status(400).json('an error occured')
})

export default router
