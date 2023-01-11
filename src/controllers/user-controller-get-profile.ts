import { UserGetProfile } from "../models/user-model"
import { checkLength, hasWhiteSpace } from "./validate_data/validation"
import * as mongoDB from "mongodb"

const {find_in_db} = require('../db_connect/connect-to-db.js')

async function get_profile(data: UserGetProfile){
    let response = null

    if (checkLength(data['uuid'], 9) || hasWhiteSpace(data['uuid']) || data['uuid'] == undefined) response = {
        "Code": "204",
        "Description": "Wrong data"
    }

    else {
        await find_in_db({"_id": data['uuid']})
        .then((result : mongoDB.WithId<mongoDB.Document>) => {
            if (result != null) response = {
                "Code": "200",
                "Description": "User found",
                "Result": {
                    "id": result['_id'],
                    "username": result['username'],
                    "email": result['email'],
                    "favorite_genres": result['favorite_genres'],
                    "avatar": result['avatar']
                }
            }

            else response = {
                "Code": "204",
                "Description": "User not found"
            }
        })
    }

    return response
}

module.exports = get_profile