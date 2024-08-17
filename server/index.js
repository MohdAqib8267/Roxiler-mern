import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { DBInitilializeRoute } from "./routes/DBInitializeRoute.js";
import { TransactionRoute } from "./routes/TransactionRoute.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

//routes
app.use('/api/initialize',DBInitilializeRoute);
app.use('/api/transaction',TransactionRoute);

app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`);
})