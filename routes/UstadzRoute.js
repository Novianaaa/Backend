import express from "express";
import { 
    getUstadz,
    getUstadzById,
    createUstadz,
    updateUstadz,
    deleteUstadz,
} from "../controllers/Ustadz.js";
import { verifyUser, adminOnly} from "../middleware/DbUser.js";

const router = express.Router();

router.get('/ustadz', verifyUser, adminOnly, getUstadz);
router.get('/ustadz/:id', verifyUser, adminOnly, getUstadzById);
router.post('/ustadz', verifyUser, adminOnly, createUstadz);
router.patch('/ustadz/:id', verifyUser, adminOnly, updateUstadz);
router.delete('/ustadz/:id', verifyUser, adminOnly, deleteUstadz);

export default router;