import mongoose from 'mongoose';

const laptopSchema = new mongoose.Schema({
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
    ram: {
        type: String,
    },
    gpu: {
        type: String,
    },
    processor: {
        type: String,
    },
    storage: {
        type: String,
    },
    good_for_students: {
        type: Boolean,
    },
    good_for_students_reason: {
        type: String,
    },
    good_for_developers: {
        type: Boolean,
    },
    good_for_developers_reason: {
        type: String,
    },
    good_for_video_editors: {
        type: Boolean,
    },
    good_for_video_editors_reason: {
        type: String,
    },
    good_for_gaming: {
        type: Boolean,
    },
    good_for_gaming_reason: {
        type: String,
    },
    good_for_business: {
        type: Boolean,
    },
    good_for_business_reason: {
        type: String,
    },
}, {
    timestamps: true,
});

export const Laptop = mongoose.model('Laptop', laptopSchema);
