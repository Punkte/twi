import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import login from './routes/login'
import users from './routes/users'
import { connectDb } from './helpers/connection'

const app = express()
const APP_RUNNING_PORT = process.env.APP_PORT || 3001

connectDb()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.json({ good: '2 go ' })
})

app.use('/login', login)
app.use('/users', users)

app.listen(APP_RUNNING_PORT)
