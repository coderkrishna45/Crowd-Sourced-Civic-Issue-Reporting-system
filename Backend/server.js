// 1. Import Packages
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

// 2. Setup Express App
const app = express();
const port = 3000;

// 3. Configure Middleware
app.use(cors());
app.use(express.json());

// --- DATABASE CONNECTION ---
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI)
  .then(() => console.log('Successfully connected to MongoDB Atlas!'))
  .catch(error => console.error('Error connecting to MongoDB:', error));

// --- MONGOOSE SCHEMA & MODEL ---
const issueSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  category: String,
  title: String,
  description: String,
  status: { type: String, default: 'Reported' },
  date: { type: Date, default: Date.now }
});

const Issue = mongoose.model('Issue', issueSchema);

// --- API ROUTES (ALL UPGRADED FOR MONGODB) ---

// GET all issues
app.get('/api/issues', async (req, res) => {
  try {
    const allIssues = await Issue.find({status:{$ne:'Deleted'}});
    res.json(allIssues);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

app.get('/api/issues/deleted',async(req,res)=>{
  try{
    const deletedIssue = await Issue.find({status:'Deleted'});
    res.json(deletedIssue);
  }catch(error){
    res.status(500).send('Server error');
  }
});

// CREATE a new issue
app.post('/api/issues', async (req, res) => {
  try {
    const newIssue = await Issue.create(req.body);
    console.log('New issue saved to DB:', newIssue);
    res.status(201).json(newIssue);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// UPDATE an issue's status
app.patch('/api/issues/:id', async (req, res) => {
  try {
    const updatedIssue = await Issue.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!updatedIssue) return res.status(404).send('Issue not found');
    console.log("Issue updated:", updatedIssue);
    res.json(updatedIssue);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// DELETE an issue
app.delete('/api/issues/:id', async (req, res) => {
  try {
    const deletedIssue = await Issue.findByIdAndUpdate(req.params.id , 
      {status:'Deleted',
        new : true
      }
    );
    if (!deletedIssue) return res.status(404).send('Issue not found');
    console.log(`Issue with ID ${req.params.id} has been deleted.`);
    res.json(deletedIssue);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Start the Server
app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});