import type {Request, Response} from 'express';
import {MobilePhone} from "../models/mobilePhone.ts";


export  const createMobilePhone = async (req: Request, res: Response) => {
    try {
        const mobilePhone = new MobilePhone(req.body);
        await mobilePhone.save();
        res.status(201).send(mobilePhone);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const saveMobilePhones = async (req: Request, res: Response) => {
    try {
        const mobilePhones = req.body;
        if (!Array.isArray(mobilePhones)) {
            return res.status(400).send({ error: 'Input must be an array of mobilePhones' });
        }
        const savedMobilePhones = await MobilePhone.insertMany(mobilePhones);
        res.status(201).send(savedMobilePhones);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const readMobilePhones = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string, 10) || 1;
        // Set a fixed limit of 30 items per page
        const limit = 32;
        const skip = (page - 1) * limit;

        // Fetch paginated laptops
        const mobile = await MobilePhone.find().skip(skip).limit(limit);
        const totalMobilePhones = await MobilePhone.countDocuments();

        // Calculate total pages
        const totalPages = Math.ceil(totalMobilePhones / limit);

        // Send paginated response
        res.status(200).send({mobile, totalPages});
    } catch (error) {
        res.status(500).send(error);
    }
};

export const readMobilePhone = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const mobilePhone = await MobilePhone.findById(id);
        if (!mobilePhone) {
            res.status(404).send();
            return;
        }
        res.status(200).send(mobilePhone);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateMobilePhone = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const mobilePhone = await MobilePhone.findByIdAndUpdate(id,
            req.body,
            {
                new: true,
                runValidators: true
            });
        if (!mobilePhone) {
            res.status(404).send();
        }
        res.status(200).send(mobilePhone);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const deleteMobilePhone = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const mobilePhone = await MobilePhone.findByIdAndDelete(id);
        if (!mobilePhone) {
            res.status(404).send();
        }
        res.status(200).send(mobilePhone);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const deleteMobilePhones = async (req: Request, res: Response) => {
    try {
        await MobilePhone.deleteMany({});
        res.status(200).send();
    } catch (error) {
        res.status(500).send(error);
    }
}