import newsLetters from '../database/model/newsletter.model';
import { newsletterValidation } from "../validate/index";

export const newsLetterEmail = async(req, res) => {
    const { error } = newsletterValidation(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    let oldemail = await newsLetters.findOne(req.body);
    if (oldemail) {
        return res.status(400).json({
            status: "fail",
            message: "email Exists",
        });
    }
    const newsletter = req.body;
    const saveData = new newsLetters(newsletter);
    await saveData.save();
    res.status(201).json({ status: "success", data: saveData });
}

export const getAllSubscribers = async(req, res) => {
    const news = await newsLetters.find();
    res.status(200).json({ status: true, data: news })
}

export const deleteNewsById = async(req, res) => {
    const { id } = req.params;
    const news = await newsLetters.findById(id);
    if (!news) return res.status(404).json({ status: "fail", message: "email not found" });
    await newsLetters.findByIdAndDelete(id);
    res.status(200).json({ status: "success", message: "email deleted", data: "Null" });
}