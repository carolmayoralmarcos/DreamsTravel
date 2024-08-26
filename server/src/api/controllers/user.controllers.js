const Users = require("../models/user.model")
const Travels = require('../models/travels.model');
const { generateToken } = require("../../utils/token")
const bcrypt = require("bcrypt");
const deleteUser = async (req, res) => {
    try {
        const { id } = req.query;
        const deleted = await Users.findByIdAndDelete(id)
        if (deleted) {
            res.status(201).json({ success: true, message: deleted })
        } else {
            res.status(200).json({ success: false, message: "No existe el usuario que buscas" })
        }
    } catch (error) {
        res.status(500).json(error)
    }
}


const addTravelToUser = async (req, res) => {
    const { travelId, userId } = req.params;
    console.log("User ID:", userId);
    console.log("Travel ID:", travelId);
    try {
        const modifyUser = await Users.findByIdAndUpdate(

            userId,
            { $push: { travel: travelId } },
            { new: true }
        );
        console.log(modifyUser)
        if (!modifyUser) {
            return res.status(404).json({ message: "El usuario no existe" });
        } else {
            return res.status(200).json({ message: "Viaje asignado con éxito al usuario", data: modifyUser });
        }
    } catch (error) {
        console.error("Error al asignar el viaje al usuario:");
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};


const addUser = async (req, res) => {
    try {
        const newUser = new Users(req.body);

        newUser.password = bcrypt.hashSync(newUser.password, 10)
        const createdUser = await newUser.save();
        return res.status(200).json({ message: "Usuario creado", data: createdUser })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error interno del servidor" });
    }

}

const login = async (req, res) => {
    try {
        const user = req.body;
        const userByEmail = await Users.findOne({ email: user.email })
        if (userByEmail) {
            if (bcrypt.compareSync(user.password, userByEmail.password)) {

                const data = { id: userByEmail._id, email: userByEmail.email }
                const token = generateToken(data)
                return res.status(200).json({ message: token })

            } else {
                return res.status(200).json({ message: "La contraseña no coincide" })
            }
        } else {
            return res.status(404).json({ message: "El email no existe" });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}
const getMyTravels = async (req, res) => {
    try {
        const userId = req.dataUser._id;

        const user = await Users.findById(userId).select('travels');

        if (!user || user.travels.length === 0) {
            return res.status(404).json({ message: "No se encontraron viajes para este usuario" });
        }

        res.status(200).json({ data: user.travel });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor" });
    }
};
const updateUser = async (req, res) => {
    try {

        const userId = req.dataUser._id;

        const { name, email, password } = req.body;

        const user = await Users.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        if (name) user.name = name;
        if (email) user.email = email;
        if (password) user.password = password;


        const updatedUser = await user.save();
        res.status(200).json({ message: "Usuario actualizado correctamente", data: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor al actualizar el usuario" });
    }
};



module.exports = { deleteUser, addTravelToUser, addUser, login, getMyTravels, updateUser }