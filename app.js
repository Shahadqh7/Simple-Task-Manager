const express = require('express') // Extract express library
const app = express() //Create an instance
app.use(express.json())

const TaskRoute= require('./routes/task')
const controller = require('./controlleer/taskController' )

app.use('/task' , TaskRoute)
app.listen(4000, console.log('listening'))
console.log("hi innvoo")