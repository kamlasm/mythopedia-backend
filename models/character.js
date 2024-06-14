import mongoose from "mongoose";

const characterSchema = new mongoose.Schema({
    name: { type: String, require: true, unique: true },
    description: { type: String, require: true },
    type: { type: String, require: true },
    image: { type: String, require: true },
    relatives: { type: Object },
    strength: { type: Number },
    intelligence: { type: Number }
})


export default mongoose.model('Character', characterSchema)