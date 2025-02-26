const express = require('express');
const mongoose = require('mongoose');
const MenuItem = require('./schema');
const dotenv = require("dotenv"); 
const app = express();
dotenv.config()
app.use(express.json());

mongoose.connect(process.env.mongo_url)
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((error) => console.error('Error connecting to MongoDB Atlas:', error));


app.get("/",(req,res)=>{
  res.send("hello")
})

app.post('/menu', async (req, res) => {
  try {
    const newMenuItem = new MenuItem(req.body);
    console.log(newMenuItem)
    const savedMenuItem = await newMenuItem.save();
    res.status(201).json({ message: 'Menu item created successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error creating menu item', error: error.message });
  }
});

app.get('/menu', async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json({message:"data retrieved",data:menuItems});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching menu items', error: error.message });
  }
});

const PORT = process.env.port 
app.listen(PORT, () => console.log(`Server running on port http://localhost:${process.env.port}`));






