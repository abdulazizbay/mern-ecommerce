const mongoose = require("mongoose");


//////////////////////////////    
const categorySchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        unique: true,
        enum:["men","girls"]
    }
})

module.exports = mongoose.model('Category', categorySchema);
