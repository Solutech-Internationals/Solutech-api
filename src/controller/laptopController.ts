import type {Request, Response} from 'express';
import {Laptop} from "../models/laptop.ts";


export  const createLaptop = async (req: Request, res: Response) => {
    try {
        const laptop = new Laptop(req.body);
        await laptop.save();
        res.status(201).send(laptop);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const saveLaptops = async (req: Request, res: Response) => {
    try {
        const laptops = req.body;
        if (!Array.isArray(laptops)) {
            return res.status(400).send({ error: 'Input must be an array of laptops' });
        }
        const savedLaptops = await Laptop.insertMany(laptops);
        res.status(201).send(savedLaptops);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const readLaptops = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string, 10) || 1;
        // Set a fixed limit of 32 items per page
        const limit = 32;
        const skip = (page - 1) * limit;

        // Fetch paginated laptops
        const laptops = await Laptop.find().skip(skip).limit(limit);
        const totalLaptops = await Laptop.countDocuments();

        // Calculate total pages
        const totalPages = Math.ceil(totalLaptops / limit);

        // Send paginated response
        res.status(200).send({ laptops, totalPages });
    } catch (error) {
        res.status(500).send(error);
    }
};

export const readLaptop = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const laptop = await Laptop.findById(id);
        if (!laptop) {
            res.status(404).send();
            return;
        }
        res.status(200).send(laptop);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateLaptop = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const laptop = await Laptop.findByIdAndUpdate(id,
            req.body,
            {
                new: true,
                runValidators: true
            });
        if (!laptop) {
            res.status(404).send();
        }
        res.status(200).send(laptop);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const deleteLaptop = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const laptop = await Laptop.findByIdAndDelete(id);
        if (!laptop) {
            res.status(404).send();
        }
        res.status(200).send(laptop);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getLaptopsByCategories = async (req: Request, res: Response) => {
    try {
        const categories = req.query.categories;

        if (!categories) {
            return res.status(400).send({ error: "Categories query parameter is required" });
        }

        const categoriesArray = Array.isArray(categories) ? categories : [categories];

        const query = {
            $or: categoriesArray.map(category => ({ [category]: true }))
        };

        const laptops = await Laptop.find(query);
        res.status(200).send(laptops);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const deleteAllLaptops = async (req: Request, res: Response) => {
    try {
        await Laptop.deleteMany({});
        res.status(200).send();
    } catch (error) {
        res.status(500).send(error);
    }
};

export const searchLaptops = async (req: Request, res: Response) => {
    try {
        const query = req.query.query as string;
        const page = parseInt(req.query.page as string, 10) || 1;
        const limit = 32; // Fixed limit of items per page
        const skip = (page - 1) * limit;

        if (!query) {
            return res.status(400).send({ error: 'Query parameter is required' });
        }

        const regex = new RegExp(query, 'i');
        const laptops = await Laptop.find({ title: { $regex: regex} })
            .skip(skip)
            .limit(limit);
        const totalLaptops = await Laptop.countDocuments({  title: { $regex: regex}  });

        // Calculate total pages
        const totalPages = Math.ceil(totalLaptops / limit);

        // Send paginated response
        res.status(200).send({ laptops, totalPages });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send({ error: error.message });
        } else {
            res.status(500).send({ error: 'An unknown error occurred' });
        }
    }
};
