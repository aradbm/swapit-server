import * as admin from "firebase-admin";
const serviceAccount = require("../../service-account.json");

const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default firebaseAdmin;