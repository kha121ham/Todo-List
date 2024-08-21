const express = require('express');
const router = express.Router();
const { check,validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const User = require('../../model/User');
const Task = require('../../model/Task');
//@rout    Post api/todo
//@desc    Create a Task
//@access   private
router.post('/',[auth,
    check('text','Text is required').not().isEmpty(),
],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors:errors.array() });
    }
    try {
        //get user by ID
        const user = await User.findById(req.user.id).select('-password');
        const newTask = new Task({
            text:req.body.text,
            name:user.name,
            user:req.user.id,
            avatar:user.avatar
        });
        await newTask.save();
        res.json(newTask)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

//@rout    Get api/todo
//@desc    Get all user tasks
//@access   private
router.get('/',auth,async (req,res)=>{
    try {
        //get all Tasks
        const tasks = await Task.find().sort({date:-1});

        const userTasks= tasks.filter(task=>task.user == req.user.id);
        res.json(userTasks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@rout    Delete api/todo/:id
//@desc    Delete task
//@access   private
router.delete('/:id',auth,async (req,res)=>{
    try {
    //get task by id
    const task = await Task.findById(req.params.id);
    //check if post not exist
    if(!task) {
        return res.status(404).json({ msg:'Post not found' })
      }
      await task.deleteOne();
      res.json({msg:'Task removed'});
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId') {
          return res.status(404).json({ msg:'Post not found' })
        }
        res.status(500).send('Server Error');
    }

})

module.exports = router;