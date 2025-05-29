// backend/models/Entry.js
const mongoose =  require("mongoose"); 

const EntrySchema = new mongoose.Schema(
    {
        date: {
            type: Date,
            required: true,
            default: Date.now,
        },
        routines: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Routine",
            },
        ],
        meals: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Meal", 
            },
        ],
        author: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", 
            required: true,
        }, 
    },
    { timestamps: true } 
);

const Entry = mongoose.model("Entry", EntrySchema); 
module.exports = Entry;