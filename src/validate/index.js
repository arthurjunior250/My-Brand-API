import Joi from "joi";

// query validation
export const queryValidation = (data) => {
    const schema = Joi.object({
        names: Joi.string().min(4).required(),
        email: Joi.string().min(10).required().email(),
        message: Joi.string().min(3).required(),
    });

    return schema.validate(data);
};

//User validation
export const registerValidation = (data) => {
    const schema = Joi.object({
        userName: Joi.string().min(2).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    });

    return schema.validate(data);
};

//blog validation
export const blogValidation = (data) => {
    const schema = Joi.object({
        image: Joi.string().min(4),
        title: Joi.string().min(4).required(),
        description: Joi.string().min(100).required(),
    });

    return schema.validate(data);
};