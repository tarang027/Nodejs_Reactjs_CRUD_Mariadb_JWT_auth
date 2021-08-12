# Nodejs - Reactjs CRUD in Mariadb and Authentication using JWT

A simple records system using Mariadb, Express.js, React.js, and Node.js Create, Read, Update, and Delete operations. REST API was implemented on the back-end. Ant design React was used for the UI.



## Instructions

*Make sure mariadb service is running.*

- The *config* folder contains a file named *server>config>config.json*. Before running locally, change the value of db as seen in the code below.
- And also you need to import file Node_mariadb_user_auth.sql in your Mariadb which is given in this repository(We recommend you to use HeidiSQL to import this file).<br>

```js
"development": {
    "username": "root",
    "password": "password",
    "database": "mern_stack_auth",
    "host": "127.0.0.1",
    "dialect": "mariadb"
  },
```

For the **back-end**, install the dependencies once via the terminal.
```bash
npm install
```

Run the *main server*. It listens on port 5000.
View it on the browser.

<br>

If you want to configure the **front-end**, go to *client*  folder via the terminal.

```bash
cd client
```

Install the dependencies required by React once.
```bash
npm install
```

The  *client>src>configaration>authAx.js*. Before running locally, change the value of db as seen in the code below.
```js
import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:5000/",
    headers: {
        authorization: `Bearer ${localStorage.getItem("jwt_access_token")}`,
    },
});
```

Run the *development server* for React. It listens on port 3000.
```bash
npm start
```

To make a production build, simply run on *react-src* folder via the terminal.
```bash
npm run build
```

It re-creates a folder named *public* on the root directory. This is where the production-ready front-end of the web application resides.


## Done

- [x] Create
- [x] Read
- [x] Update
- [x] Delete
- [x] Authentication using JWT on both Reactjs and Nodejs