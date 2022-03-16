import mongoose from "mongoose";

const InquirySchema = new mongoose.Schema({
    names: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const Enquiry = mongoose.model('Enquiry', InquirySchema);
export default Enquiry;