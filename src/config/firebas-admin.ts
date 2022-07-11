import admin from 'firebase-admin'

const serviceAccount = require("M");

const firebaseAdmin = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  export default firebaseAdmin