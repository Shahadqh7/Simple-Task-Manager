const express = require('express') // Extract express library
const app = express() //Create an instance
app.use(express.json()) //sets app JSON parsing middleware

const TaskRoute= require('./routes/task') //give accesse to task route
const controller = require('./controlleer/taskController' ) //give accesse to task controller

app.use('/task' , TaskRoute) // associate a route with a router file named TaskRoute.
app.listen(4000, console.log('listening')) //create port for the server