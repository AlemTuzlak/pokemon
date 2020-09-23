export const createValidationObject = (validation, firstSubmit, validationFields, visitedField ) => {
    let validationObject = { isValid: true };

    if(!validation || !validationFields || !validationFields.length || !visitedField || !visitedField.length || visitedField.length !== validationFields.length) 
        return validationObject;

    for(let i = 0; i < validationFields.length; i++){
        if(validation[validationFields[i]] && validation[validationFields[i]].isInvalid && (!firstSubmit || visitedField[i])){
            validationObject = {...validationObject, [`${validationFields[i]}`]: true, isValid: false };
        }
        else {
            validationObject = {...validationObject, [`${validationFields[i]}`]: false };
        }
    }

    return validationObject;
}