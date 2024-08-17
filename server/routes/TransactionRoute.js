import express from "express"
import { combinedStatics, forBarChart, forPieChart, ListTransaction } from "../controllers/TransactionController.js";


const router = express.Router();

router.get('/list',ListTransaction);
router.get('/bar-chart',forBarChart) 
router.get('/pie-chart',forPieChart) 
router.get('/combined',combinedStatics)

export {router as TransactionRoute};