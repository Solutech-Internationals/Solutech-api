import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
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
        required: false,
    },
    description: {
        type: String,
        required: true,
    },
    modelYear: {
        type: String,
        required: true,
    },
    condition: {
        type: String,
        required: true,
    },
    transmission: {
        type: String,
        required: true,
    },
    manufacturer: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    fuelType: {
        type: String,
        required: true,
    },
    engineCapacity: {
        type: String,
        required: true,
    },
    mileage: {
        type: String,
        required: true,
    },
    color: {
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

export const Car = mongoose.model('Car', carSchema);