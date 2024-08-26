const express = require("express");
const router = express.Router();
const { getTravelByName, addTravel, updateTravel, getAllTravels, deleteTravel, addonetravel } = require("../controllers/travel.controllers")
const upload = require("../../middleware/upload")
router.get("/gettravel/:name", getTravelByName);
router.post("/addTravel", upload.single("image"), addTravel);
router.put("/updateTravel", updateTravel);
router.get("/getalltravels", getAllTravels)
router.delete("/deletetravel/:id", deleteTravel);
router.post("/addonetravel", addonetravel);

module.exports = router 