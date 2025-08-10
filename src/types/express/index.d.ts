import fileUpload from "express-fileupload";
import UserDto from "../../dtos/user/user.dto.js";

declare global {
    namespace Express {
        interface Request {
            files: fileUpload.FileArray | { image: uploadedFile },
            user: UserDto
        }
    }
}