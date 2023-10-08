import DataElementValidator from "./DataElementValidator";

it('should validate mobile number', function () {
    let status = DataElementValidator.mobileValidator("9898989898");
    expect(status).toBe(true);
    status = DataElementValidator.mobileValidator("98989898");
    expect(status).toBe(false);
});

it('should validate mobile number with country code', function () {
    expect(DataElementValidator.mobileValidatorWithCountryCode("919898989898")).toBe(true);
    expect(DataElementValidator.mobileValidatorWithCountryCode("+919898989898")).toBe(true);
    expect(DataElementValidator.mobileValidatorWithCountryCode("9898989898")).toBe(true);
    expect(DataElementValidator.mobileValidatorWithCountryCode("98989898")).toBe(false);
});

it('should validate for both email and mobile', function () {
    let [valid, type] = DataElementValidator.validateEmailOrMobileWithCountryCode("9898989898");
    expect(valid).toBe(true);
    expect(type).toBe("Mobile");

    [valid, type] = DataElementValidator.validateEmailOrMobileWithCountryCode("foo@example.com");
    expect(valid).toBe(true);
    expect(type).toBe("Email");

    [valid, type] = DataElementValidator.validateEmailOrMobileWithCountryCode("foo");
    expect(valid).toBe(false);
    expect(type).toBe("None");
});
