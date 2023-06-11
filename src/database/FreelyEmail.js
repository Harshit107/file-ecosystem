const db = require('../config/FirebaseConfig');
const express = require('express');
const router = new express.Router();
const freelyEmailDatabasePath = 'public/freelyemail/data';

// Fetch data from the database

router.get('/public/freelyemail/message/id/:id', async(req, res) => {
  
  const messageId = req.params.id;
  console.log(messageId)
   const ref = db.ref(freelyEmailDatabasePath).child(messageId);
  const user = await ref.once("value", (snapshot) => {
     const users = snapshot.val();
     console.log(users);
     return users;
   });
   
   res.send(user);

});

module.exports = router;