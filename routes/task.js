const express = require('express')
const router = express.Router();

const taskController = require('../controlleer/taskController')
router.get('/' , taskController.getAll )
router.get('/:id' , taskController.getById)
router.post('/' , taskController.Create)
router.put('/:id' , taskController.update)
router.delete('/:id' , taskController.remove)

module.exports= router;