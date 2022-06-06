const express = require('express');
const app = express ()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const routerUrl = require('./router/router')
const cors = require('cors')

dotenv.config()
mongoose.connect(process.env.DATABASE_ACCESS, () => console.log("Database is connected"))

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false}))
app.use('/api/v1', routerUrl)
app.listen(5500, () => console.log('Server is running'))