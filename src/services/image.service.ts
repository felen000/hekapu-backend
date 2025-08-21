import sharp from "sharp";
import {POST_PICTURE_DIRECTORY, PROFILE_PICTURE_DIRECTORY} from "../constants/index.js";
import {UploadedFile} from "express-fileupload";
import {v4} from "uuid";
import path from "path";
import {ApiError} from "../exceptions/api-error.js";
import * as fs from "node:fs";

class ImageService {
    async savePostImage(image: UploadedFile): Promise<string> {
        try {
            if (!fs.existsSync(POST_PICTURE_DIRECTORY)) {
                fs.mkdirSync(POST_PICTURE_DIRECTORY, {recursive: true});
            }
            const fileName = v4() + '.jpg';
            const filePath = path.join(POST_PICTURE_DIRECTORY, fileName);
            await sharp(image.data).jpeg({quality: 70, progressive: true, chromaSubsampling: '4:4:4'}).toFile(filePath);
            return process.env.API_URL + '/public/posts/' + fileName;
        } catch (e) {
            console.log('Ошибка при обработке изображения:', e);
            throw ApiError.InternalServerError('Ошибка при обработке изображения.');
        }
    }

    async saveProfilePicture(image: UploadedFile): Promise<string> {
        try {
            if (!fs.existsSync(PROFILE_PICTURE_DIRECTORY)) {
                fs.mkdirSync(PROFILE_PICTURE_DIRECTORY, {recursive: true});
            }
            const fileName = v4() + '.jpg';
            const filePath = path.join(PROFILE_PICTURE_DIRECTORY, fileName);
            await sharp(image.data).jpeg({quality: 70, progressive: true, chromaSubsampling: '4:4:4'}).toFile(filePath);
            return process.env.API_URL + '/public/users/' + fileName;
        } catch (e) {
            console.log('Ошибка при обработке изображения:', e);
            throw ApiError.InternalServerError('Ошибка при обработке изображения.');
        }
    }
}

export default new ImageService();