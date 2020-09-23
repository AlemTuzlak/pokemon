export const createPokemonObjectForApi = (id, name, stats, types, abilities, weight, height, image) => {
    const pokemon = new FormData();
    pokemon.append('id', id);
    pokemon.append('name', name);
    pokemon.append('weight', weight);
    pokemon.append('height', height);
    pokemon.append('id', id);
    return pokemon;
}


export const createUserObjectForApi = (firstName, lastName, username, email, password) => {
    const user = new FormData();
    user.append('firstName', firstName);
    user.append('lastName', lastName);
    user.append('username', username);
    user.append('email', email);
    user.append('password', password);

    return user;
}

const createArrayQueryParam = (object, objectEntity) => {
    let finalOutput = '';

    if(object[objectEntity] && object[objectEntity].length){
        object[objectEntity].forEach(entity => {
            finalOutput += (`${entity},`);
        })
    }

    if(finalOutput) finalOutput = finalOutput.slice(0, -1);

    const queryArray = finalOutput ? `${objectEntity}=${finalOutput}&` : '';

    return queryArray;
}

export const createArrayFormData = (data, items, fieldName) => {
    items.forEach((item, i) => {
        data.append(`${fieldName}[${i}]`, item);
    });
}