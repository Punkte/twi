import jwt from 'jsonwebtoken'

const verify = (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization) {
    res.status(400).json({ error: 'no token provided' })
  } else {
    const bearerToken = authorization.split(' ')[1]
    try {
      const verified = jwt.verify(bearerToken, process.env.JWTSECRET)
      verified && next()
    } catch (error) {
      res.status(400).json({ error: 'Mauvais token' })
    }
  }
}

export default verify
