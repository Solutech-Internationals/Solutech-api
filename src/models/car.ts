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
        type: Array,
        required: false,
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

carSchema.index({ title: 'text', description: 'text' });

export const Car = mongoose.model('Car', carSchema);