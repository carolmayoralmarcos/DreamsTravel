const { verifyToken } = require("../utils/token");
const Users = require("../api/models/user.model")

const isAuth = async (req, res, next) => {
    const authorization = req.headers.authorization

    if (!authorization) {
        return res.json({ message: "No tienes autorización" })
    }
    const token = authorization.split(" ")[1];
    if (!token) {
        return res.json({ message: "Necesita un token para acceder a esta ruta" })
    }
    const tokenVerify = verifyToken(token);
    if (!tokenVerify.id) {
        return res.json({ message: "El token no es correcto" })
    }
    const findToken = await Users.findById(tokenVerify.id);
    req.dataUser = findToken;
    next()
}
const isAdmin = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "Acceso denegado, falta autorización" });
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Token no proporcionado" });
        }

        const decodedToken = verifyToken(token);
        if (!decodedToken || !decodedToken.id) {
            return res.status(401).json({ message: "Token inválido" });
        }

        const user = await Users.findById(decodedToken.id);
        if (!user || user.role !== "admin") {
            return res.status(403).json({ message: "Acceso denegado, permisos insuficientes" });
        }

        req.dataUser = user;
        next();
    } catch (error) {
        return res.status(500).json({ message: "Error en la autenticación" });
    }
};



module.exports = { isAuth, isAdmin }