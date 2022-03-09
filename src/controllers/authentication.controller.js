import User from '../database/model/user.model';
import { hash, verify } from '../helpers/hash-password';
import { decodeToken, signToken } from '../helpers/jwt';
import emailVlidator from 'email-validator';
import { registerValidation } from "../validate/index";

export const signup = async(req, res) => {
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    if (emailVlidator.validate(req.body.email)) {
        let user = await User.findOne({
            email: req.body.email,
        });
        if (user) {
            return res.status(400).json({
                status: "fail",
                message: "Email Exists",
            });
        }
        user = req.body;
        user.password = await hash(user.password);
        const newUser = await new User(user);
        newUser.save();
        res
            .status(201)
            .json({ status: "success", message: "User created" });
    } else {
        res.status(401).json({ status: "fail", message: "invalid email" });
    }

}

export const login = async(req, res) => {
    const { password, email } = req.body;

    let user = await User.findOne({ email });
    if (!user) return res.status(401).json({ status: "fail", message: "Invalid email or password" });
    const isPasswordValid = await verify(user.password, password);
    if (!isPasswordValid) return res.status(401).json({ status: "fail", message: "Invalid email or password" });

    const { _id, firstName, lastName, role } = user;
    const token = signToken(JSON.stringify({ _id, firstName, lastName, role, email: user.email }));
    return res.status(200).json({ status: "success", message: "successfully logged in", token })

}

export const userProfile = (req, res) => {
    const bearerToken = req.headers.authorization;
    const token = bearerToken.split(" ")[1];
    const payload = decodeToken(token);
    return res.status(200).json({ status: true, data: payload });
}