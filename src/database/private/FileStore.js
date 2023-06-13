const express = require('express');
const router = express.Router();
const database = require('../../config/FirebaseConfig');
const validate = require('../../Helper/error');



// New File store
router.post('/private/website/files', async function (req, res) {

  try{    
    const {file, location} = req.body;
    if(!validate(file)){
      return res
        .status(404)
        .send({data:"", error : "Enter valid file data"})
    }
    if (!validate(location)) {
      return res
        .status(404)
        .send({ data: "", error: "Enter valid file location" });
    }
    const databaseRef = database.ref('private/website/files');
    const messageKey = await databaseRef.push().key;
    await databaseRef.child(messageKey).set({file,location})
    res.send(messageKey);
  }
  catch(e) {
    res.status(400).send({data : "", error : e.message});
  }

})


//Get File link 
router.post('/private/website/files/view', async function (req, res) {

  try{    
    const {messageId} = req.body;
    if (!validate(messageId)) {
      return res
        .status(404)
        .send({ data: "", error: "Enter valid messageId" });
    }
    const databaseRef = database.ref('private/website/files');
    const data = await databaseRef
      .child(messageId)
      .once("value", async (datasnapshot) => {
        if (datasnapshot.exists()) {
          return  datasnapshot;
        }
        return res.status(404).send({ error: "No data found" });
      });
    res.send(data.val().file);
  }
  catch(e) {
    res.status(400).send({data : "", error : e.message});
  }

})



module.exports = router;