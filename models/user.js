import mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator'
import mongooseHidden from 'mongoose-hidden'

const gameSchema = new mongoose.Schema({
    level: { type: Number, require: true, default: 1},
    money: { type: Number, require: true, default: 100 },
    totalStrength: { type: Number, require: true, default: 0 },
    totalIntelligence: { type: Number, require: true, default: 0 },
    team: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Character' }]

})

const userSchema = new mongoose.Schema({
    username: { type: String, require: true, unique: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    isAdmin: { type: Boolean, default: false },
    gameplay: { type: gameSchema, require: true, default: {level:1 ,money: 100, strength: 0, intelligence: 0} }
})

userSchema.plugin(mongooseUniqueValidator)
userSchema.plugin(mongooseHidden({
    defaultHidden: { _id: true, email: true, password: true }
}))


export default mongoose.model('User', userSchema)
