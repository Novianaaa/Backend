import express from "express";
import { 
    getNilai,
    getNilaiById,
    createNilai,
    updateNilai,
    deleteNilai,
} from "../controllers/Nilai.js";
import { verifyUser, adminOnly} from "../middleware/DbUser.js";

const router = express.Router();

router.get('/nilai', verifyUser, adminOnly, getNilai);
router.get('/nilai/:id', verifyUser, adminOnly, getNilaiById);
router.post('/nilai', verifyUser, adminOnly, createNilai);
router.patch('/nilai/:id', verifyUser, adminOnly, updateNilai);
router.delete('/nilai/:id', verifyUser, adminOnly, deleteNilai);

export default router;