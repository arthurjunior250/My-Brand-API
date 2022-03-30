import User from '../database/model/user.model';
import { hash, verify } from '../middleware/hash-password';
import { decodeToken, signToken } from '../middleware/jwt';
import { registerValidation } from "../validate/index";

export const signup = async(req, res) => {
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
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
    res.status(201).json({ status: "success", message: "User created" });
    // }

}

export const login = async(req, res) => {
    const { password, email } = req.body;

    let user = await User.findOne({ email });
    if (!user) return res.status(401).json({ status: "fail", message: "Invalid email or password" });
    const isPasswordValid = await verify(user.password, password);
    if (!isPasswordValid) return res.status(401).json({ status: "fail", message: "Invalid email or password" });

    const { _id, userName, role } = user;
    const userData = {
		userName: user.userName,
		role: user.role,
		email: user.email,
		createdAt: user.createdAt,
		_id: user._id,
	};
    const token = signToken(JSON.stringify({ _id,userName:user.userName, role, email: user.email }));
    return res.status(200).json({ status: "success", message: "successfully logged in", data:userData, token })

}

export const userProfile = (req, res) => {
    const bearerToken = req.headers.authorization;
    const token = bearerToken.split(" ")[1];
    const payload = decodeToken(token);
    return res.status(200).json({ status: true, data: payload });
}

export const getAllusers = async(req, res) => {
    const users = await User.find();
    res.status(200).json({ status: true, data: users })
}

export const deleteuserById = async(req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ status: "fail", message: "user not found" });
    await User.findByIdAndDelete(id);
    res.status(200).json({ status: "success", message: "user deleted" });
}
export const updateProfile = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ status: "fail", message: "User not found" });
    await User.findByIdAndUpdate(id, updates);
	return res.status(200).json({status:"success",message: "User updated successfully",});
};
