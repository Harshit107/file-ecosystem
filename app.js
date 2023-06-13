const express = require("express");
const app = express();
const router = express.Router();

app.use(express.json())
app.use(router);
const port = 3000;
const FreelyEmail = require("./src/database/FreelyEmail");
const FileStore = require("./src/database/private/FileStore");




app.get("/", (req, res) => {
  res.send("Server is upto date");
});

app.use(FreelyEmail);
app.use(FileStore);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
