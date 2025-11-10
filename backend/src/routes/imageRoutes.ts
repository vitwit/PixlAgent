import { Router } from 'express';
import { generateAndMintNFT } from '../controllers/imageController';

const router = Router();
router.post('/mint-nft', generateAndMintNFT);

export default router;
