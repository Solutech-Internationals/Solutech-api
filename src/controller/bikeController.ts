import type {Request, Response} from 'express';
import {Bike} from '../models/bike';


export  const createBike = async (req: Request, res: Response) => {
    try {
        const bike = new Bike(req.body);
        await bike.save();
        res.status(201).send(bike);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const saveBikes = async (req: Request, res: Response) => {
    try {
        const bikes = req.body;
        if (!Array.isArray(bikes)) {
            return res.status(400).send({ error: 'Input must be an array of bikes' });
        }
        const savedBikes = await Bike.insertMany(bikes);
        res.status(201).send(savedBikes);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const readBikes = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string, 10) || 1;
        // Set a fixed limit of 30 items per page
        const limit = 32;
        const skip = (page - 1) * limit;

        // Fetch paginated laptops
        const bike = await Bike.find().skip(skip).limit(limit);
        const totalBikes = await Bike.countDocuments();

        // Calculate total pages
        const totalPages = Math.ceil(totalBikes / limit);

        // Send paginated response
        res.status(200).send({bike, totalPages});
    } catch (error) {
        res.status(500).send(error);
    }
};

export const readBike = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const bike = await Bike.findById(id);
        if (!bike) {
            res.status(404).send();
            return;
        }
        res.status(200).send(bike);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateBike = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const bike = await Bike.findByIdAndUpdate(id,
            req.body,
            {
                new: true,
                runValidators: true
            });
        if (!bike) {
            res.status(404).send();
            return;
        }
        res.status(200).send(bike);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const deleteBike = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const bike = await Bike.findByIdAndDelete(id);
        if (!bike) {
            res.status(404).send();
            return;
        }
        res.status(200).send(bike);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const deleteAllBikes = async (req: Request, res: Response) => {
    try {
        await Bike.deleteMany({});
        res.status(200).send();
    } catch (error) {
        res.status(500).send(error);
    }
};

export const searchBikes = async (req: Request, res: Response) => {
    try {
        const query = req.query.query as string;
        const page = parseInt(req.query.page as string, 10) || 1;
        const limit = 32; // Fixed limit of items per page
        const skip = (page - 1) * limit;

        if (!query) {
            return res.status(400).send({ error: 'Query parameter is required' });
        }

        // Fetch paginated search results
        const bikes = await Bike.find({ $text: { $search: query } })
            .skip(skip)
            .limit(limit);
        const totalBikes = await Bike.countDocuments({ $text: { $search: query } });

        // Calculate total pages
        const totalPages = Math.ceil(totalBikes / limit);

        // Send paginated response
        res.status(200).send({ bikes, totalPages });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send({ error: error.message });
        } else {
            res.status(500).send({ error: 'An unknown error occurred' });
        }
    }
};