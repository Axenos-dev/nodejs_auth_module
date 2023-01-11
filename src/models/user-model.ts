import * as mongoDB from 'mongodb'

export type User = {
    "username": string,
    "password": string,
    "email": string
}

export type UserToParse = {
    "_id": mongoDB.ObjectId,
    "username": string,
    "password": string,
    "email": string,
    "favorite_genres": [],
    "avatar": string
}

export type UserLogin = {
    "email": string,
    "password": string
}

export type UserGetProfile = {
    "uuid": string
}