import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
async function connectToDatabase() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/todolistDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

// Define a schema for items
const todaySchema = new mongoose.Schema({
  name: String,
});

const workSchema = new mongoose.Schema({
  name: String,
});

// Create a model for items
const ItemToday = mongoose.model("ItemToday", todaySchema);
const ItemWork = mongoose.model("ItemWork", workSchema);

// Routes

// Home route
app.get("/", async (req, res) => {
  try {
    const items = await ItemToday.find();
    res.render("today.ejs", { newTask: items });
  } catch (error) {
    console.error("Error retrieving items:", error);
    res.render("today.ejs", { newTask: [] });
  }
});

// Work route
app.get("/work", async (req, res) => {
  try {
    const items = await ItemWork.find();
    res.render("work.ejs", { newTask: items });
  } catch (error) {
    console.error("Error retrieving items:", error);
    res.render("work.ejs", { newTask: [] });
  }
});

// Add task
app.post("/", async (req, res) => {
  const newTask = req.body.newItem;

  try {
    const item = new ItemToday({
      name: newTask,
    });

    await item.save();
    res.redirect("/");
  } catch (error) {
    console.error("Error creating item:", error);
    res.redirect("/");
  }
});

app.post("/work", async (req, res) => {
  const newTask = req.body.newItem;

  try {
    const itemWork = new ItemWork({
      name: newTask,
    });

    await itemWork.save();
    res.redirect("/work");
  } catch (error) {
    console.error("Error creating item:", error);
    res.redirect("/work");
  }
});

// Delete task
app.post("/delete", async (req, res) => {
  const itemIdToday = req.body.checkboxtoday;
  const itemIdWork = req.body.checkboxwork;

  try {
    if (itemIdToday) {
      await ItemToday.deleteOne({ _id: itemIdToday });
      res.redirect("/");
    } else {
      await ItemWork.deleteOne({ _id: itemIdWork });
      res.redirect("/work");
    }
  } catch (error) {
    console.error("Error deleting item:", error);
    res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

connectToDatabase();
