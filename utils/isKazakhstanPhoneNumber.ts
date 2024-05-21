export default function (number: string): boolean {
    const kazakhstanRegex: RegExp = /^\+7\d{10}$|^8\d{10}$/;
    
    return kazakhstanRegex.test(number);
}