import Character from '../models/character.js'
import User from '../models/user.js'
import Monster from '../models/monster.js'
import { connectToDb, truncateDb, disconnectDb } from './helpers.js'
import bcrypt from 'bcrypt'
import characterData from './data/characters.js'
import monsterData from './data/monsters.js'

async function seed() {
    try {
        await connectToDb()
        console.log('Database connected')

        await truncateDb()
        console.log('Database dropped')

        const adminObject = {
            username: 'admin',
            email: 'admin@email.com',
            password: 'pass',
            isAdmin: true,
        }

        const passwordHash = bcrypt.hashSync(adminObject.password, 10)
        adminObject.password = passwordHash

        const adminUser = await User.create(adminObject)

        console.log(`${adminUser.username} user created`)

        const characters = await Character.create(characterData)
        console.log(`${characters.length} characters added to the database`)
        
        const monsters = await Monster.create(monsterData)
        console.log(`${monsters.length} monsters added to the database`)


    } catch (err) {
        console.log(err)
    }

    await disconnectDb()
    console.log('Database disconnected')
}

seed()