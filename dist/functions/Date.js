"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculateAge = void 0;
function CalculateAge(birth_date) {
    var diff_ms = Date.now() - birth_date.getTime();
    var age_dt = new Date(diff_ms);
    return Math.abs(age_dt.getUTCFullYear() - 1970);
}
exports.CalculateAge = CalculateAge;
