const Model = require('../models/tasks');
const mongoose = require('mongoose')

const getTasks = async (req, res) => {
    const tasks = await Model.find({});
    if(!tasks) res.status(404).send("no tasks found pls try again later...")
    res.status(200).json({tasks})   
}

const createTask = async (req, res) => {
    try {
        const task = await Model.create(req.body)
        res.status(201).send("done")
    } catch (error) {
        console.log(error);
    }
}

const getTask = async (req, res) => {
    const {id} = req.params
    const task = await Model.findOne({_id: id})
    if(!task) res.status(404).send("not found..")
    res.status(200).json({task})
    
}

const updateTask = async (req, res) => {
    try {
        const {id} = req.params
        const task = await Model.findOneAndUpdate({_id: id}, req.body, {
            runValidators: true,
            new: true
        } )
        res.status(200).json({task})
    } catch (error) {
        console.log(error);
    }
}
const deleteTask = async (req, res) => {
    try {
        const {id} = req.params
        const item = await Model.findOneAndDelete({_id: id})
        if(!item) res.status(404).send("we couldn't find the item with the id")
        res.status(200).json({item})
    } catch (error) {
        console.log(error);
    }
}

module.exports = {getTasks, createTask, getTask, updateTask, deleteTask}