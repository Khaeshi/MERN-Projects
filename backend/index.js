import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './users.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));

// API Routes
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Server is ready' })
})

app.get("/api/users", (req, res) => {
  res.send(users)
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));