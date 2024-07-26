import type {Request, Response} from 'express';
import {Car} from "../models/car.ts";


export  const createCar = async (req: Request, res: Response) => {
    try {
        const car = new Car(req.body);
        await car.save();
        res.status(201).send(car);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const saveCars = async (req: Request, res: Response) => {
    try {
        const cars = req.body;
        if (!Array.isArray(cars)) {
            return res.status(400).send({ error: 'Input must be an array of cars' });
        }
        const savedCars = await Car.insertMany(cars);
        res.status(201).send(savedCars);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const readCars = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string, 10) || 1;
        // Set a fixed limit of 30 items per page
        const limit = 32;
        const skip = (page - 1) * limit;

        // Fetch paginated laptops
        const car = await Car.find().skip(skip).limit(limit);
        const totalCara = await Car.countDocuments();

        // Calculate total pages
        const totalPages = Math.ceil(totalCara / limit);

        // Send paginated response
        res.status(200).send({car, totalPages});
    } catch (error) {
        res.status(500).send(error);
    }
};

export const readCar = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const car = await Car.findById(id);
        if (!car) {
            res.status(404).send();
            return;
        }
        res.status(200).send(car);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateCar = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const car = await Car.findByIdAndUpdate(id,
            req.body,
            {
                new: true,
                runValidators: true
            });
        if (!car) {
            res.status(404).send();
            return;
        }
        res.status(200).send(car);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const deleteCar = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const car = await Car.findByIdAndDelete(id);
        if (!car) {
            res.status(404).send();
            return;
        }
        res.status(200).send(car);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const deleteAllCars = async (req: Request, res: Response) => {
    try {
        await Car.deleteMany({});
        res.status(200).send();
    } catch (error) {
        res.status(500).send(error);
    }
}

export const searchCars = async (req: Request, res: Response) => {
    try {
        const query = req.query.query as string;
        const page = parseInt(req.query.page as string, 10) || 1;
        const limit = 32; // Fixed limit of items per page
        const skip = (page - 1) * limit;

        if (!query) {
            return res.status(400).send({ error: 'Search query parameter is required' });
        }

        // Fetch paginated search results
        const regex = new RegExp(query, 'i');
        const cars = await Car.find({ $text: { $search: query } })
            .skip(skip)
            .limit(limit);
        const totalCars = await Car.countDocuments({ $text: { $search: query } });

        // Calculate total pages
        const totalPages = Math.ceil(totalCars / limit);

        // Send paginated response
        res.status(200).send({ cars, totalPages });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send({ error: error.message });
        } else {
            res.status(500).send({ error: 'An unknown error occurred' });
        }
    }
};

