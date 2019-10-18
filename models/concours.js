const mongoose = require("mongoose");

const concoursSchema = mongoose.Schema({
    startDate: { type: Number, required: true },
    estFini: { type: Boolean, required: true }
});

module.exports = mongoose.model("Concours", concoursSchema);