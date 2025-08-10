import { Router } from 'express';
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.get('/')
router.get('/:userId/profile')
router.get('/:userId/posts' )
router.put('/',authMiddleware)
router.delete('/', authMiddleware)
