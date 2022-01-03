const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name: {
        type: String,
        requred: true,
        maxlength: 20
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("Tasks", schema);