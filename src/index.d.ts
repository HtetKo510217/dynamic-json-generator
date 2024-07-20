export interface JsonTemplate {
    [key: string]: string | JsonTemplate;
}

export type Locale = 'en' | 'mm'

export function generateJson(template: JsonTemplate, locale?: Locale): Record<string, any>;
export function generateMultipleJson(template: JsonTemplate, count: number, locale?: Locale): Record<string, any>[];
