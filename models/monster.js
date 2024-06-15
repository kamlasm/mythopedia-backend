import mongoose from 'mongoose';

const monsterSchema = new mongoose.Schema({
    name: { type: String, require: true, unique: true },
    description: { type: String, require: true },
    image: { type: String, require: true },
    strength: { type: Number, require: true},
    intelligence: { type: Number, require: true},
    level: { type: Number, require: true }
})


export default mongoose.model('Monster', monsterSchema)