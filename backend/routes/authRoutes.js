import express from 'express';
import { loginAdmin, registerAdmin } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.post('/register', registerAdmin);

//Example protected route
router.get('/profile', protect, (req, res) => {
    res.json(req.admin);
});

export default router;