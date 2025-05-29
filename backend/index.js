// backend/index.js
const  express = require("express");
const  dotenv = require("dotenv");
const  helmet = require("helmet");
const  morgan = require("morgan");
const  mongoose = require("mongoose");
const  cookieParser = require("cookie-parser");
const  cors = require("cors");
 
const  userRoute = require("./routes/users.js");
const  authRoute = require("./routes/auth.js");
const  entryRoute = require("./routes/entries.js");
const  routineRoute = require("./routes/routines.js");
const  mealRoute = require("./routes/meals.js");
const  { errorHandler } = require('./utils/error.js');

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGO;

const connect = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            dbName: "workout", 
        });
        console.log("Connected to mongoDB.");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); 
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
});
 
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(morgan("common"));

app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true,
    exposedHeaders: ['set-cookie'] 
}));
 
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/entries", entryRoute);
app.use("/api/routines", routineRoute);
app.use("/api/meals", mealRoute);
 
app.get('/', (req, res) => { res.send('Planner Backend API is running!'); });
 
app.use(errorHandler); 
 
connect().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`); 
    });
});
