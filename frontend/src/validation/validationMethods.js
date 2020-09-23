import validator from "validator";

export const checkIfThereAreAtLeastTwoWords = value => {
  return value.trim().indexOf(" ") !== -1;
};

export const validateEmail = value => {
  if (value.trim().length === 0) return true;
  else return validator.isEmail(value);
};

export const hasOnlyLettersAndNumbers = value => {
  value = value.replace(/\s/g, "");

  return validator.isAlphanumeric(value);
};

export const hasOnlyLetters = value => {
  value = value.replace(/\s/g, "");
  value = value.replace('\'', '');
  return validator.isAlpha(value);
};

export const checkIfPasswordsMatch = (value, state) => {
    return value === state.password;
}

export const checkPasswordValidity = (value) => {
    return validator.isLength(value, {min: 8})
}

export const trimAndCapitalizeTheString = string => {
  //Readies the string for separation, trims and deletes extra blank characters
  const forUppercase = string
    .trim()
    .replace(/\s\s+/g, " ")
    .split(" ");

  let capitalised = [];

  //Stores each word into the capitalised array and Uppercases the first letter of each word
  for (let i = 0; i < forUppercase.length; i++) {
    capitalised.push(
      `${forUppercase[i].charAt(0).toUpperCase()}${forUppercase[i].slice(1)}`
    );
  }

  let finalString = "";

  //maps the capitalised array and stores everything into string
  capitalised.forEach(token => {
    finalString += token + " ";
  });

  //Removes the extra blank space from above function
  finalString = finalString.substring(0, finalString.length - 1);

  return finalString;
};

export const trimAllWhitespace = value => {
  let trimmedValue = value.trim();
  trimmedValue = trimmedValue.replace(/\s\s+/g, " ");
  return trimmedValue;
};

export const validateIfNotEmpty = (value, validateMethod) => {
  if (value.trim().length === 0) return true;
  else {
    return validateMethod(value);
  }
};

export const containsWhitespaceOnly = value => {
  return !value.replace(/\s/g, "").length;
};

export const capitaliseMomentString = value => {
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
};

export const formatStringToFirstCapitalOnly = value => {
  return value.charAt(0).toUpperCase() + value.substring(1).toLowerCase();
};

export const isTrue = value => {
  return value === 'true';
}

export const commaSeparatedNumber = (value, currency) => {  
  return value.toFixed(currency === "RSD" ? 2 : 0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

export const isBase64 = (value) => {
  return validator.isBase64(value);
}

export const checkArrayLength = (array) => {
    return array.length ? true : false;
}