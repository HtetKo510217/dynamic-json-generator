interface JsonTemplate {
    [key: string]: string | JsonTemplate;
}

type Locale = 'en' | 'mm'

declare function generateJson(template: JsonTemplate, locale?: Locale): Record<string, any>;
declare function generateMultipleJson(template: JsonTemplate, count: number, locale?: Locale): Record<string, any>[];

export { type JsonTemplate, type Locale, generateJson, generateMultipleJson };
