const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("../public/index.html");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
