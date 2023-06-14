import express from "express";
import { 
    getSantri, 
    getSantriById, 
    createSantri, 
    updateSantri,
    deleteSantri
} from "../controllers/Santri.js";
import { verifyUser, adminOnly } from "../middleware/DbUser.js";

const router = express.Router();

router.get('/santri',verifyUser, adminOnly, getSantri);
router.get('/santri/:id',verifyUser, getSantriById);
router.post('/santri',verifyUser, createSantri);
router.patch('/santri/:id',verifyUser, updateSantri);
router.delete('/santri/:id',verifyUser,adminOnly, deleteSantri);

export default router;