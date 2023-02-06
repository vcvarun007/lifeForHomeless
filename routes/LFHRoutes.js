const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//MongoDB Connection
const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://vcvarun007:vcvarun007@cluster0.zfxgxdf.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

//create collection
const createColllection = (collectionName) => {
  client.connect((err, db) => {
    projectCollection = client.db().collection(collectionName);
    if (!err) {
      console.log("MongoDB Connected");
    } else {
      console.log("DB Error: ", err);
      process.exit(1);
    }
  });
};

//insert project
const insertProjects = (project, callback) => {
  projectCollection.insert(project, callback);
};

//post project
app.post("/api/projects", (req, res) => {
  console.log("New Project added", req.body);
  var newProject = req.body;
  insertProjects(newProject, (err, result) => {
    if (err) {
      res.json({ statusCode: 400, message: err });
    } else {
      res.json({
        statusCode: 200,
        message: "Project Successfully added",
        data: result,
      });
    }
  });
});

// get project
const getProjects = (callback) => {
  projectCollection.find({}).toArray(callback);
};

app.get("/api/projects", (req, res) => {
  getProjects((err, result) => {
    if (err) {
      res.json({ statusCode: 400, message: err });
    } else {
      res.json({ statusCode: 200, message: "Success", data: result });
    }
  });
});

app.get("/", (req, res) => {
  res.render("../public/index.html");
});

// <---------- server response test ---------->

app.get("/test", (req, res) => {
  var number1 = req.query.number1;
  var number2 = req.query.number2;
  var result = addNumbers(number1, number2);
  res.json({ statusCode: 200, data: result, message: "Success" });
});

const addNumbers = (number1, number2) => {
  var num1 = parseInt(number1);
  var num2 = parseInt(number2);
  var result = num1 + num2;
  return result;
};
// <---------- server response test ---------->

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  createColllection("createHPProfile");
});
