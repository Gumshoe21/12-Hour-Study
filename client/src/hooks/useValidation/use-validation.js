const useValidation = () => {
  // This object will eventually contain our errorMessages Sets.
  let errors = {};

  const configureValidations = (validationConfig) => {
    // Loops; destructuring for better code readability. Note that I used still used 'rule' when referring to isValid because it's easier to read that way.
    for (let setting of Object.values(validationConfig)) {
      let { name, validationRules, errorMessages } = setting;
      for (let rule of validationRules) {
        let { errorMessage } = rule;
        // If the errorMessages Set doesn't already have the errorMessage in it AND the rule isn't valid, then add the errorMessage to the errorMessages Set.
        if (!errorMessages.has(errorMessage) && !rule.isValid) {
          errorMessages.add(errorMessage);
          // ...otherwise, if the rule IS valid, then remove the errorMessage from the errorMessages Set regardless of whether the errorMessages Set already has that errorMessage.
        } else if (rule.isValid) {
          errorMessages.delete(errorMessage);
        }
        // Set the errors object to properties with the name of the setting from our validationConfig and values equal to the respective errorMessages Set. Using the spread operator here to keep the object up to date.
        errors = {
          ...errors,
          [name]: Array.from(errorMessages)
        };
      }
    }
    // This function returns the errors for later use when validation our form fields, as well as the overall form entirely.
    return errors;
  };

  // this function will determine that a form is valid if each of its form fields has no errors. If any of the form fields has even one error, 'formIsValid' will be false. Good for disabling a submit button.
  const isFormValid = (errorsObj) => {
    let formIsValid = false;
    for (let error of Object.values(errorsObj)) {
      if (error.length > 0) {
        formIsValid = true;
      }
    }
    return formIsValid;
  };

  return { requiredRule, configureValidations, isFormValid, errors };
};
const capitalize = (str) => {
  return str[0].toUpperCase() + str.slice(1);
};

function createValidationRule(errorMessage, isValid) {
  return {
    errorMessage,
    isValid
  };
}

export function requiredRule(inputName, inputValue) {
  return createValidationRule(
    `${capitalize(inputName)} cannot be blank.`,
    inputValue.split('').length !== 0
  );
}

export function minLengthRule(inputName, inputValue, minChars) {
  return createValidationRule(
    `${capitalize(inputName)} must be at least ${minChars} characters long.`,
    inputValue.split('').length >= minChars
  );
}

export const passwordMatchRule = (inputName, password, passwordConfirm) => {
  return createValidationRule(
    `Password Confirmation must match password`,
    password === passwordConfirm
  );
};
export default useValidation;
