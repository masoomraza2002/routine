// backend/models/Routine.js
const mongoose =  require("mongoose"); 

const RoutineSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
        },
        workout_type: {
            type: String,
            required: true,
            enum: ['Cardio', 'Strength', 'Flexibility', 'Balance', 'HIIT', 'Other'], 
            default: 'Other',
        },
        body_part: {
            type: String,
            required: true,
            enum: ['Full Body', 'Upper Body', 'Lower Body', 'Core', 'Arms', 'Legs', 'Back', 'Chest', 'Shoulders', 'Other'], // Example body parts
            default: 'Other',
        },
        link: {
            type: String,
            trim: true,
            default: "",
        }, 
    },
    {
        timestamps: true, 
    }
);

const Routine =  mongoose.model("Routine", RoutineSchema); 
module.exports = Routine;