import { UserException } from "../../exepctions/user.exception";
import { CalculateAge } from "../../functions/Date";
import { UserInterface } from "../../interfaces/user.interface";
export class User {
    private user;
    constructor (firebase: any) {
        this.user = firebase.ref('user/');
    }

    public Login (email:string, password: string) {

    }

    public AddUser(data:UserInterface) {
        // Add user to database
        if (String(data.age) === undefined || data.age === null) {
            throw new UserException('Age is missing');
        } else if (isNaN(data.age.getTime())) {
            // invalid age
            throw new UserException('Age with invalid date');
        } else if (CalculateAge(data.age) < 18 && CalculateAge(data.age) > 80) {
            // validate age
            throw new UserException('Age must be > 18 and < 80');
        } else {
            this.user.push({
                first_name: data.first_name,
                last_name: data.last_name,
                role: data.role,
                age: data.age.toDateString(),
                password: data.password,
                email: data.email,
                
            })
        }
    }
}