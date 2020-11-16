"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var User_1 = require("./classes/firebase/User");
var admin = __importStar(require("firebase-admin"));
// Create a new express application instance
var app = express();
// Read body data (POST)
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // instead of use bodyparser
// initilize firebase 
var serviceAccount = require("C:/Users/User/Downloads/quinquerie-d5842-firebase-adminsdk-5hnn0-cdd9e27361.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://quinquerie-d5842.firebaseio.com"
});
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.get('/test/user', function (req, res) {
    res.sendFile(__dirname + '/includes/user.html');
});
app.get('/test/users', function (req, res) {
    res.sendFile(__dirname + '/includes/users.html');
});
app.post('/api/user', function (req, res) {
    try {
        var name_1 = String(req.body.first_name);
        var last_name = String(req.body.last_name);
        var age = new Date(String(req.body.age));
        var email = String(req.body.email);
        var password = String(req.body.password);
        var user = new User_1.User(admin.database());
        user.AddUser({
            id: 0,
            first_name: name_1,
            last_name: last_name,
            age: age,
            role: 'ROLE_USER',
            email: email,
            password: password
        });
        res.status(200).json({ valid: true, message: "Data saved" });
    }
    catch (err) {
        if (err.name == 'UserError') {
            res.status(300).json({ valid: false, message: err.message });
        }
        else {
            res.status(500);
        }
    }
});
app.listen(3000, function () {
    console.log('Server running on http://localhost:3000');
});
