import * as mongoDB from "mongodb"
import { UserToParse } from "../models/user-model"

const URI = "*****"

async function insert_to_db(data: UserToParse, exist : boolean) : Promise<boolean>{
    if (exist) return false

    const client : mongoDB.MongoClient = new mongoDB.MongoClient(URI)
    
    client.connect()

    const db : mongoDB.Db = client.db('mazano')
    const users : mongoDB.Collection = db.collection("users")

    users.insertOne(data).catch(err => {
        console.error(err)
    })

    client.close()

    return true
}

async function find_in_db(query) : Promise<mongoDB.WithId<mongoDB.Document>>{
    const client : mongoDB.MongoClient = new mongoDB.MongoClient(URI)

    const db : mongoDB.Db = client.db('mazano')
    const users : mongoDB.Collection = db.collection("users")

    return users.findOne(query)
}


module.exports = {insert_to_db, find_in_db}