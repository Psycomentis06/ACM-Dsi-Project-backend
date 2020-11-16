"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var user_exception_1 = require("../exepctions/user.exception");
var Date_1 = require("../functions/Date");
var User = /** @class */ (function () {
    function User(firebase) {
        this.user = firebase.ref('user/');
    }
    User.prototype.Login = function (email, password) {
    };
    User.prototype.AddUser = function (data) {
        // Add user to database
        if (String(data.age) === undefined || data.age === null) {
            throw new user_exception_1.UserException('Age is missing');
        }
        else if (isNaN(data.age.getTime())) {
            // invalid age
            throw new user_exception_1.UserException('Age with invalid date');
        }
        else if (Date_1.CalculateAge(data.age) < 18 && Date_1.CalculateAge(data.age) > 80) {
            // validate age
            throw new user_exception_1.UserException('Age must be > 18 and < 80');
        }
        else {
            return true;
        }
    };
    return User;
}());
exports.User = User;
