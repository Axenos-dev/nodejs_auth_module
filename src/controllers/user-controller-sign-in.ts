import { UserLogin } from "../models/user-model.js"
import {validateEmail, hasWhiteSpace} from "./validate_data/validation.js"

import * as mongoDB from "mongodb"

const {find_in_db} = require('../db_connect/connect-to-db.js')
const bcrypt = require('bcrypt')

async function sign_in(data: UserLogin){
    let response = null

    if (validData(data)){
        await find_in_db({"email": data['email']})
        .then(async (result : mongoDB.WithId<mongoDB.Document>) => {
            const valid_pass = await bcrypt.compare(data['password'], result['password'])
            
            if (valid_pass) response = {
                "Code": "200",
                "Description": "Successful login",
                "uuid": result['_id']
            } 
            else response = {
                "Code": "204",
                "Description": "Wrong password"
            }
        })
    } 
    else response = {
        "Code": "204",
        "Description": "Wrong data"
    }

    return response
}

function validData(data: UserLogin) : boolean{
    if (data['email'] == undefined || data['password'] == undefined){
        return false
    }

    if (!validateEmail(data['email']) || hasWhiteSpace(data['password'])){
        return false
    }

    return true
}

module.exports = sign_in