import express from "express"
import { DBInitialization } from "../controllers/DBInitializationController.js";

const router = express.Router();

router.get('/',DBInitialization);

export {router as DBInitilializeRoute};