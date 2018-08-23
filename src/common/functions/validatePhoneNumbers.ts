/**
 * SSOT regarding phone number formatting
 * @param input
 */
export function validateMainNumber(input: string): boolean {
    const re = /[-. (]*(\d{2})[-. )]*(\d{2})[-. ]*(\d{2})(?: *x(\d+))?\s*$/;
    const bCorrectPhoneFormat: boolean = re.test(String(input).toLowerCase());
    return bCorrectPhoneFormat;
}

export function validateCountryCode(input: string): boolean {
    const re = /(?: \+? (\d{ 1, 3 }))?/;
    const bCorrectPhoneFormat: boolean = re.test(String(input).toLowerCase());
    return bCorrectPhoneFormat;
}
