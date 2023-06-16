import express from "express";
import { 
    getPelajaran,
    getDataPelajaran,
    createDataPelajaran,
    getPelajaranById,
    createPelajaran,
    updatePelajaran,
    deletePelajaran,
} from "../controllers/Pelajaran.js";
import { verifyUser, adminOnly} from "../middleware/DbUser.js";

const router = express.Router();

router.get('/pelajaran', verifyUser, adminOnly, getPelajaran);
router.get('/datapelajaran', verifyUser, adminOnly, getDataPelajaran);
// router.post('/datapelajaran', verifyUser, adminOnly, getDataPelajaran);
router.post('/dataPelajaran', verifyUser, adminOnly, createDataPelajaran);
router.get('/pelajaran/:id', verifyUser, adminOnly, getPelajaranById);
router.post('/pelajaran', verifyUser, adminOnly, createPelajaran);
router.patch('/pelajaran/:id', verifyUser, adminOnly, updatePelajaran);
router.delete('/pelajaran/:id', verifyUser, adminOnly, deletePelajaran);

export default router;