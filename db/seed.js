
import Character from "../models/character.js"
import User from "../models/user.js"
import { connectToDb, truncateDb, disconnectDb } from './helpers.js'
import bcrypt from 'bcrypt'
import characterData from './data/characters.js'


async function seed() {
    await connectToDb()
    console.log('🧀 Database Connected 🧀')

    await truncateDb()
    console.log('🫓  Database Dropped 🫓')


    const adminObject = {
        username: 'admin',
        email: 'admin@email.com',
        password: 'pass',
        isAdmin: true,
    }

    const passwordHash = bcrypt.hashSync(adminObject.password, 10)
    adminObject.password = passwordHash

    await User.create(adminObject)

    await Character.create(characterData)

    await disconnectDb()
    console.log('🥪 Bye bye 🥪 ')

}

seed()