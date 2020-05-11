const jwt = require("jsonwebtoken");


exports.authentication = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.SECRET);
        const email = decodedToken.email;
        if (!email) {
            return res.status(401).json({
                error: "UnAuthorized",
                status: "error"
            });
        } else {
            next()
        }
    } catch {
        res.status(401).json({
            error: "Unauthorized",
            status: "error"
        })
    }
}
