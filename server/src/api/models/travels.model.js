const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const travelSchema = new Schema({
    destination: { type: String, require: true },
    price: { type: Number, required: true },
    duration: { type: Number, required: true },
    image: { type: String, default: "" }
}, {
    collection: "travels"
})

const Travels = mongoose.model("travels", travelSchema)
module.exports = Travels;