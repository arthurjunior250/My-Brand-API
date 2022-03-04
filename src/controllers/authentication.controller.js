import User from '../database/model/user.model';
import { hash, verify } from '../helpers/hash-password';
import { decodeToken, signToken } from '../helpers/jwt';
import emailVlidator from 'email-validator';


export const signup = async(req, res) => {
    if (emailVlidator.validate(req.body.email)) {
        let user = await User.findOne({
            email: req.body.email,
        });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "Email Exists",
            });
        }
        user = req.body;
        user.password = await hash(user.password);
        const newUser = await new User(user);
        newUser.save();
        res
            .status(201)
            .json({ success: true, message: "User created", data: newUser });
    } else {
        res.status(401).json({ success: false, message: "invalid email" });
    }

}

export const login = async(req, res) => {
    const { password, email } = req.body;

    let user = await User.findOne({ email });
    if (!user) return res.status(401).json({ success: false, message: "Invalid email or password" });
    const isPasswordValid = await verify(user.password, password);
    if (!isPasswordValid) return res.status(401).json({ success: false, message: "Invalid email or password" });

    const { _id, firstName, lastName } = user;
    const token = signToken(JSON.stringify({ _id, firstName, lastName, email: user.email }));
    return res.status(200).json({ success: true, message: "successfully logged in", token })
}

export const userProfile = (req, res) => {
    const bearerToken = req.headers.authorization;
    const token = bearerToken.split(" ")[1];
    const payload = decodeToken(token);
    return res.status(200).json({ success: true, data: payload });
}