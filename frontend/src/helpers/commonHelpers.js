import { config } from "../config";

export const isObjectEmpty = (object) => {
    return Object.keys(object).length === 0 && object.constructor === Object
}

export const createFullName = (user) => {
    return `${user.firstName ? user.firstName : ''} ${user.lastName ? user.lastName : ''}`;
}

export const isEqual = (firstObject, secondObject) => {
    return JSON.stringify(firstObject) === JSON.stringify(secondObject);
}

export const getIdsFromObjectsArray = entities => {
    return entities.map(entity => entity._id)
}