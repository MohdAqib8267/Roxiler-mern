import express from "express"
import { combinedStatics, forBarChart, forPieChart, ListTransaction,showStats } from "../controllers/TransactionController.js";


const router = express.Router();

router.get('/list',ListTransaction);
router.get('/stats',showStats);
router.get('/bar-chart',forBarChart) 
router.get('/pie-chart',forPieChart) 
router.get('/combined',combinedStatics)

export {router as TransactionRoute}; 