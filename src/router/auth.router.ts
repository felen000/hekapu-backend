import {Router} from 'express';
import authController from "../controllers/auth.controller.js";
import {body, oneOf} from "express-validator";

const router = Router();

router.post('/registration',
    oneOf(
        [
            [
                body('email', 'Неверный формат электронной почты.').isEmail(),
                body('password', 'Пароль должен иметь не менее 4 и не более 6 символов.').isLength({min: 4, max: 6})
            ]
        ],
        {errorType: 'flat'}),
    authController.register);
router.post('/login',
    oneOf(
        [
            [
                body('email', 'Неверный формат электронной почты.').isEmail(),
                body('password', 'Пароль должен иметь не менее 4 и не более 6 символов.').isLength({min: 4, max: 6})
            ]
        ],
        {errorType: 'flat'}),
    authController.login);
router.post('/logout', authController.logout);
router.get('/refresh', authController.refresh);
router.get('/activate/:link', authController.activate);

export default router;