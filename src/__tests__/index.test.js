const { generateJson, generateMultipleJson } = require('../index');

test('generateJson returns correct format', () => {
    const template = {
        id: 'uuid',
        name: 'name',
        username: 'username',
        email: 'email',
        address: {
            street: 'street',
            suite: 'suite',
            city: 'city',
            zipcode: 'zipcode',
            geo: {
                lat: 'lat',
                lng: 'lng'
            }
        },
        phone: 'phone',
        website: 'website',
        company: {
            name: 'companyName',
            catchPhrase: 'catchPhrase',
            bs: 'bs'
        }
    };

    const result = generateJson(template);

    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('name');
    expect(result).toHaveProperty('username');
    expect(result).toHaveProperty('email');
    expect(result.address).toHaveProperty('street');
    expect(result.address).toHaveProperty('suite');
    expect(result.address).toHaveProperty('city');
    expect(result.address).toHaveProperty('zipcode');
    expect(result.address.geo).toHaveProperty('lat');
    expect(result.address.geo).toHaveProperty('lng');
    expect(result).toHaveProperty('phone');
    expect(result).toHaveProperty('website');
    expect(result.company).toHaveProperty('name');
    expect(result.company).toHaveProperty('catchPhrase');
    expect(result.company).toHaveProperty('bs');
});

test('generateMultipleJson returns correct number of items', () => {
    const template = {
        id: 'uuid',
        name: 'name',
        username: 'username',
        email: 'email'
    };

    const results = generateMultipleJson(template, 20);

    expect(results.length).toBe(20);
});
