//importing express and mongoose
import express from 'express'
import mongoose from 'mongoose'
//using dotenv/config to load and run environment variables in .env file
import "dotenv/config"
//importing router 
import { router } from './routers/subscribers.js'

//connects to mongodb database
mongoose.connect(process.env.DATABASE_URL)
//grabs the db object from the database connection so we can use even listeners and stuff
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))


//starting up the app
const app = express()
//parse all req bodies into js objects 
app.use(express.json())

//rerouting /subscribers requests to router 
app.use('/subscribers', router)

app.listen(8000, () => console.log('Server is running on port 8000'))

