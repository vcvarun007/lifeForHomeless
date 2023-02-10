# SIT725 Project LifeForHomeless

Author: Aman Das(s222418899), Jaskirat Singh(s222470295), Navin Raaj Manivannan(s222569633) and Varun Chaudhary (s222475653)

Introduction: "Life for the Homeless" is an initiative that will act as a bridge between the homeless people and the NGO or individuals who are willing to help them. Using the application, we could possibly locate the homeless people and try to give them their daily needs to survive. some of the ways are - most of the restaurant dispose the remaining food by end of the day where these could be collected from them and could help to feed a homeless person like this there could be numerus possibility where the application could branch in future

Prototype : https://app.uizard.io/p/a1cb2c60

The following libraries are imported and used in the code:

    express: A popular web framework for Node.js
    cors: A library for handling Cross-Origin Resource Sharing (CORS) requests
    mongoose: An Object Document Mapping (ODM) library for MongoDB
    body-parser: A library for parsing incoming request bodies
    socket.io: A library for real-time, bidirectional communication between the browser and server
    method-override: A library for overriding HTTP methods such as PUT and DELETE in a web application
    express-session: A library for handling user sessions in an Express application
    ejs: A templating engine for embedding JavaScript code in HTML templates

The application sets up several middlewares for handling incoming requests, including:

    Express static middleware for serving static files
    Body parser middleware for parsing JSON and URL-encoded request bodies
    Cors middleware for handling CORS requests
    Method override middleware for overriding HTTP methods
    The application also sets up two controllers: dashboardController and loginController. The purpose of these controllers is not clear
    from the code snippet.

The application connects to a MongoDB database using the MongoClient and mongoose libraries, and sets up a collection with the createColllection function. There are several endpoints defined for handling various operations such as creating a profile, updating food, displaying food, logging in/out, etc. The views for these operations are written using the EJS template engine.

Finally, the application sets up a socket connection using the socket.io library to handle real-time communication between the browser and server.

To start the application use NPM start - which runs the application in port 3000.

Page 1: Signup/Login Page
This page display a login/signup form with validationin each fields. New user can signup with their details once its successfully signed up you can login with the same credentials.

Page 2: Homepage
Dinamic display of the homepage based on the type of user logged in
Donor: If logged in as donor it displays the (Dashboard,Update food, food availability, logout)
Restaurant: If logged in as Restaurant it displays the (Dashboard,Update food, food availability, logout)
Volunteer: If logged in as Volunteer it displays the (Dashboard,CreateHPprofile, RestaurantavailabilityCheck, logout)
