import mongoose from 'mongoose';

const bikeSchema = new mongoose.Schema({
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
        type: Array,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    modelYear: {
        type: String,
    },
    condition: {
        type: String,
    },
    transmission: {
        type: String,
    },
    manufacturer: {
        type: String,
    },
    model: {
        type: String,
    },
    fuelType: {
        type: String,
    },
    engineCapacity: {
        type: String,
    },
    mileage: {
        type: String,
    },
    color: {
        type: String,
    },
    site: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

export const Bike = mongoose.model('Bike', bikeSchema);