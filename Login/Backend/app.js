// In your server.js or app.js
import express from 'express';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());

// MongoDB connection
const DBURI = 'mongodb+srv://zainab:Zainabtalha@cluster0.f2iiu.mongodb.net/';
mongoose.connect(DBURI, { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

app.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.json({ message: "Account created successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error creating account" });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
