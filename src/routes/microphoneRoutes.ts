import express from "express";

const router = express.Router();

import {
    createMicrophone,
    readMicrophone,
    readMicrophones,
    updateMicrophone,
    saveMicrophones,
    deleteMicrophone,
    deleteAllMicrophones, searchMicrophones
} from '../controller/microphoneController.ts';

router.post('/microphone', createMicrophone);
router.post('/saveMicrophones', saveMicrophones);
router.get('/microphones', readMicrophones);
router.get('/microphone/:id', readMicrophone);
router.put('/microphone/:id', updateMicrophone);
router.delete('/microphone/:id', deleteMicrophone);
router.delete('/microphones', deleteAllMicrophones);
router.get('/microphones', searchMicrophones);

export default router;