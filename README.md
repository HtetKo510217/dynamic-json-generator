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

const useTemplate = {
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

const postTemplate = {
    id: 'uuid',
    title: 'title',
    body: 'body',
    userId: 'uuid',
    image: 'imageUrl', // or 'image.url' like @faker-js/faker
};

// Generate a single JSON object
const singleJson = generateJson(useTemplate);
console.log(singleJson);

// Generate multiple JSON objects
const multipleJson = generateMultipleJson(useTemplate, 20);
console.log(multipleJson);
```

## Functions
generateJson(template)
Generates a single JSON object based on the provided template.

template: An object where keys are field names and values are Faker data types (e.g., 'uuid', 'name', 'email').
Returns an object with generated fake data.

generateMultipleJson(template, count)
Generates multiple JSON objects based on the provided template.

template: An object where keys are field names and values are Faker data types (e.g., 'uuid', 'name', 'email').
count: The number of JSON objects to generate.
Returns an array of objects with generated fake data.

## Templates
You can create nested templates to generate complex JSON structures. The following Faker data types are supported:

uuid
name
username
email
title
imageUrl
description
address
street
suite
city
zipcode
lat
lng
phone
website
companyName
catchPhrase
bs
body
message
...and more from @faker-js/faker
License
This project is licensed under the ISC License.


## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any bugs or improvements.

## Author

- [@htetko510217](https://www.github.com/htetko510217)

