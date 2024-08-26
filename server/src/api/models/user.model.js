const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    role: { type: String, require: true, enum: ["admin", "client"], default: "client" },
    travel: [{ type: Schema.Types.ObjectId, ref: "travel" }]
},
    {
        collection: "users",
    })
const Users = mongoose.model("users", userSchema)
module.exports = Users;