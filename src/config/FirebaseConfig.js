const admin = require("firebase-admin");

const serviceAccount = require("./file-ecosystem-serviceaccountkey.json"); // Replace with the path to your service account key JSON file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://harshit107-file-ecosystem-default-rtdb.firebaseio.com/", // Replace with your Firebase database URL
});
const db = admin.database();

module.exports = db;
