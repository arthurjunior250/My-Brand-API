import Inquiry from '../database/model/inquiry.model';
import { queryValidation } from "../validate/index";
import sendEmail from '../middleware/sendEmail';

export const saveInquiry = async(req, res) => {
    const { error } = queryValidation(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    const inquiry = req.body;
    const newInquiry = new Inquiry(inquiry);
    await newInquiry.save();
        if (newInquiry) {
          const message = `
            <h2>Your mesaage is </h2>
            <p><span>Names: </span>${req.body.names}</p>
            <p><span>Email: </span>${req.body.email}</p>
            <p><span>Message: </span>${req.body.message}</p>
            `;
          sendEmail(message);
        }
    res.status(201).json({ status: "success", data: newInquiry });
}
export const getAllInquiries = async(req, res) => {
    const inquiries = await Inquiry.find();
    res.status(200).json({ status: true, data: inquiries })
}

export const getInquiryById = async(req, res) => {
    const { id } = req.params;
    const inquiry = await Inquiry.findById(id);
    if (!inquiry) return res.status(404).json({ status: "fail", message: "Inquiry not found" });
    res.status(200).json({ status: true, data: inquiry });
}

export const deleteInquiryById = async(req, res) => {
    const { id } = req.params;
    const inquiry = await Inquiry.findById(id);
    if (!inquiry) return res.status(404).json({ status: "fail", message: "Inquiry not found" });
    await Inquiry.findByIdAndDelete(id);
    res.status(200).json({ status: "success", message: "Inquiry deleted", data: "Null" });
}