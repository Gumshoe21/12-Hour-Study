const useValidation = () => {
  // This object will contain our errorMessages Sets.
  let errors = {};

  const configureValidations = (validationConfig) => {
    for (let setting of Object.values(validationConfig)) {
      let { name, validationRules, errorMessages } = setting;
      for (let rule of validationRules) {
        let { errorMessage, isValid } = rule;
        // If the errorMessages Set doesn't already have the errorMessage in it AND the rule isn't valid, then add the errorMessage to the errorMessages Set.
        if (!errorMessages.has(errorMessage) && !isValid) {
          errorMessages.add(errorMessage);
          // ...otherwise, if the rule IS valid, then remove the errorMessage from the errorMessages Set regardless of whether the errorMessages Set already has that errorMessage.
        } else if (isValid) {
          errorMessages.delete(errorMessage);
        }
        // Set the errors object to properties with the name of the setting from our validationConfig and values equal to the respective errorMessages Set. Using the spread operator here to keep the object up to date.
        errors = {
          ...errors,
          [name]: errorMessages
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
      if (error.size > 0) {
        formIsValid = true;
      }
    }
    return formIsValid;
  };

  return { requiredRule, configureValidations, isFormValid, errors };
};

function createValidationRule(errorMessage, isValid) {
  return {
    errorMessage,
    isValid
  };
}

export function requiredRule(inputName, inputValue) {
  return createValidationRule(
    `${inputName} cannot be blank.`,
    inputValue.split('').length !== 0
  );
}

export function minLengthRule(inputName, inputValue, minChars) {
  return createValidationRule(
    `${inputName} must be at least ${minChars} characters long.`,
    inputValue.split('').length >= minChars
  );
}
export default useValidation;
