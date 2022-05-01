import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin';

// var config = {
//     apiKey: "apiKey",
//     authDomain: "projectId.firebaseapp.com",
//     databaseURL: "https://databaseName.firebaseio.com",
//     storageBucket: "bucket.appspot.com"
// };
// firebase.initializeApp(config);
// var database = firebase.database();

admin.initializeApp({
  credential: admin.credential.cert({
    privateKey: functions.config().private.key.replace(/\\n/g, '\n'),
    projectId: functions.config().project.id,
    clientEmail: functions.config().client.email
  }),
  databaseURL: 'https://api-project-179461704479.firebaseio.com'
})

const db = admin.firestore()
export { admin, db }