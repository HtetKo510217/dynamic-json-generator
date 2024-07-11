const { faker } = require('@faker-js/faker');

function generateValue(type, params = {}) {
    const specialCases = {
        'uuid': () => faker.string.uuid(),
        'title': () => faker.lorem.words(5),
        'imageUrl': () => faker.image.url(),
        'description': () => faker.lorem.paragraph(),
        'address': () => faker.location.streetAddress(),
        'street': () => faker.location.street(),
        'suite': () => faker.location.secondaryAddress(),
        'city': () => faker.location.city(),
        'zipcode': () => faker.location.zipCode(),
        'lat': () => faker.location.latitude(),
        'lng': () => faker.location.longitude(),
        'phone': () => faker.phone.number(),
        'website': () => faker.internet.url(),
        'companyName': () => faker.company.name(),
        'body': () => faker.lorem.paragraph(),
        'message': () => faker.lorem.paragraph(),
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

function generateJson(template) {
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

function generateMultipleJson(template, count) {
    const results = [];
    for (let i = 0; i < count; i++) {
        results.push(generateJson(template));
    }
    return results;
}

module.exports = {
    generateJson,
    generateMultipleJson
};
