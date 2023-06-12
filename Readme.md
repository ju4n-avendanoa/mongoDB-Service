# mongoDB-Service

mongoAPI is a RESTful API developed in Node.js and Express, which connects to a MongoDB database to perform CRUD (Create, Read, Update, Delete) operations on a specific collection.

## Prerequisites

Make sure you have the following installed before proceeding:

- Node.js (version 10 or higher)
- MongoDB (local or remote instance)

## Installation

Follow these steps to set up and run the API:

1. Clone this repository to your local machine:

2. Navigate to the project directory:
 
3. Install the necessary dependencies:

4. Configure the MongoDB connection. Open the `config.js` file and adjust the values according to your setup:

```javascript
module.exports = {
  mongoURI: 'mongodb://localhost:27017/my-database',
};
```

## Endpoints

The API should now be up and running at `http://localhost:3000`. You can test it using an HTTP client tool like Postman.

The following endpoints are available in the API:

- `GET /api/users`: Get all documents from the collection.
- `GET /api/users/:id`: Get a specific document by its ID.
- `POST /api/users`: Create a new document.
- `PUT /api/users/:id`: Update an existing document by its ID.
- `DELETE /api/users/:id`: Delete a specific document by its ID.


## Testing

The API includes both unit and integration tests using Vitest. To run the tests, use the following command:

```javascript
npm test
```
    
Make sure to update the necessary configurations in the test files according to your setup.


## Contributing

Contributions are welcome! If you want to improve this project, feel free to open an [issue](https://github.com/ju4n-avendanoa/mongoAPI/issues) or submit a pull request. Please follow best development practices and provide a clear description of the proposed changes.
