import dayjs from "dayjs";
import { db } from "../config/prismaConfig.js";

export const ListTransaction = async(req,res) =>{
    let {page=1,perPage=5,search='',month='3'} = req.query;
    page=Math.ceil(page);
    try {
         // Validate and normalize month input
         if (!month || isNaN(month) || month < 1 || month > 12) {
            return res.status(400).json({ error: 'Invalid month. Please provide a month between 1 and 12.' });
        }
        
        // console.log(filters);
        const allTransactions = await db.transactions.findMany({});
        const transactionWithMonth = allTransactions.filter(filter => {
            const transactionDate = filter.dateOfSale;
            return transactionDate.getMonth()+1 == month;
        })

        const searchFilteredTransactions = transactionWithMonth.filter(transaction => {
            
            const transactionTitle = (transaction.title || '').toLowerCase();
            const transactionDescription = (transaction.description || '').toLowerCase();
            const transactionPrice = (transaction.price.toString() || '').toLocaleLowerCase();
            
            return transactionTitle.includes(search.toLowerCase()) ||
                   transactionDescription.includes(search.toLowerCase()) || transactionPrice.includes(search) ;
        });
        // Apply pagination to the filtered results
        const lastIndex = page*perPage;
        // console.log(page);
        // console.log((page - 1) * perPage,Math.min(lastIndex, searchFilteredTransactions.length));
        const paginatedFilteredTransactions = searchFilteredTransactions.slice((page - 1) * perPage, Math.min(lastIndex, searchFilteredTransactions.length));
        
    
        // const total = await db.transactions.count({ where: filters });
        res.json({
            data: paginatedFilteredTransactions,
            total: transactionWithMonth.length,
            page: parseInt(page),
            perPage: parseInt(perPage),
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'server error'});
    }
}



export const forBarChart = async(req,res) =>{
        const {month} = req.query;
        
    try {
        if(!month){
            return res.json({error: 'Invalid month. Please provide a month between 1 and 12.' });
        }
        const allTransactions = await db.transactions.findMany({});
        const transactionWithMonth = allTransactions.filter(filter => {
            const transactionDate = filter.dateOfSale;
            return transactionDate.getMonth()+1 == month;
        })
        const priceRanges = {
            '0-100': 0,
            '101-200': 0,
            '201-300': 0,
            '301-400': 0,
            '401-500': 0,
            '501-600': 0,
            '601-700': 0,
            '701-800': 0,
            '801-900': 0,
            '901-above': 0
        };
        transactionWithMonth.forEach(transaction => {
            const price = transaction.price;
            if(price<=100) priceRanges['0-100']++;
            else if(price<=200) priceRanges['101-200']++;
            else if (price <= 300) priceRanges['201-300']++;
            else if (price <= 400) priceRanges['301-400']++;
            else if (price <= 500) priceRanges['401-500']++;
            else if (price <= 600) priceRanges['501-600']++;
            else if (price <= 700) priceRanges['601-700']++;
            else if (price <= 800) priceRanges['701-800']++;
            else if (price <= 900) priceRanges['801-900']++;
            else priceRanges['901-above']++;
        });
        return res.status(200).json(priceRanges);

    } catch (error) {
        console.log(error);
        res.status(500).json({error:'server error'});
    }
}

export const forPieChart = async(req,res)=>{
    const {month} = req.query;
    try {
        if(!month){
            return res.json({error: 'Invalid month. Please provide a month between 1 and 12.' });
        }
        const allTransactions = await db.transactions.findMany({});
        const transactionWithMonth = allTransactions.filter(filter => {
            const transactionDate = filter.dateOfSale;
            return transactionDate.getMonth()+1 == month;
        })
        const categoryCount={};
        transactionWithMonth.forEach((transaction) => {
            const category = transaction.category;
            if(categoryCount[category]){
                categoryCount[category]++;
            }
            else{
                categoryCount[category]=1;
            }
        });
        
        return res.status(200).json(categoryCount);


    } catch (error) {
        console.log(error);
        res.status(500).json({error:'server error'});
    }
}



export const combinedStatics = async(req,res) =>{
    const {month} = req.query;
    try {
        let saleAmount=0;
        let numberOfSoldItems=0;
        let numberOfUnSoldItems=0;
        const priceRanges = {
            '0-100': 0,
            '101-200': 0,
            '201-300': 0,
            '301-400': 0,
            '401-500': 0,
            '501-600': 0,
            '601-700': 0,
            '701-800': 0,
            '801-900': 0,
            '901-above': 0
        };
        const categoryCount={};

        const allTransactions = await db.transactions.findMany({});
        const transactionWithMonth = allTransactions.filter(filter => {
            const transactionDate = filter.dateOfSale;
            return transactionDate.getMonth()+1 == month;
        })
        transactionWithMonth.forEach(transaction => {
            const isSold = transaction.sold
            const price = transaction.price;
            const category = transaction.category;

            if(isSold){
                saleAmount += transaction.price;
                numberOfSoldItems += 1;
            }
            else{
                numberOfUnSoldItems+=1;
            }
            
            if(price<=100) priceRanges['0-100']++;
            else if(price<=200) priceRanges['101-200']++;
            else if (price <= 300) priceRanges['201-300']++;
            else if (price <= 400) priceRanges['301-400']++;
            else if (price <= 500) priceRanges['401-500']++;
            else if (price <= 600) priceRanges['501-600']++;
            else if (price <= 700) priceRanges['601-700']++;
            else if (price <= 800) priceRanges['701-800']++;
            else if (price <= 900) priceRanges['801-900']++;
            else priceRanges['901-above']++;

           
            if(categoryCount[category]){
                categoryCount[category]++;
            }
            else{
                categoryCount[category]=1;
            }


        })
        return res.status(200).json({
            statics:{
                saleAmount:saleAmount,
                numberOfSoldItems:numberOfSoldItems,
                numberOfUnSoldItems:numberOfUnSoldItems
            },
            barGraph:priceRanges,
            pieChart:categoryCount
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({error:'server error'});
    }
}