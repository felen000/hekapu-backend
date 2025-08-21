import {fileURLToPath} from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.join(path.dirname(__filename), '../') //root directory
export const PUBLIC_DIRECTORY = path.join(__dirname, '../', '/public');
export const POST_PICTURE_DIRECTORY = path.join(PUBLIC_DIRECTORY, '/posts');
export const PROFILE_PICTURE_DIRECTORY = path.join(PUBLIC_DIRECTORY, '/users');
export const REFRESH_COOKIE_OPTIONS = {maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true};

