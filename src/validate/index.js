import Joi from "joi";

// New inquiries
export const queryValidation = (data) => {
    const schema = Joi.object({
        image: Joi.string().min(3).required(),
        title: Joi.string().min(6).required(),
        description: Joi.string().min(6).required(),
    });

    return schema.validate(data);
};

//User validation
export const registerValidation = (data) => {
    const schema = Joi.object({
        userName: Joi.string().min(2),
        email: Joi.string().min(2).required().email(),
        password: Joi.string().min(2).required(),
    });

    return schema.validate(data);
};