import express from 'express';
import mongoose from 'mongoose';

import SaleMessage from '../models/salesMessage.js';

const router = express.Router();

export const getSales = async (req, res) => {
    const { page } = req.query;
    
    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    
        const total = await SaleMessage.countDocuments({});
        const sales = await SaleMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.json({ data: sales, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getSalesBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        const title = new RegExp(searchQuery, "i");

        const sales = await SaleMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});

        res.json({ data: sales });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getSalesByCreator = async (req, res) => {
    const { name } = req.query;

    try {
        const sales = await SaleMessage.find({ name });

        res.json({ data: sales });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getSale = async (req, res) => { 
    const { id } = req.params;

    try {
        const sale = await SaleMessage.findById(id);
        
        res.status(200).json(sale);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createSale = async (req, res) => {
    const sale = req.body;

    const newSaleMessage = new SaleMessage({ ...sale, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newSaleMessage.save();

        res.status(201).json(newSaleMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateSale = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No sale with id: ${id}`);

    const updatedSale = { creator, title, message, tags, selectedFile, _id: id };

    await SaleMessage.findByIdAndUpdate(id, updatedSale, { new: true });

    res.json(updatedSale);
}

export const deleteSale = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No sale with id: ${id}`);

    await SaleMessage.findByIdAndRemove(id);

    res.json({ message: "Sale deleted successfully." });
}

export const likeSale = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
      }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No sale with id: ${id}`);
    
    const sale = await SaleMessage.findById(id);

    const updatedSale = await SaleMessage.findByIdAndUpdate(id, sale, { new: true });

    res.status(200).json(updatedSale);
}

export const commentSale = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const sale = await SaleMessage.findById(id);

    sale.comments.push(value);

    const updatedSale = await SaleMessage.findByIdAndUpdate(id, sale, { new: true });

    res.json(updatedSale);
};

export default router;