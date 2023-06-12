# MongoAPI

This repository contains the necessary files to run the MongoAPI application in a Docker environment using Docker Compose.

## Prerequisites

Make sure you have Docker and Docker Compose installed on your machine before proceeding.

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Usage Instructions

Follow the steps below to run the MongoAPI application in your local environment:

1. Clone this repository to your machine:

   ```bash
   git clone https://github.com/ju4n-avendanoa/mongoAPI.git

2. Navigate to the repository directory:

   ```bash
   cd mongoAPI
  
3. Open the docker-compose.yml file and verify the configuration for the MongoDB service. You can modify the values of MONGO_INITDB_ROOT_USERNAME and MONGO_INITDB_ROOT_PASSWORD according to your needs.

4. Start the containers using Docker Compose:
  
   ```bash
   docker-compose up -d
  
 5. The MongoAPI application should now be up and running. You can access it via http://localhost:3000.

## Customization

If you want to make changes to the application configuration or the runtime environment, you can modify the Dockerfile and docker-compose.yml files according to your needs. Make sure you understand the implications of your changes before applying them.

## Contribution

If you want to contribute to this project, you can submit pull requests with your improvements or report issues in the Issues section.
