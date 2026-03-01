const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['music', 'comic', 'book', 'movie']
    },
    title: {
        type: String, 
        required: true
    },
    cover_url: {
        type: String,
        default: ""
    },
    barcode: {
        type: String
    },
    estimated_value: {
        type: Number,
        default: 0
    },
    metadata: {
        type: mongoose.Schema.Types.Mixed
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Item", itemSchema);