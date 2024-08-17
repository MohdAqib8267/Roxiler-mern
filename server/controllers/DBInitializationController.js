import dotenv from "dotenv";
import { db } from "../config/prismaConfig.js";
import axios from "axios";
dotenv.config();

export const DBInitialization = async (req, res) => {
    const DataSourceUri = process.env.DATA_SOURCE_URI;
   

    try {
        // First check if the database already has data
        const transactionCount = await db.transactions.count();
        // console.log(transactionCount);
        if (transactionCount > 0) {
            return res.status(200).json({ message: 'Database is already initialized.' });
        }

        const response = await axios.get(DataSourceUri);
        const transactions = response.data;  

        
        await db.transactions.createMany({
            data: transactions.map(transaction => ({ 
                title: transaction.title,
                price: transaction.price,
                description: transaction.description,
                category: transaction.category,
                image: transaction.image,
                sold: transaction.sold,
                dateOfSale: new Date(transaction.dateOfSale),
            })),
        });

        return res.status(200).json({ message: 'Database initialized with seed data.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

