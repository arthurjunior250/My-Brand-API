import Joi from "joi";

// New inquiries
export const InquiryValidation = (data) => {
    const schema = Joi.object({
        names: Joi.string().min(6).required(),
        email: Joi.string().min(6).required(),
        message: Joi.string().min(6).required(),
    });

    return schema.validate(data);
};

export const userValidation = (data) => {
    const schema = Joi.object({
        userName: Joi.string().min(6),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    });

    return schema.validate(data);
};