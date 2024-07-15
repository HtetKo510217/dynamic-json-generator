export interface JsonTemplate {
    [key: string]: string | JsonTemplate;
}

export function generateJson(template: JsonTemplate): Record<string, any>;
export function generateMultipleJson(template: JsonTemplate, count: number): Record<string, any>[];