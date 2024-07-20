import mongoose from 'mongoose';

const mobilePhoneSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    site: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

export const MobilePhone = mongoose.model('MobilePhone', mobilePhoneSchema);