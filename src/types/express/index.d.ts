import fileUpload from "express-fileupload";

declare global {
    namespace Express {
        interface Request {
            files: fileUpload.FileArray | { image: uploadedFile },
            user: { id: number }
        }
    }
}