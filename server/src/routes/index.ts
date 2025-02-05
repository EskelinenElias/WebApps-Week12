import { Router } from "express";
import bookRoutes from './bookRoutes';

// Create router
const router = Router();

// Add routes
router.use("/api", bookRoutes);

export default router;