import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'

import passport from 'passport'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import cookieParser from 'cookie-parser'
import cors from 'cors'
// Routers
import authRouter from './routes/auth.mjs'

const corsOptions = {
  origin: ['https://bysolitdio.net', 'https://www.bysolitdio.net'],

  //credentials: true,
  optionsSuccessStatus: 200,
  credentials: true,
}

try {
  const connection = await mongoose.connect(process.env.MongoDB_URI)
  console.log('Database connected')
} catch {
  console.log('Error occured')
}
const app = express()
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser('yes'))
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
      dbName: 'boiler',
    }),
  })
)
app.use(passport.initialize())
app.use(passport.session())

const port = process.env.PORT

app.use('/auth', authRouter)
app.get('/', (req, res) => {
  res.send('Here is the Home Page')
})

app.listen(port, () => {
  console.log(`Server listening to port: ${port}`)
})
