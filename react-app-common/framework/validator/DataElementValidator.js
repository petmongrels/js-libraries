import _ from 'lodash';
const emailRE = /\S+@\S+\.\S+/;
const mobileRE = /^\d{10}$/;
const mobileWithCountryCodeRE = /^(\+\d{1,3}[- ]?)?\d{10}$/;
const mobileWithCountryCodeWithoutPlusRE = /^(\d{1,3}[- ]?)?\d{10}$/;
const countryCodeRE = /^\+?\d+$/;

export default class DataElementValidator {
    static regexValidator(value, validatorRE) {
        if (!value) return false;
        return validatorRE.test(value);
    }

    static emailValidator(email) {
        return this.regexValidator(email, emailRE);
    }

    static mobileValidator(mobile) {
        return this.regexValidator(mobile, mobileRE);
    }

    static mobileValidatorWithCountryCode(mobileWithCountryCode) {
        let status = this.regexValidator(mobileWithCountryCode, mobileWithCountryCodeWithoutPlusRE);
        if (!status)
            status = this.regexValidator(mobileWithCountryCode, mobileWithCountryCodeRE);
        return status;
    }

    static countryCodeValidator(countryCode) {
        return this.regexValidator(countryCode, countryCodeRE);
    }

    static validateEmailOrMobileWithCountryCode(text) {
        let validEmail = DataElementValidator.emailValidator(text);
        let validMobile = DataElementValidator.mobileValidatorWithCountryCode(text);
        return [(validEmail || validMobile), validEmail ? "Email" : (validMobile ? "Mobile" : "None")];
    }

    static validatePasswords(password1, password2) {
        return !_.isEmpty(password1) && !_.isEmpty(password2) && password1 === password2 && password1.length >= 8;
    }
}
