const mongoose = require("mongoose");

const seriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true 
    },
    type: {
        type: String,
        required: true,
        enum: ["comic", "book", "movie", "music"] 
    },
    publisher: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        enum: ["En cours", "Terminée", "Abandonnée"],
        default: "En cours"
    },
    total_volumes: {
        type: Number,
        default: 0 /
    }
}, 
{
    timestamps: true
});

module.exports = mongoose.model("Series", seriesSchema);