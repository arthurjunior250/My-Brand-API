import Inquiry from '../database/model/inquiry.model';

export const saveInquiry = async(req, res) => {
    const inquiry = req.body;
    const newInquiry = new Inquiry(inquiry);
    await newInquiry.save();
    res.status(201).json({ success: true, data: newInquiry });
}

export const getAllInquiries = async(req, res) => {
    const inquiries = await Inquiry.find();
    res.status(200).json({ success: true, data: inquiries })
}

export const getById = async(req, res) => {
    const { id } = req.params;
    const inquiry = await Inquiry.findById(id);
    if (!inquiry) return res.status(404).json({ success: false, message: "Inquiry not found" });
    res.status(200).json({ success: true, data: inquiry });
}

export const updateInquiry = async(req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const inquiry = await Inquiry.findById(id);
    if (!inquiry) return res.status(404).json({ success: false, message: "Inquiry not found" });
    await Inquiry.findByIdAndUpdate(id, updates);
    res.status(200).json({ success: true, message: "Inquiry updated successfully" })
}

export const deleteInquiryById = async(req, res) => {
    const { id } = req.params;
    const inquiry = await Inquiry.findById(id);
    if (!inquiry) return res.status(404).json({ success: false, message: "Inquiry not found" });
    await Inquiry.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Inquiry deleted", data: inquiry });
}