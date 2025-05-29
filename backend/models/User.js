// backend/models/User.js
const mongoose =  require("mongoose"); 

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            minlength: 3,
            maxlength: 30,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            maxlength: 50,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        routines: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Routine",
            },
        ],
        entries: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Entry",
            },
        ],
        meals: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Meal", 
            },
        ],
    },
    {
        timestamps: true, 
    }
);


const User =  mongoose.model("User", UserSchema);
module.exports = User;