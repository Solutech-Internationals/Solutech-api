import type {Request, Response} from 'express';
import {Microphone} from "../models/microphone.ts";


export  const createMicrophone = async (req: Request, res: Response) => {
    try {
        const microphone = new Microphone(req.body);
        await microphone.save();
        res.status(201).send(microphone);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const saveMicrophones = async (req: Request, res: Response) => {
    try {
        const microphones = req.body;
        if (!Array.isArray(microphones)) {
            return res.status(400).send({ error: 'Input must be an array of microphones' });
        }
        const savedMicrophones = await Microphone.insertMany(microphones);
        res.status(201).send(savedMicrophones);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const readMicrophones = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string, 10) || 1;
        // Set a fixed limit of 32 items per page
        const limit = 32;
        const skip = (page - 1) * limit;

        // Fetch paginated laptops
        const microphones = await Microphone.find().skip(skip).limit(limit);
        const totalMicrophones = await Microphone.countDocuments();

        // Calculate total pages
        const totalPages = Math.ceil(totalMicrophones / limit);

        // Send paginated response
        res.status(200).send({ microphones, totalPages });
    } catch (error) {
        res.status(500).send(error);
    }
};

export const readMicrophone = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const microphone = await Microphone.findById(id);
        if (!microphone) {
            res.status(404).send();
            return;
        }
        res.status(200).send(microphone);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const updateMicrophone = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const microphone = await Microphone.findByIdAndUpdate(id,
            req.body,
            {
                new: true,
                runValidators: true,
            });
        if (!microphone) {
            res.status(404).send();
            return;
        }
        res.status(200).send(microphone);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const deleteMicrophone = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const microphone = await Microphone.findByIdAndDelete(id);
        if (!microphone) {
            res.status(404).send();
            return;
        }
        res.status(200).send(microphone);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const deleteAllMicrophones = async (req: Request, res: Response) => {
    try {
        await Microphone.deleteMany({});
        res.status(200).send({ message: 'All microphones have been deleted successfully.' });
    } catch (error) {
        res.status(500).send(error);
    }
};

export const searchMicrophones = async (req: Request, res: Response) => {
    try {
        const query = req.query.query as string;
        const page = parseInt(req.query.page as string, 10) || 1;
        const limit = 32; // Fixed limit of items per page
        const skip = (page - 1) * limit;

        if (!query) {
            return res.status(400).send({ error: 'Query parameter is required' });
        }

        // Fetch paginated search results
        const microphones = await Microphone.find({ $text: { $search: query } })
            .skip(skip)
            .limit(limit);
        const totalMicrophones = await Microphone.countDocuments({ $text: { $search: query } });

        // Calculate total pages
        const totalPages = Math.ceil(totalMicrophones / limit);

        // Send paginated response
        res.status(200).send({ microphones, totalPages });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send({ error: error.message });
        } else {
            res.status(500).send({ error: 'An unknown error occurred' });
        }
    }
};
