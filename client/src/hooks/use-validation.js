import React, { useState } from 'react';
const useValidation = () => {
  const returnErrorMesssages = () => {};
  let errors = {};
  const isFormValid = (ruleSet) => {
    for (let state of Object.values(ruleSet)) {
      for (let rule of state.rules) {
        if (!state['errMsg'].has(rule.errMsg) && !rule.isValid) {
          state.errMsg.add(rule.errMsg);
        } else if (rule.isValid) {
          state.errMsg.delete(rule.errMsg);
        }
      }
      errors = {
        [state.name]: state.errMsg
      };
    }
    return errors;
  };

  return { requiredRule, isFormValid, errors };
};
export function createValidationRule(ruleName, errMsg, isValid) {
  return {
    ruleName,
    errMsg,
    isValid
  };
}

export function requiredRule(inputName, inputValue) {
  return createValidationRule(
    'required',
    `${inputName} cannot be blank.`,
    inputValue.split('').length !== 0
  );
}

export function minLengthRule(inputName, inputValue, minChars) {
  return createValidationRule(
    'minLength',
    `${inputName} must be at least ${minChars} characters long.`,
    inputValue.split('').length >= minChars
  );
}
export default useValidation;
