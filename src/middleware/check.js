import { decodeToken } from "./jwt";

export const checkAdmin = (req, res, next) => {
    const bearerToken = req.headers.authorization;
    if (bearerToken) {
        const token = bearerToken.split(" ")[1];
        const payload = decodeToken(token);
        if (payload?.role == "admin") return next();
        return res.status(401).json({ status: "fail", message: "you are not allowed to access this service" });
    }
    return res
        .status(401)
        .json({ status: "fail", message: "Not Authorized , please login" });
};

export const checkUser = (req, res, next) => {
    const bearerToken = req.headers.authorization;
    if (bearerToken) {
        const token = bearerToken.split(" ")[1];
        const payload = decodeToken(token);
        if (payload?.role == "standard-user") {
            req.currentUser = payload;
            return next();
        }
        return res.status(401).json({ status: "fail", message: "You are not allowed to access this service" });
    }
    return res
        .status(401)
        .json({ status: "fail", message: "Not Authorized , please login" });
};