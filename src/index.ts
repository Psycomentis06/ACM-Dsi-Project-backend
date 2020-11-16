import express = require('express');
import { User } from './classes/firebase/User'
import { Response, Request } from 'express';
import * as admin from 'firebase-admin';
// Create a new express application instance
const app: express.Application = express();
// Read body data (POST)
app.use(express.json());
app.use(express.urlencoded({extended: true})); // instead of use bodyparser
// initilize firebase 
let serviceAccount = require("C:/Users/User/Downloads/quinquerie-d5842-firebase-adminsdk-5hnn0-cdd9e27361.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://quinquerie-d5842.firebaseio.com"
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.get('/test/user', (req, res) => {
  res.sendFile(__dirname+'/includes/user.html');
})
app.get('/test/users', (req, res) => {
  res.sendFile(__dirname+'/includes/users.html');
})
app.post('/api/user', (req:Request, res: Response) => {
  
  try {
    let name:string = String(req.body.first_name);
    let last_name:string = String(req.body.last_name);
    let age:Date = new Date(String(req.body.age));
    let email:string = String(req.body.email);
    let password:string = String(req.body.password);

    
    let user = new User(admin.database());
    user.AddUser({
      id: 0,
      first_name: name,
      last_name: last_name,
      age: age,
      role: 'ROLE_USER',
      email: email,
      password: password
    })
    res.status(200).json({valid: true, message: "Data saved"})
  } catch (err) {
    if (err.name == 'UserError') {
      res.status(300).json({valid: false, message: err.message});
    } else {
      res.status(500);
    }
  }
});

app.listen(3000, function () {
  console.log('Server running on http://localhost:3000');
});