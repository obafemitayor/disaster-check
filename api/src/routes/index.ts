import { Router } from 'express';
import { DisastersController } from '../controllers/disasters.controller';

const router = Router();
router.get('/natural-disasters', DisastersController.getNearbyNaturalDisasters);

export default router;
