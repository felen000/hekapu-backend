import {User} from "../../db/models/user.model.js";
import {Post} from "../../db/models/post.model.js";

export default class UserDto {
    id: number;
    image: string;
    name: string;
    posts?: Post[]
    constructor(data: User) {
        this.id = data.id;
        this.image = data.profilePicture;
        this.name = data.name;
        if (data.posts) this.posts = data.posts;
    }
}
