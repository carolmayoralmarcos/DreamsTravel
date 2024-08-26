const express = require("express");
const router = express.Router();
const { deleteUser, addTravelToUser, addUser, login, getMyTravels, updateUser } = require("../controllers/user.controllers")
const { isAuth, isAdmin } = require("../../middleware/auth")
router.delete("/deleteuser", deleteUser);
router.put("/addtraveltouser/:travelId/:userId", addTravelToUser)
router.post("/adduser", addUser)
router.post("/login", login)
router.get("./mytravels", [isAuth], getMyTravels)
router.put("/updateuser", [isAdmin], updateUser)
module.exports = router