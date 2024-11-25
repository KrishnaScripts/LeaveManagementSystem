import { Router } from 'express';
import  { signup,updateUser }  from '../controllers/authController'
import { applyLeave } from '../controllers/applyLeaveController';


const router = Router();

router.post('/signup', signup);
router.put("/updateUser", updateUser);
router.post("/applyLeave", applyLeave);

export default router;