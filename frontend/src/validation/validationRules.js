import validator from 'validator';
import { 
    checkIfThereAreAtLeastTwoWords, validateEmail, trimAllWhitespace, 
    hasOnlyLettersAndNumbers, validateIfNotEmpty, hasOnlyLetters,
    isTrue, checkIfPasswordsMatch, checkPasswordValidity,
    checkArrayLength
} from './validationMethods';

export const passwordMatch = (field, state, message) => {
    return {
        field: field,
        method: checkIfPasswordsMatch,
        args: state,
        validWhen: true,
        message: `${message}`
    }
}

export const passwordValid = (field, message) => {
    return {
        field: field,
        method: checkPasswordValidity,
        args: [],
        validWhen: true,
        message: `${message}`
    }
}
export const notEmpty = (field, message) => {
    return {
        field: field,
        method: validator.isEmpty,
        args: [{ ignore_whitespace: true}],
        validWhen: false,
        message: `${message}`
    }
}
export const arrayNotEmpty = (field, message) => {
    return {
        field: field,
        method: checkArrayLength,
        args: [],
        validWhen: true,
        message: `${message}`
    }
}
export const validEmailFormat = (field, message) => {
    return {
        field: field,
        method: validator.isEmail,
        validWhen: true,
        message: `${message}`
    }
}

export const isAlphanumeric = (field, message) => {
    return {
        field: field,
        method: hasOnlyLettersAndNumbers,
        args: [ 'en-US' ],
        validWhen: true,
        message:  `${message}`
    }
}
export const isAlpha = (field, message) => {
    return {
        field: field,
        method: hasOnlyLetters,
        args: [ 'sr-RS@latin' ],
        validWhen: true,
        message:  `${message}`
    }
}
export const passwordLengthContentRule = (field, message) => {
    return {
        field: field,
        method: validator.isLength,
        args: [{ min: 6 }],
        validWhen: true,
        message: `${message}`
    }
}

export const atLeastTwoWordsRule = (field, message) => {
    return {
        field: field,
        method: checkIfThereAreAtLeastTwoWords,
        validWhen: true,
        message: `${message}`
    }
}

export const notEmptyButContainsOnlyWhitespaces = (field, message) => {
    return {
        field: field,
        method: trimAllWhitespace,
        validWhen: false,
        message: message
    }
}

export const isValidEmailWhenNotEmpty = (field, message) => {
    return {
        field: field,
        method: validateEmail,
        validWhen: true,
        message: message
    }
}
export const isNumericRule =(field, message) => {
    return {
        field: field,
        method: validator.isNumeric,
        validWhen: true,
        message: message
    }
}

export const isStrictlyNumericRule = (field, message) => {
    return {
        field: field,
        method: validator.isNumeric,
        args: [{no_symbols: true}],
        validWhen: true,
        message: message
    }
}

export const isStrictlyNumericRuleNullable = (field, message) => {
    return {
        field: field,
        method: validateIfNotEmpty,
        args: [validator.isNumeric, {no_symbols: true}],
        validWhen: true,
        message: message
    }
}

export const isNullableAlphanumericRule = (field, message) => {
    return {
        field: field,
        method: validateIfNotEmpty,
        args: [validator.isAlphanumeric],
        validWhen: true,
        message: message
    }
}

export const isValidCreditCardNumber = (field, message, min, max) => {
    return {
        field: field,
        method: validator.isLength,
        args: [{ min: min, max: max }],
        validWhen: true,
        message: message
    }
}

export const isValidCcn = (field, message) => {
    return {
        field: field,
        method: isTrue,
        validWhen: true,
        message: message
    }
}
export const isValidCvc = (field, message) => {
    return {
        field: field,
        method: validator.isLength,
        args: [{ min: 3, max: 4 }],
        validWhen: true,
        message: message
    }
}

export const isValidMeasure = (field, message) => {
    return {
        field: field,
        method: validator.isFloat,
        args: [{min: 1, max: 999}],
        validWhen: true,
        message: message
    }
}

export const isValidWeight = (field, message) => {
    return {
        field: field,
        method: validator.isFloat,
        args: [{min: 1, max: 99}],
        validWhen: true,
        message: message
    }
}
export const isValidServiceLength = (field, message) => {
    return {
        field: field,
        method: validator.isLength,
        args: [{min: 1, max: 64}],
        validWhen: true,
        message: message
    }
}