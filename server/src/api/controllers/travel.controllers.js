
const Travels = require("../models/travels.model");

const getTravelByName = async (req, res) => {
    const { name } = req.params;
    console.log(name)
    try {
        const travel = await Travels.findOne({ destination: name });
        if (!travel) {
            return res.json({ message: "El viaje no existe" });
        } else {
            return res.json({ data: travel });
        }
    } catch (error) {
        res.status(500).json(error)
    }
};


const addTravel = async (req, res) => {
    try {
        console.log('req.body:', req.body);
        console.log('req.file:', req.file);
        const newTravels = new Travels(req.body);


        if (req.file.path) {
            newTravels.image = req.file.path;
        }

        const savedTravel = await newTravels.save();

        res.status(201).json({ data: savedTravel });
    } catch (error) {
        console.error("Error al crear el viaje:", error);
        res.status(500).json({ message: "Error al crear el viaje" });
    }
};

const addonetravel = async (req, res) => {
    try {

        const newTravels = new Travels(req.body);


        const savedTravel = await newTravels.save();

        res.status(201).json({ data: savedTravel });
    } catch (error) {
        console.error("Error al crear el viaje:", error);
        res.status(500).json({ message: "Error al crear el viaje" });
    }
};

const updateTravel = async (req, res) => {
    try {
        const { id } = req.body;
        const travelBody = req.body;
        const update = await Travels.findByIdAndUpdate(id, travelBody, { new: true })

        if (!update) {
            res.json({ success: false, message: "el id del viaje no existe" })
        } else {
            res.json({ success: true, data: update });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Error interno del servidor" });
    }

}

const getAllTravels = async (req, res) => {
    try {
        const travels = await Travels.find();
        if (!travels) {
            return res.json({ message: "No se encontraron viajes" });
        } else {
            return res.json({ data: travels });
        }
    } catch (error) {
        res.status(500)
    }
};


const deleteTravel = async (req, res) => {
    try {

        const { id } = req.params;
        const deleted = await Travels.findByIdAndDelete(id)
        if (deleted) {
            res.status(201).json({ success: true, message: deleted })
        } else {
            res.status(200).json({ success: false, message: "No existe el usuario que buscas" })
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    getTravelByName, addTravel, updateTravel, getAllTravels, deleteTravel, addonetravel

}