import express from 'express';

const router = express.Router();

import {
    createMobilePhone,
    readMobilePhone,
    readMobilePhones,
    updateMobilePhone,
    saveMobilePhones,
    deleteMobilePhone
} from '../controller/mobilePhoneController.ts';

router.post('/mobilePhone', createMobilePhone);
router.post('/saveMobilePhones', saveMobilePhones);
router.get('/mobilePhones', readMobilePhones);
router.get('/mobilePhone/:id', readMobilePhone);
router.put('/mobilePhone/:id', updateMobilePhone);
router.delete('/mobilePhone/:id', deleteMobilePhone);

export default router;