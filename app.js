const express = require("express");
const app = express();
const router = express.Router();
app.use(router);
const port = 3000;
const FreelyEmail = require("./src/database/FreelyEmail");




app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(FreelyEmail)

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
