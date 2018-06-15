# Airline Reservation: Service with Authentication at all levels (Front-end, Back-end and Database)

## Aim
Building a project based on an EER (Enhanced Entity-Relationship). The goal is to learn to build project base on someone's idea, which is much more difficult than with ours.

Front-end and Back-end could be deployed on different servers, independently. We could use "**load balancing**" easily on server-side...

> This project is one of about 30-35 others building by mixing:
>   * Front-End: **jQuery**, **ReactJS**, **React-Redux**, **Angular** (2-5), **Ionic3**, **View.js**
>   * Back-End: 5 APIs (2 with **MongoDB** and 3 with **SQL**)
> 
> These are **3-tier Architecture** projects. Everything is started (almost) from scratch (the diagrams for the databases come from the Internet - with link to to source on each picture - with errors which were fixed)
>
> The **Front-End** are NOT the most beautiful because not much work on it. The goal is to use very different technologies on very different purposes.

---------------

## Technologies
> * **Security**: **JWT-simple**, **bcrypt-nodejs**, **passport** (**passport-jwt**, **passport-local**)
> * **Front End**: **React-Redux**
> * **Back End**: **Express/Node.js** + **Sequelize** (ORM)
> * **Database**: **mySQL**

---------------

## Enhanced Entity-Relationship

![alt text](assets/img/airlinebooking.jpg)

---------------

## User Interface (data is generated randomly: fake address, fake date, etc.)

### Sign In/Up
![alt text](assets/img/signInOrUp.jpg)

### List All Bookings
![alt text](assets/img/bookingList.jpg)

### Add New Passenger
![alt text](assets/img/addPassenger.jpg)

### Make a New Reservation
![alt text](assets/img/newReservation.jpg)

---------------

## Execution
### You have to create a file "**config.js**" (server/config.js) to contain configuration's parameters that we want to keep secret, for now, we need

```
module.exports = {
    secret: XXXXXXXXXXXXXXXXXX,    
    db_pwd: YYYYYYYYYYYYYYYYYY
};

// "secret" is the "secret" to create the "TOKEN"
// "db_pwd" is the password for your database (that you created) 
```

> The project is build as a 3-tier architecture (fullstack), and the three parts was built to be ready to be put on different machines (which could be in different continents). So, we need to run 3 parts independently, in order: **database**, then **server** then **user interface**.
>
> 1 - You need to create your database with the name '**airline_reservation**' (enter the password of **YOUR** database. Instruction in this file [here](https://github.com/DinhLeGaulois2/sql_react_redux_airline_reservation/blob/master/server/models/index.js)).
>
> 2 - Open a terminal, and execute (in the folder "**server**"): **npm install** (to install **dependencies**). Then: **npm run dev** to start the server.
> 
> 3 - Open ANOTHER termimal, and execute (in the folder "**client**"): **npm install** (to install **dependencies**). Then: **npm run start** to start the **user interface**.
>
> 4 - Open your web browser (***Firefox***, ***Chrome***, etc.) then, enter: **localhost:3000**

---------------

## Configuration (VERY IMPORTANT)

At the project's root folder ([here](https://github.com/DinhLeGaulois2/sql_react_redux_airline_reservation/blob/master/server/index.js)), we have a file name "**index.js**", by the end, we have:

![alt text](assets/img/server_config.jpg)

It's very important to follow the instruction, otherwise, you could have very disappointed surprises ...

---------------

## Author
* Dinh HUYNH - All Rights Reserved!
* dinh.hu19@yahoo.com