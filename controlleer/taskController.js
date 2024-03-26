const fs = require('fs')
const uuid = require('uuid')
const path = require('path');
const { error } = require('console');
const e = require('express');

function readFile() {
    const filePath = path.resolve(__dirname, '../Task.json');
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading file:', error);
        return null;
    }

    
}
function writeFile(data) {
    
    fs.writeFileSync(`${__dirname}/../Task.json`, JSON.stringify(data), 'utf8')
}

     const getAll = (req , res) => {
    
        try {
            
            res.status(200).json({task: readFile()})
        } catch(e) {
            // Handling errors and sending a 500 status code with error message
            res.status(500).json({ error: e })
        }
    } 

    const getById = (req ,res) =>{
        
        try{
            const task_id = req.params.id
            const task = readFile()[task_id]
        
            if (task) {
           return res.status(200).json({Task :task })
        }
         res.status(404).json({'message':`Task id ${task_id} dose not exist`});
    } catch(e) {
        // Handling errors and sending a 500 status code with error message
        res.status(500).json({ error: e })
    }
    }

    const Create = (req , res) => {
        const data = req.body
        let task = readFile()
        const id = uuid.v4()
    try{
        if(task[id]){
             return res.json({'message' :`Task Id: ${id} is already exist`})
    
        } 
         data['id']=id
        task[id] = data
        writeFile(task)
    
         res.status(201).json({'message' :task[id]})
         data['id']=id
         task[id] = data
         writeFile(task)
     
          res.status(201).json({'message' :task[id]})}

        catch(e){
            return res.status(500).json({error:e})
        }
       

   
    
    }

    const update = (req , res ) =>{
        const data = req.body
        const id = req.params.id
        let task = readFile()
        try{

        
        if (task[id]){
            data['id']=id
            task[id] = data
            writeFile(task)
            res.status(201).json({'message' :task[id]})
    
        } 
        return res.json({'message' :`Task Id: ${id}not found `}) }
        catch(e){
            return res.status(500).json({error:e})
        }
    
        
    }

    const remove = (req ,res) => {

        const idTask=req.params.id
        const task= readFile()[idTask]
        try{
        if(!task){
           return  res.json({'message' : `The task with ID: ${idTask} does not exist`  })
        }
        delete task[idTask]
        res.json({'message' : `The task with ID: ${idTask} has been deleted`  })
    }
    catch(e){
        return res.status(500).json({error:e})
    }

    }


    module.exports ={
        getAll , getById , Create ,update ,remove

    }






