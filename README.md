# E-Commerce Back End

This is the back-end of an E-Commerce application built using Express.js API and Sequelize as the ORM (Object-Relational Mapping) library. The application uses MySQL2 and Sequelize to connect to a MySQL database. The database itself contains tables for products, categories, tags, and product tags. The application creates the database from the command line by entering `mysql -u root -p` and then entering the password. The database is then created by entering `source ./db/schema.sql`. The application then seeds the database by entering `node ./seeds/index.js`. The application is invoked by entering `npm start` in the command line. The user can then test the API routes using Insomnia.

## Table of Contents
* [Instalation](#instalation)
* [Usage](#usage)
* [License](#license)
* [Walkthrough Video](#walkthrough-video)
## Instalation
To get started with the project, follow these steps: 
1. Clone the repository
2. Install the dependencies 
3. Create the database 
4. Seed the database
5. Start the server

## Usage
The application will be invoked by using the following command: 
```bash
npm start
```

To test the API routes, you can use Insomnia as demostrated in the walkthrough video. 

## License
This project is licensed under the MIT license.

## Walkthrough Video
[Watch the video](https://watch.screencastify.com/v/RnpUyljb6R7Lk02OWjrT)


