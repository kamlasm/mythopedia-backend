import mongoose from "mongoose";
import mongooseUniqueValidator from 'mongoose-unique-validator'
import mongooseHidden from 'mongoose-hidden'

const gameSchema = new mongoose.Schema({
    money: { type: Number, require: true, default: 100 },
    totalStrength: { type: Number, require: true, default: 0 },
    totalIntelligence: { type: Number, require: true, default: 0 },
    team: [{ type: mongoose.Schema.ObjectId, ref: "Character" }]

})

const userSchema = new mongoose.Schema({
    username: { type: String, require: true, unique: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    isAdmin: { type: Boolean, default: false },
    gameplay: { gameSchema }
})

userSchema.plugin(mongooseUniqueValidator)
userSchema.plugin(mongooseHidden({
    defaultHidden: { _id: true, email: true, password: true }
}))


export default mongoose.model('User', userSchema)
