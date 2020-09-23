import validator from 'validator';

class FormValidator {

    constructor(validations) {
        //Filters out all non valid rules
        const checkedValidations = validations.filter(validation => {return validation !== '' || validation})

        //array of rules specific to a form
        this.validations = checkedValidations;
    }

    validate(state) {

        //start out assuming valid
        let validation = this.valid();

        
        this.validations.forEach(rule => {

            if (!validation[rule.field].isInvalid) {

                //determine the field value, the method to invoke and
                //optional args from the rule definition
                const fieldValue = state[rule.field].toString();
                const args = rule.args || [];
                const validationMethod = typeof rule.method === 'string' ?
                    validator[rule.method] :
                    rule.method

                //call the validationMethod with the current field value
                //as the first argument, any additional arguments, and the whole
                //state as a final argument. If the result doesn't match the rule.validWhen property,
                //then modify the validation object for the field and set the isValid field to false

                if (validationMethod(fieldValue, ...args, state) !== rule.validWhen) {

                    validation[rule.field] = {
                        isInvalid: true,
                        message: rule.message
                    }
                    validation.isValid = false;
                }
            }
        });

        return validation;
    }

    valid() {
        const validation = {}

        this.validations.map(rule => (
            validation[rule.field] = { isInvalid: false, message: '' }
        ));

        return { isValid: true, ...validation };
    }

}

export default FormValidator;