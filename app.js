const express = require("express")
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000

//Load .env file
require('dotenv').config()

app.use(cors())
app.use(bodyParser.json())

app.use(express.static("public"))

const uri = process.env.ATLAS_URI
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    
})

const connection = mongoose.connection
connection.once('open', () => {
    console.log("Connection to MongoDB successful")
})

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

app.get('/', (req, res) => {
    res.render('index.html');
});

app.listen(port,
    () => console.log(`Server is running on port ${port}`))