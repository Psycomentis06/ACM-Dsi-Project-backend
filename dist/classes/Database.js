"use strict";
/**
 * Database setup
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
var Database = /** @class */ (function () {
    function Database(firebase) {
        this.firebase = firebase.database();
    }
    Database.prototype.getFirebaseConnection = function () {
        return this.firebase;
    };
    return Database;
}());
exports.Database = Database;
