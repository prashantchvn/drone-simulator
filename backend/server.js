const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const waypoints = require('./controllers/waypoints');

// middlewares
app.use(cors())
app.use(express.json())

//mongoDb database connection
mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://prashantchnv:Kn%21ght%4010@cluster0.ht1ewxa.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true })

app.listen(5000,()=>{
    console.log('Server started')
    console.log(mongoose.connection.readyState);
})

app.use("/api/waypoints", waypoints);
