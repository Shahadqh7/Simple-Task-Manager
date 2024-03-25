const fs = require('fs') // Extract FileSystem library
const uuid = require('uuid') // Import UUID library for generating unique IDs
const path = require('path'); // Import path module for working with file paths

// Function to read data from the Task.json file
function readFile() {
    // Resolve the file path relative to the current directory
    const filePath = path.resolve(__dirname, '../Task.json');
    try {
        // Read the file synchronously and parse its JSON content
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        // Handle errors if any occur during file reading
        console.error('Error reading file:', error);
        return null;
    }   
}

// Function to write data to the Task.json file
function writeFile(data) {
    // Writing the data to Task.json file
    fs.writeFileSync(`${__dirname}/../Task.json`, JSON.stringify(data), 'utf8')
}

// Function to handle GET request to retrieve all tasks
const getAll = (req , res) => {
    try {
        // Sending a JSON response containing all tasks
        res.status(200).json({task: readFile()})
    } catch(e) {
        // Handling errors and sending a 500 status code with error message
        res.status(500).json({ error: e })
    }
}

// Function to handle GET request to retrieve a task by ID
const getById = (req ,res) => {
    try {
        const task_id = req.params.id // Extract task ID from request parameters
        const task = readFile()[task_id] // Retrieve task with specified ID from data

        if (task) {
            // If task exists, send it as a JSON response
            return res.status(200).json({Task :task })
        }
        // If task does not exist, send a 404 error response
        res.status(404).json({'message':`Task id ${task_id} dose not exist`});
    } catch(e) {
        // Handling errors and sending a 500 status code with error message
        res.status(500).json({ error: e })
    }
}

// Function to handle POST request to create a new task
const Create = (req , res) => {
    const data = req.body // Extract data from request body
    let task = readFile() // Read existing tasks data
    const id = uuid.v4() // Generate a unique ID for the new task

    if(task[id]){
        // If task with generated ID already exists, return a message
        return res.json({'message' :`Task Id: ${id} is already exist`})
    }
    data['id']=id // Assign generated ID to the task data
    task[id] = data // Add new task to the tasks data
    writeFile(task) // Write updated tasks data to file

    // Send a 201 status code with a message and the created task as response
    res.status(201).json({'message' :task[id]})
}

// Function to handle PUT request to update an existing task
const update = (req , res ) => {
    const data = req.body // Extract data from request body
    const id = req.params.id // Extract task ID from request parameters
    let task = readFile() // Read existing tasks data

    if (task[id]){
        data['id']=id // Assign task ID to the task data
        task[id] = data // Update task data with new values
        writeFile(task) // Write updated tasks data to file
        // Send a 201 status code with a message and the updated task as response
        res.status(201).json({'message' :task[id]})
    } 
    // If task does not exist, return a message
    return res.json({'message' :`Task Id: ${id}not found `})
}

// Function to handle DELETE request to remove a task
const remove = (req ,res) => {
    const idTask=req.params.id // Extract task ID from request parameters
    const task= readFile()[idTask] // Retrieve task with specified ID from data

    if(!task){
        // If task does not exist, return a message
        return  res.json({'message' : `The task with ID: ${idTask} does not exist`  })
    }
    delete task[idTask] // Remove task from tasks data
    // Send a success message as response
    res.json({'message' : `The task with ID: ${idTask} has been deleted`  })
}

// Export all functions to be used in other modules
module.exports ={
    getAll , getById , Create ,update ,remove
}
