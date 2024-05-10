import express from 'express'
import 'dotenv/config';
import { Book } from "./models/bookModel.js";
import { connectDB } from './connectDB.js';
import cors from 'cors';
const app=express();
const PORT=process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
app.use(express.static('public'))

app.get("/",(req,res)=>{
  return res.status(234).send("Welcome to Mern Stack");

});

app.get("/book", async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});


app.post("/book", async (req, res) => {
  try {
    console.log(req.body);
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      res.status(400).json({
        message: "Send all required fields: title, author, publishYear",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await Book.create(newBook);
    res.status(201).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});
app.post("/book", async (req, res) => {
  try {
    console.log(req.body);
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).json({
        message: "Send all required fields: title, author, publishYear",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await Book.create(newBook);
    res.status(201).json({ message: "Book added successfully", book });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Failed to add book" });
  }
});


app.delete("/title/:title", async (req, res) => {
  try {
    const { title } = req.params;
    const result = await Book.findOneAndDelete({ title: title });
    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book Deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.get("/title/:title", async (req, res) => {
  try {
    const { title } = req.params;
    const book = await Book.findOne({ title: title });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});


const start= async()=>{
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Database Connected");
    app.listen(PORT,()=>{
      console.log(`Server Started at port ${PORT}`);
    });
    
  } 
  catch (error)
   {
    console.log(error);
    
  }
};


start();


