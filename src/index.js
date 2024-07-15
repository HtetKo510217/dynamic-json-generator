import { faker } from '@faker-js/faker';

const { string, lorem, image, location, phone, internet, company } = faker;

function generateValue(type, params = {}) {
    const specialCases = {
        'uuid': () => string.uuid(),
        'title': () => lorem.words(5),
        'imageUrl': () => image.url(),
        'description': () => lorem.paragraph(),
        'address': () => location.streetAddress(),
        'street': () => location.street(),
        'suite': () => location.secondaryAddress(),
        'city': () => location.city(),
        'zipcode': () => location.zipCode(),
        'lat': () => location.latitude(),
        'lng': () => location.longitude(),
        'phone': () => phone.number(),
        'website': () => internet.url(),
        'companyName': () => company.name(),
        'body': () => lorem.paragraph(),
        'message': () => lorem.paragraph(),
    };

    if (specialCases[type]) {
        return specialCases[type]();
    }

    const [module, method] = type.split('.');

    if (faker[module] && typeof faker[module][method] === 'function') {
        try {
            return faker[module][method](params);
        } catch (error) {
            console.error(`Error generating value for ${type}: ${error.message}`);
            return null;
        }
    }

    return faker.lorem.word();
}

export function generateJson(template) {
    const result = {};

    for (const key in template) {
        const type = template[key];
        if (typeof type === 'object' && !Array.isArray(type)) {
            result[key] = generateJson(type); // Recursive call for nested objects
        } else {
            result[key] = generateValue(type);
        }
    }

    return result;
}

export function generateMultipleJson(template, count) {
    const results = [];
    for (let i = 0; i < count; i++) {
        results.push(generateJson(template));
    }
    return results;
}

