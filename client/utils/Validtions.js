import validator from "validator";
var passwordValidator = require("password-validator");
const PasswordSchema = new passwordValidator();
const fullNameSchema = new passwordValidator();
const ZipCodeSchema = new passwordValidator();

// Add properties to it
PasswordSchema.is()
  .min(8) // Minimum length 8
  .is()
  .max(100) // Maximum length 100
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits() // Must have at least 2 digits
  .has()
  .symbols() // Must have symbols
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]); // Blacklist these values
fullNameSchema.has().letters();
ZipCodeSchema.has().digits();
class ValidateFields {
  validateFullName(FullName) {
    if (validator.isEmpty(FullName)) {
      return "Full Name Is Required";
    } else if (!validator.isLength(FullName, { min: 2 })) {
      return "Full Name Must Be Minimum 2 Characters";
    } else if (!validator.isLength(FullName, { max: 50 })) {
      return "Full Name Must Be Maximum 50 Characters";
    } else if (!fullNameSchema.validate(FullName)) {
      return "Only Alphabets Are Allowed";
    }
    return false;
  }
  validateEmail(email) {
    if (validator.isEmpty(email)) {
      return "Email Is Rquired";
    } else if (!validator.isEmail(email)) {
      return "Invalid Email";
    }
    return false;
  }

  validatePassword(password) {
    if (validator.isEmpty(password)) {
      return "Password Is Required";
    }
    // else if (!validator.isLength(password, { min: 8 })) {
    //   return "Password should be minimum 8 characters";
    // }
    // else if (!PasswordSchema.validate(password)) {
    //   return "Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters";
    // }
    return false;
  }
  RegistervalidatePassword(password) {
    // console.log(PasswordSchema.validate(password));
    if (validator.isEmpty(password)) {
      return "Password Is Required";
    }
    // else if (!validator.isLength(password, { min: 8 })) {
    //   return "Password should be minimum 8 characters";
    // }
    else if (!PasswordSchema.validate(password)) {
      return "Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters With Special Characters";
    }
    return false;
  }
  ConfirmPassWord(password, confirmPassword) {
    if (validator.isEmpty(confirmPassword)) {
      return "Confirm Password Is Required";
    } else if (password !== confirmPassword) {
      return "Password does not match ";
    }
    return false;
  }
  validatePhoneNumber(phoneNumber) {
    if (validator.isEmpty(phoneNumber)) {
      return "Phone Number is Required";
    }
    return false;
  }
  validateValiDateCheckBox(ValiDateCheckBox) {
    if (ValiDateCheckBox !== true) {
      return "AcceptTermsAndCondition";
    }
    return false;
  }
  validateAddressName(AddressName) {
    if (validator.isEmpty(AddressName)) {
      return "AdressNameRequired";
    } else if (!validator.isLength(AddressName, { min: 2 })) {
      return "AdressNameMinimumLength";
    } else if (!fullNameSchema.validate(AddressName)) {
      return "OnlyAlphabets";
    }
    // else if (!validator.isLength(AddressName, { max: 50 })) {
    //   return "FullNameMaximumLength";
    // }
    // else if (!fullNameSchema.validate(AddressName)) {
    //   return "OnlyAlphabets";
    // }
    return false;
  }
  validateContactUsMessage(CtMessage) {
    if (validator.isEmpty(CtMessage)) {
      return "MessageIsrequired";
    }
    // else if (!validator.isLength(CtMessage, { min: 6 })) {
    //   return "MessageLength";
    // }

    return false;
  }
  validateContactUsSubject(CtSubject) {
    if (validator.isEmpty(CtSubject)) {
      return "SubjectIsrequired";
    }

    return false;
  }

  validateAddress(Address) {
    if (validator.isEmpty(Address)) {
      return "AdressLineRequired";
    } else if (!validator.isLength(Address, { min: 2 })) {
      return "AdressLineMinimumLength";
    }
    // else if (!validator.isLength(Address, { max: 50 })) {
    //   return "FullNameMaximumLength";
    // }
    // else if (!fullNameSchema.validate(Address)) {
    //   return "OnlyAlphabets";
    // }
    return false;
  }
  validateCity(CityName) {
    if (validator.isEmpty(CityName)) {
      return "CityRequired";
    }
    return false;
  }
  validateState(State) {
    if (validator.isEmpty(State)) {
      return "StateRequired";
    }
    return false;
  }
  validateZipCode(ZipCode) {
    if (validator.isEmpty(ZipCode)) {
      return "ZipCodeRequired";
    } else if (!validator.isLength(ZipCode, { min: 6 })) {
      return "InvalidZipCode";
    } else if (!validator.isLength(ZipCode, { max: 6 })) {
      return "InvalidZipCode";
    } else if (!ZipCodeSchema.validate(ZipCode)) {
      return "InvalidZipCode";
    }
    return false;
  }
  validateAddressType(AddressType) {
    if (AddressType === "") {
      return "AddressTypeRequired";
    }
    return false;
  }
}

const validateFields = new ValidateFields();

export { validateFields };
