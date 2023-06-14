const express = require("express");
const router = express.Router();
const database = require("../../config/FirebaseConfig");
const validate = require("../../Helper/error");

// New File store
router.post("/private/website/files", async function (req, res) {
  try {
    const { file, location } = req.body;
    if (!validate(file)) {
      return res.status(404).send({ data: "", error: "Enter valid file data" });
    }
    if (!validate(location)) {
      return res
        .status(404)
        .send({ data: "", error: "Enter valid file location" });
    }
    const databaseRef = database.ref("private/website/files");
    const messageKey = await databaseRef.push().key;
    await databaseRef.child(messageKey).set({ file, location });
    res.send(messageKey);
  } catch (e) {
    res.status(400).send({ data: "", error: e.message });
  }
});

//Get File link
router.post("/private/website/files/view", async function (req, res) {
  try {
    const { messageId } = req.body;
    if (!validate(messageId)) {
      return res.status(404).send({ data: "", error: "Enter valid messageId" });
    }
    const databaseRef = database.ref("private/website/files");
    const data = await databaseRef.child(messageId).once("value");

    if (data.exists()) 
      return res.send(data.val().file);
    else 
      return res.status(400).send("<h1>No data found</h1>");
    
  } catch (e) {
    res.status(400).send({ data: "", error: e.message });
  }
});

//redirect File link
router.get("/private/website/files/view/:id", async function (req, res) {
  try {
    const messageId = req.params.id;
    if (!validate(messageId)) {
      return res.status(404).send("<h1>Something went wrong</h1>");
    }

    const databaseRef = database.ref("private/website/files");
    const data = await databaseRef.child(messageId).once("value");

    if (data.exists()) {
      return res.redirect(data.val().file);
    } else {
      return res.status(400).send("<h1>No data found</h1>");
    }
  } catch (e) {
    return res
      .status(400)
      .send("<h1>Something went wrong! Please try again after some time</h1>");
  }
});

module.exports = router;
