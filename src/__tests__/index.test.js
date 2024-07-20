import { generateJson, generateMultipleJson } from '../index';

test('generateJson returns correct format for English', () => {
  const template = {
    id: 'uuid',
    name: 'fullName',
    username: 'internet.userName',
    email: 'internet.email',
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
      catchPhrase: 'company.catchPhrase',
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
});

test('generateJson returns correct format for Burmese', () => {
  const template = {
    id: 'uuid',
    name: 'fullName',
    title: 'title',
    description: 'description',
    address: {
      street: 'street',
      city: 'city',
    },
    message: 'message'
  };

  const result = generateJson(template, 'mm');

  expect(result).toHaveProperty('id');
  expect(result).toHaveProperty('name');
  expect(result).toHaveProperty('title');
  expect(result).toHaveProperty('description');
  expect(result.address).toHaveProperty('street');
  expect(result.address).toHaveProperty('city');
  expect(result).toHaveProperty('message');

  // Check if the generated values are in Burmese
  expect(result.name).toMatch(/[\u1000-\u109F]/);
  expect(result.title).toMatch(/[\u1000-\u109F]/);
  expect(result.description).toMatch(/[\u1000-\u109F]/);
  expect(result.message).toMatch(/[\u1000-\u109F]/);
});

test('generateMultipleJson returns correct number of items for English', () => {
  const template = {
    id: 'uuid',
    name: 'fullName',
    username: 'internet.userName',
    email: 'internet.email'
  };

  const results = generateMultipleJson(template, 20);

  expect(results.length).toBe(20);
});

test('generateMultipleJson returns correct number of items for Burmese', () => {
  const template = {
    id: 'uuid',
    name: 'fullName', // Updated to use 'fullName' for Burmese as well
    title: 'title',
    description: 'description'
  };

  const results = generateMultipleJson(template, 15, 'mm');

  expect(results.length).toBe(15);
  results.forEach(result => {
    expect(result.name).toMatch(/[\u1000-\u109F]/);
    expect(result.title).toMatch(/[\u1000-\u109F]/);
    expect(result.description).toMatch(/[\u1000-\u109F]/);
  });
});

// Uncomment this test if you want to ensure Burmese and English locales produce different results
test('Burmese and English locales produce different results', () => {
  const template = {
    name: 'fullName',
    description: 'description'
  };

  const englishResult = generateJson(template, 'en');
  const burmeseResult = generateJson(template, 'mm');

  expect(englishResult.name).not.toBe(burmeseResult.name);
  expect(englishResult.description).not.toBe(burmeseResult.description);

  // Check if Burmese result contains Burmese characters
  expect(burmeseResult.name).toMatch(/[\u1000-\u109F]/);
  expect(burmeseResult.description).toMatch(/[\u1000-\u109F]/);

  // Check if English result doesn't contain Burmese characters
  expect(englishResult.name).not.toMatch(/[\u1000-\u109F]/);
  expect(englishResult.description).not.toMatch(/[\u1000-\u109F]/);
});
