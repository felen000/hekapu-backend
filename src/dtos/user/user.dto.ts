import {User} from "../../db/models/user.model.js";

export default class UserDto {
    email: string;
    id: number;
    isActivated: boolean;
    constructor(data: User) {
        this.id = data.id;
        this.email = data.email;
        this.isActivated = data.isActivated;
    }
}
