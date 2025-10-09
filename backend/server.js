import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import roomsRoute from './routes/rooms.js';
import usersRoute from './routes/users.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
//middleware to parse JSON requests
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Connected to backend');
});

//Connect to MongoDB
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // Connect to the MongoDB database
    console.log("Connected to MongoDB");
  } catch (error) {
    throw error; // Throw an error if the connection fails
  }
};

//Event listener for MongoDB disconnection
mongoose.connection.on('disconnected', () => {
    console.log('MongoDB has been disconnected');
});

app.use(cors()); //Enable cross-origin resource sharing
app.use(cookieParser()); //Parse cookies from incoming requests

//Route Setup
app.use('/api/admin', adminRoutes);
//app.use('/api/auth', authRoute); //Authentication
//app.use('/api/users', usersRoute); //User management
//app.use('/api/rooms', roomsRoute); //Room management
//app.use('/api/hotels', hotelsRoute); //Hotel management

//Error handling middleware
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || 'Something went wrong';
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack, //stack trace for debugging purposes
    });
});

//start server and connect to database
app.listen(8800, () => {
    connect(); //establish MongoDB connection
    console.log('Connected to backend'); //server confirmation
});

//simple test route
app.get('/', (req, res) => {
    res.send('Hello, World!');
})