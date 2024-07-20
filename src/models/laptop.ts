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
        required: true,
    },
    gpu: {
        type: String,
        required: true,
    },
    processor: {
        type: String,
        required: true,
    },
    storage: {
        type: String,
        required: true,
    },
    good_for_students: {
        type: Boolean,
        required: true,
    },
    good_for_students_reason: {
        type: String,
        required: false,
    },
    good_for_developers: {
        type: Boolean,
        required: true,
    },
    good_for_developers_reason: {
        type: String,
        required: false,
    },
    good_for_video_editors: {
        type: Boolean,
        required: true,
    },
    good_for_video_editors_reason: {
        type: String,
        required: false,
    },
    good_for_gaming: {
        type: Boolean,
        required: true,
    },
    good_for_gaming_reason: {
        type: String,
        required: false,
    },
    good_for_business: {
        type: Boolean,
        required: true,
    },
    good_for_business_reason: {
        type: String,
        required: false,
    },
}, {
    timestamps: true,
});

export const Laptop = mongoose.model('Laptop', laptopSchema);
