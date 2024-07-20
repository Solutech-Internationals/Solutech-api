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
        const mobilePhones = await MobilePhone.find({});
        res.status(200).send(mobilePhones);
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