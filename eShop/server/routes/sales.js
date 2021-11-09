import express from 'express';

import { getSales, getSalesBySearch, getSalesByCreator, getSale, createSale, updateSale, deleteSale } from '../controllers/sales.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/creator', getSalesByCreator);
router.get('/search', getSalesBySearch);
router.get('/sales', getSales);
router.get('/:id', getSale);

router.post('/sales', auth,  createSale);
router.patch('/:id', auth, updateSale);
router.delete('/:id', auth, deleteSale);

export default router;