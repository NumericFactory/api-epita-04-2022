import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { routesConfig } from './routes/routes-config';

admin.initializeApp();

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: true }));
routesConfig(app)

export const api = functions.https.onRequest(app);

// import * as functions from 'firebase-functions'
// import * as admin from 'firebase-admin'
// import * as express from 'express'
// import * as bodyParser from 'body-parser'
// import { Routes } from './routes/Routes'
// import * as cors from 'cors'

// class Api { 
//   public api: express.Application
//   public app: express.Application
//   public routes: Routes 

//   constructor () {
//     this.firebaseSetup()
//     this.app = express()
//     this.api = express()
//     this.config()
//     this.routes = new Routes(this.app)
//   }

//   private config(): void {
//     this.app.use(cors())
//     this.api.use('/api/v1', this.app)
//     this.api.use(bodyParser.json())
//     this.api.use(bodyParser.urlencoded({ extended: false }))
//   }

//   private firebaseSetup (): void {
//     admin.initializeApp({ credential: admin.credential.applicationDefault() })
//     admin.firestore().settings({ timestampsInSnapshots: true })
//   }
// }
// // webApi is your functions name, and you will pass this.api as a parameter
// export const webApi = functions.https.onRequest(new Api().api)