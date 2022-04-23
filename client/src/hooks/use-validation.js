import React, { useState } from 'react';
const useValidation = () => {
  const returnErrorMesssages = () => {};
  let errors = {};
  const isFormValid = (config) => {
    for (let setting of Object.values(config)) {
      for (let rule of setting.validationRules) {
        if (!setting.errMsg.has(rule.errMsg) && !rule.isValid) {
          setting.errMsg.add(rule.errMsg);
        } else if (rule.isValid) {
          setting.errMsg.delete(rule.errMsg);
        }
        errors = {
          ...errors,
          [setting.name]: setting.errMsg
        };
      }
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
