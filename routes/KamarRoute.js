import express from "express";
import { 
    getKamar,
    getKamarById,
    createKamar,
    updateKamar,
    deleteKamar,
} from "../controllers/Kamar.js";
import { verifyUser, adminOnly} from "../middleware/DbUser.js";

const router = express.Router();

router.get('/kamar', getKamar);
router.get('/kamar/:id', getKamarById);
router.post('/kamar', createKamar);
router.patch('/kamar/:id', verifyUser, adminOnly, updateKamar);
router.delete('/kamar/:id', verifyUser, adminOnly, deleteKamar);

export default router;