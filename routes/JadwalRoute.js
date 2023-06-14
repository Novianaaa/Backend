import express from "express";
import { 
    getJadwal,
    getJadwalById,
    createJadwal,
    updateJadwal,
    deleteJadwal,
} from "../controllers/Jadwal.js";
import { verifyUser, adminOnly} from "../middleware/DbUser.js";

const router = express.Router();

router.get('/jadwal', verifyUser, adminOnly, getJadwal);
router.get('/jadwal/:id', verifyUser, adminOnly, getJadwalById);
router.post('/jadwal', verifyUser, adminOnly, createJadwal);
router.patch('/jadwal/:id', verifyUser, adminOnly, updateJadwal);
router.delete('/jadwal/:id', verifyUser, adminOnly, deleteJadwal);

export default router;