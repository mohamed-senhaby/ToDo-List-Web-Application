import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

let todayTask = "";
let workTask = "";

app.get("/", (req, res) => {
  res.render("today.ejs");
});

app.get("/work", (req, res) => {
  res.render("work.ejs");
});

app.post("/", (req, res) => {
  const newTask = req.body.newItem;
  todayTask = todayTask ? todayTask + "\n" + newTask : newTask;
  res.render("today.ejs", { newTask: todayTask.split("\n") });
});

app.post("/work", (req, res) => {
  const newTask = req.body.newItem;
  workTask = workTask ? workTask + "\n" + newTask : newTask;
  res.render("work.ejs", { newTask: workTask.split("\n") });
});

app.listen(port, () => {
  console.log(`Server is running in port ${port}`);
});
