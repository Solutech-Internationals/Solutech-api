import express from 'express';

const router = express.Router();

import {
    createLaptop,
    readLaptop,
    readLaptops,
    updateLaptop,
    deleteLaptop,
    saveLaptops,
    getLaptopsByCategories
} from '../controller/laptopController.ts';

router.post('/laptop', createLaptop);
router.post('/saveLaptops', saveLaptops);
router.get('/laptops', readLaptops);
router.get('/laptop/:id', readLaptop);
router.put('/laptop/:id', updateLaptop);
router.delete('/laptop/:id', deleteLaptop);
router.get('/laptops', getLaptopsByCategories);

export default router;