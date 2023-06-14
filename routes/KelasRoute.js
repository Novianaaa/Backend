import express from "express";
import { 
    getKelas,
    getKelasById,
    createKelas,
    updateKelas,
    deleteKelas,
} from "../controllers/Kelas.js";
import { verifyUser, adminOnly} from "../middleware/DbUser.js";

const router = express.Router();

router.get('/kelas', verifyUser, adminOnly, getKelas);
router.get('/kelas/:id', verifyUser, adminOnly, getKelasById);
router.post('/kelas', verifyUser, adminOnly, createKelas);
router.patch('/kelas/:id', verifyUser, adminOnly, updateKelas);
router.delete('/kelas/:id', verifyUser, adminOnly, deleteKelas);

export default router;