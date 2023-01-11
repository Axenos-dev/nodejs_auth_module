import { User, UserToParse } from "../models/user-model.js"
import {checkLength, validateEmail, hasWhiteSpace} from "./validate_data/validation.js"
import * as mongoDB from "mongodb"

const bcrypt = require("bcrypt")
const uuid = require("uuid")
const {insert_to_db, find_in_db} = require('../db_connect/connect-to-db.js')

async function sign_up_main(data: User){
    const new_user = create_user(data)
    let response = null

    if (new_user != null) {
        await find_in_db({"email": data['email']})
        .then((result : mongoDB.WithId<mongoDB.Document>) => {
            return result != null
        }).then((is_exist: boolean) => {
            return insert_to_db(new_user, is_exist)
        }).then((success: boolean) => {
            if (success) response  = {
                "Code": "200",
                "Description": "Successful regisatration",
                "uuid": new_user['_id']
            }
             
            else response = {
                "Code": "204",
                "Description": "Error while inserting to db"
            }
        })
    } else {
        response = {
            "Code": "204",
            "Description": "Wrong data"
        }
    }
    
    return response
}

function create_user(data: User): UserToParse{
    if (data['email'] == undefined || data['password'] == undefined || data['username'] == undefined){
        return null
    }

    if (checkLength(data['username'], 4) || checkLength(data['password'], 5) || !validateEmail(data['email'])) {
        return null
    }

    if (hasWhiteSpace(data['username']) || hasWhiteSpace(data['password'])){
        return null
    }

    return {
        "_id": uuid.v4(),
        "username": data['username'],
        "password": bcrypt.hashSync(data['password'], 10),
        "email": data['email'],
        "favorite_genres": [],
        "avatar": ""
    }
}

module.exports = sign_up_main