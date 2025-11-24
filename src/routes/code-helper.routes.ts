import { Router } from 'express';
import { codeHelperController } from '../controllers/code-helper.controller';

const router = Router();

router.post('/', codeHelperController);

export default router;
