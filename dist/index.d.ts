interface JsonTemplate {
    [key: string]: string | JsonTemplate;
}

declare function generateJson(template: JsonTemplate): Record<string, any>;
declare function generateMultipleJson(template: JsonTemplate, count: number): Record<string, any>[];

export { type JsonTemplate, generateJson, generateMultipleJson };
