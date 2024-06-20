import mongoose from 'mongoose';

const characterSchema = new mongoose.Schema({
    name: { type: String, require: true, unique: true },
    description: { type: String, require: true },
    type: { type: String, require: true },
    images: { type: Object, require: true },
    relatives: { type: Object },
    strength: { type: Number, require: true, default: 0 },
    intelligence: { type: Number, require: true, default: 0  },
    cost: { type: Number, require: true, default: 0  },
    isPlayable: { type: Boolean, require: true, default: false }
})


export default mongoose.model('Character', characterSchema)