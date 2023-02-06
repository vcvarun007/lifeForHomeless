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
  // "mongodb+srv://vcvarun007:vcvarun007@cluster0.zfxgxdf.mongodb.net/?retryWrites=true&w=majority";
  "mongodb+srv://vcvarun007:vcvarun007@cluster0.zfxgxdf.mongodb.net/LFH/createHPProfile";
const client = new MongoClient(uri, { useNewUrlParser: true });

const uri2 =
  "mongodb+srv://vcvarun007:vcvarun007@cluster0.zfxgxdf.mongodb.net/LFH/updateFood";
const client2 = new MongoClient(uri, { useNewUrlParser: true });

const uri3 =
  "mongodb+srv://vcvarun007:vcvarun007@cluster0.zfxgxdf.mongodb.net/signUp";
const client3 = new MongoClient(uri, { useNewUrlParser: true });

//create collection
const createColllection = (collectionName) => {
  client.connect((err, db) => {
    projectCollection = client.db().collection(collectionName);
    if (!err) {
      console.log("MongoDB Connected to client 1");
    } else {
      console.log("DB Error: ", err);
      process.exit(1);
    }
  });
};

// const createColllection2 = (collectionName) => {
//   client2.connect((err, db) => {
//     projectCollection = client.db().collection(collectionName);
//     if (!err) {
//       console.log("MongoDB Connected to client 1");
//     } else {
//       console.log("DB Error: ", err);
//       process.exit(1);
//     }
//   });
// };

// const createColllection3 = (collectionName) => {
//   client3.connect((err, db) => {
//     projectCollection = client.db().collection(collectionName);
//     if (!err) {
//       console.log("MongoDB Connected");
//     } else {
//       console.log("DB Error: ", err);
//       process.exit(1);
//     }
//   });
// };

//insert project
const insertProjects = (project, callback) => {
  projectCollection.insert(project, callback);
};

// //post project
// app.post("/api/projects", (req, res) => {
//   console.log("New Project added", req.body);
//   var newProject = req.body;
//   insertProjects(newProject, (err, result) => {
//     if (err) {
//       res.json({ statusCode: 400, message: err });
//     } else {
//       res.json({
//         statusCode: 200,
//         message: "Project Successfully added",
//         data: result,
//       });
//     }
//   });
// });

// get project
const getProjects = (callback) => {
  projectCollection.find({}).toArray(callback);
};

//Create HP Profile
app.post("/views/CreateHPProfile.html", (req, res) => {
  console.log("Added new Homeless person", req.body);
  // var newProject = req.body;
  // insertProjects(newProject, (err, result) => {
  //   if (err) {
  //     res.json({ statusCode: 400, message: err });
  //   } else {
  //     res.json({
  //       statusCode: 200,
  //       message: "Project Successfully added",
  //       data: result,
  //     });
  //   }
  // });

  // let fname = req.body.fname;
  // let lname = req.body.lname;
  // let age = req.body.age;
  var newProject = req.body;
  insertProjects(newProject, (err, result) => {
    if (err) {
      res.json({ statusCode: 400, message: err });
    } else {
      // res.json({
      //   statusCode: 200,
      //   message: "Project Successfully added",
      //   data: result,
      // });
      console.log(
        'statusCode: 200, message: "Profile Successfully created",',
        "data:",
        result
      );
      res.redirect("../views/CreateHPProfile.html");
    }
  });
});

app.post("/views/CreateHPProfile.html", (req, res) => {
  console.log("Added new Homeless person", req.body);
  // var newProject = req.body;
  // insertProjects(newProject, (err, result) => {
  //   if (err) {
  //     res.json({ statusCode: 400, message: err });
  //   } else {
  //     res.json({
  //       statusCode: 200,
  //       message: "Project Successfully added",
  //       data: result,
  //     });
  //   }
  // });

  // let fname = req.body.fname;
  // let lname = req.body.lname;
  // let age = req.body.age;
  var newProject = req.body;
  insertProjects(newProject, (err, result) => {
    if (err) {
      res.json({ statusCode: 400, message: err });
    } else {
      // res.json({
      //   statusCode: 200,
      //   message: "Project Successfully added",
      //   data: result,
      // });
      console.log(
        'statusCode: 200, message: "Profile Successfully created",',
        "data:",
        result
      );
      res.redirect("../views/CreateHPProfile.html");
    }
  });
});

// app.get("/api/projects", (req, res) => {
//   getProjects((err, result) => {
//     if (err) {
//       res.json({ statusCode: 400, message: err });
//     } else {
//       res.json({ statusCode: 200, message: "Success", data: result });
//     }
//   });
// });

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
  createColllection("updateFood");
  createColllection("singUp");
});
