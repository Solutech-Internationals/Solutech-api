import express from 'express';

const router = express.Router();

import {
    createLaptop,
    readLaptop,
    readLaptops,
    updateLaptop,
    deleteLaptop,
    saveLaptops,
    getLaptopsByCategories, deleteAllLaptops, searchLaptops
} from '../controller/laptopController.ts';

router.post('/laptop', createLaptop);
router.post('/saveLaptops', saveLaptops);
router.get('/laptops', readLaptops);
router.get('/laptop/:id', readLaptop);
router.put('/laptop/:id', updateLaptop);
router.delete('/laptop/:id', deleteLaptop);
router.get('/laptops', getLaptopsByCategories);
router.delete('/laptops', deleteAllLaptops);
router.get('/laptopsSearch', searchLaptops);

export default router;