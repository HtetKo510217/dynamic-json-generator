# dynamic-json-generator

`dynamic-json-generator` is an npm package that allows front-end developers to easily generate dynamic, fake JSON data for testing purposes. The package uses `@faker-js/faker` to provide realistic data for a variety of common use cases.

## Installation

Install the package via npm:

```bash
npm install dynamic-json-generator
```

## Usage

Import the package in your project and use the generateJson and generateMultipleJson functions to create fake JSON data based on a given template.

## Example

```javascript

// Import CommonJS (require)
const { generateJson, generateMultipleJson } = require('dynamic-json-generator');

// Import ES Modules (import)
import { generateJson, generateMultipleJson } from 'dynamic-json-generator';

// Define a template
const userTemplate = {
    id: 'uuid',
    name: 'fullName',
    address: {
        street: 'street',
        city: 'city',
    },
};

const postTemplate = {
    id: 'uuid',
    title: 'title',
    body: 'body',
    userId: 'uuid',
    image: 'imageUrl', // or 'image.url' like @faker-js/faker
};

// Generate a single JSON object (English locale)
const singleJsonEn = generateJson(userTemplate);
console.log(singleJsonEn);

// Generate multiple JSON objects (English locale)
const multipleJsonEn = generateMultipleJson(userTemplate, 20);
console.log(multipleJsonEn);

// Generate a single JSON object (Burmese locale)
const singleJsonMm = generateJson(userTemplate, 'mm');
console.log(singleJsonMm);

// Generate multiple JSON objects (Burmese locale)
const multipleJsonMm = generateMultipleJson(userTemplate, 20, 'mm');
console.log(multipleJsonMm);

```

## Functions

# generateJson(template, locale)

 Generates a single JSON object based on the provided template.

- template: An object where keys are field names and values are Faker data types (e.g., 'uuid', 'name', 'email').
- locale (optional): The locale to use for generating data. Can be 'en' for English (default) or 'mm' for Burmese.
- Returns an object with generated fake data.

## generateMultipleJson(template, count, locale)

Generates multiple JSON objects based on the provided template.

- template: An object where keys are field names and values are Faker data types (e.g., 'uuid', 'name', 'email').
- count: The number of JSON objects to generate.
- locale (optional): The locale to use for generating data. Can be 'en' for English (default) or 'mm' for Burmese.
- Returns an array of objects with generated fake data.


## Templates
You can create nested templates to generate complex JSON structures. The following Faker data types are supported:

## Common Types (Both English and Burmese)


- uuid
- title
- imageUrl
- description
- body
- message
- fullName
- street
- city

## Other Types directly from @faker-js/faker (English only)

- person.jobTitle
- date.past
- lorem.sentence
- image.url
- image.avatar
- other types from @faker-js/faker

You can create other types as needed.

## Localization

The package supports two locales:

- 'en': English (default)
- 'mm': Burmese

To generate data in Burmese, pass 'mm' as the locale parameter to generateJson or generateMultipleJson.

## License

This project is licensed under the ISC License.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any bugs or improvements.

## Author

- [@htetko510217](https://www.github.com/htetko510217)

