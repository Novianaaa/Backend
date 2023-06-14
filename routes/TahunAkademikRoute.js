import express from "express";
import { 
    getTahunAkademik,
    getTahunAkademikById,
    createTahunAkademik,
    updateTahunAkademik,
    deleteTahunAkademik,
} from "../controllers/TahunAkademik.js";
import { verifyUser, adminOnly} from "../middleware/DbUser.js";

const router = express.Router();

router.get('/tahunakademik', verifyUser, adminOnly, getTahunAkademik);
router.get('/tahunakademik/:id', verifyUser, adminOnly, getTahunAkademikById);
router.post('/tahunakademik', verifyUser, adminOnly, createTahunAkademik);
router.patch('/tahunakademik/:id', verifyUser, adminOnly, updateTahunAkademik);
router.delete('/tahunakademik/:id', verifyUser, adminOnly, deleteTahunAkademik);

export default router;