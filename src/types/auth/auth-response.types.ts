import UserDto from "../../dtos/user/user.dto.js";

export interface AuthResult {
    accessToken: string,
    user: UserDto
}