export class NumberFormatter {
    static formatWithCommas(value: number, locale: string = 'en-US'): string {
        return value.toLocaleString(locale);
    }

    static formatWithCustomOptions(value: number, locale: string = 'en-US', options: Intl.NumberFormatOptions = {}): string {
        return value.toLocaleString(locale, options);
    }
}