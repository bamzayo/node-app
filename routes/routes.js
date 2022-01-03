const express = require("express");
const router = express.Router();
const bp = require("body-parser")

router.use(express.json())

router.use(bp.json())
router.use(bp.urlencoded({ extended: true}))

const {
    getTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
} = require("../controllers/func")

router.route("/").get(getTasks).post(createTask)
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask)


module.exports = router