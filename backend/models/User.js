const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    preferences:{
        theme: {
            type: String,
            enum: ["light", "dark"]
        },
        primary_color: {
            type: String
        },
        default_view: {
            type: String,
            enum: ["grid", "list"]
        }
    },
    api_keys: {
        discogs_token: {
            type: String,
        },
        google_books_api: {
            type: String,
        },
        tmdb_api: {
            type: String,
        }
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("User", userSchema)