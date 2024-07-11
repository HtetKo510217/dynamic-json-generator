const { faker } = require('@faker-js/faker');

function generateValue(type) {
    switch (type) {
        case 'uuid': return faker.string.uuid();
        case 'name': return faker.person.firstName();
        case 'username': return faker.internet.userName();
        case 'email': return faker.internet.email();
        case 'title': return faker.lorem.words(5);
        case 'imageUrl': return faker.image.url();
        case 'description': return faker.lorem.paragraph();
        case 'address': return faker.location.streetAddress();
        case 'street': return faker.location.streetName();
        case 'suite': return faker.location.secondaryAddress();
        case 'city': return faker.location.city();
        case 'zipcode': return faker.location.zipCode();
        case 'lat': return faker.location.latitude();
        case 'lng': return faker.location.longitude();
        case 'phone': return faker.phone.number();
        case 'website': return faker.internet.url();
        case 'companyName': return faker.company.name();
        case 'catchPhrase': return faker.company.catchPhrase();
        case 'bs': return faker.company.bs();
        case 'body': return faker.lorem.paragraph();
        case 'message': return faker.lorem.paragraph();
        default: return faker.lorem.word();
    }
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
