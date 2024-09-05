import { Faker, en, base } from '@faker-js/faker';
import { mm_locale } from './mm_locale.js';

const fakerEN = new Faker({ locale: [en, base] });
const fakerMM = new Faker({ locale: [mm_locale, en, base] });

const setLocale = (locale) => locale === 'mm' ? fakerMM : fakerEN;


function generateValue(type, params = {}, locale = 'en') {
  const faker = setLocale(locale);
  const { string, lorem, image, location, person } = faker;

  const specialCases = {
    'uuid': () => string.uuid(),
    'title': () => locale === 'mm' ? faker.helpers.arrayElement(mm_locale.lorem.titles) : lorem.sentence(),
    'image': () => image.url(),
    'avatar': () => image.avatar(),
    'description': () => locale === 'mm'
    ? faker.helpers.arrayElements(mm_locale.lorem.paragraphs, faker.number.int({ min: 1, max: 3 })).join(' ')
    : lorem.paragraph(),
    'body': () => locale === 'mm'
    ? faker.helpers.arrayElements(mm_locale.lorem.paragraphs, faker.number.int({ min: 1, max: 3 })).join(' ')
    : lorem.paragraph(),
    'message': () => locale === 'mm'
    ? faker.helpers.arrayElements(mm_locale.lorem.paragraphs, faker.number.int({ min: 1, max: 3 })).join(' ')
    : lorem.paragraph(),
    'firstName': () => locale === 'mm' ? faker.helpers.arrayElement(mm_locale.name.firstName) : person.firstName(),
    'lastName': () => locale === 'mm' ? faker.helpers.arrayElement(mm_locale.name.lastName) : person.lastName(),
    'fullName': () => locale === 'mm' ? faker.helpers.arrayElement(mm_locale.name.firstName) +'' + faker.helpers.arrayElement(mm_locale.name.lastName) : person.fullName(),
    'street': () => locale === 'mm' && mm_locale.location.street 
    ? faker.helpers.arrayElement(mm_locale.location.street) 
    : location.street(),
    'city': () => locale === 'mm' && mm_locale.location.city
    ? faker.helpers.arrayElement(mm_locale.location.city)
    : location.city(),
    'gender': () => person.sexType(),
    'phone': () => string.numeric({ length: 10 }),
    'date' : () =>faker.date.between({ from: '2000-01-01', to: Date.now() }).toISOString().split('T')[0],
    'weekday': () => faker.date.weekday(),
    'month': () => faker.date.month(),
    'boolean' : () => faker.datatype.boolean(),
    'number' : () => faker.number.int({ min: 1, max: 100 }),
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

  return lorem.word();
}

export function generateJson(template, locale = 'en') {
  const result = {};
  for (const key in template) {
    const type = template[key];
    if (typeof type === 'object' && !Array.isArray(type)) {
      result[key] = generateJson(type, locale);
    } else {
      result[key] = generateValue(type, {}, locale);
    }
  }
  return result;
}

export function generateMultipleJson(template, count, locale = 'en') {
  const results = [];
  for (let i = 0; i < count; i++) {
    results.push(generateJson(template, locale));
  }
  return results;
}
