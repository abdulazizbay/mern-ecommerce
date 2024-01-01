const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
    const jwtSecret = config.get("jwtSecret");
    if (req.method === "OPTIONS") {
        return next();
    }

    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return res.status(401).json({ message: "Not authorized, auth header not provided." });
        }

        const token = authorizationHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Not authorized, Please login first." });
        }
        const decodedToken = jwt.verify(token, jwtSecret);
        req.user = decodedToken;
        next();
    } catch (e) {
        console.error(e.message);
        return res.status(401).json({ message: "Not authorized2." });
    }
};
