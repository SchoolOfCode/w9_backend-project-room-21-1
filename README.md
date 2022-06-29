Back end installation


<p style="color:red"> This may be unfinished or irrelevant for newer features. Please refer to the readme on the w9_frontend-project-room-21-1 for regularly updated documentation </p>


# .Class server

This is designed to be the backend to power the frontend: w9_frontend-project-room-22-1.

## Installation
In a code editor, navigate to a directory where [Node.js](https://nodejs.dev/learn/how-to-install-nodejs) and [Node Package Manager](https://docs.npmjs.com/about-npm) (npm) are enabled.

Then, in a bash or similar console, do:
```
git clone https://github.com/SchoolOfCode/w9_backend-project-room-21-1.git
npm i
```

## Preparing the database
- Make a database in PostgreSQL and make a .env file to take the details.
- The server expects a `PGHOST`, `PGDATABASE`, `PGUSER`, `PGPORT`, `PGPASSWORD` and `PGURI`.  These are your database credentials: *host*, *database*, *port*, *password* and *URI* respectively in a Heroku database.
- We used Heroku - other databases may have different names for their credentials
- It should look like this:
```
PGHOST: "aString"
PGDATABASE: "aString1"
PGUSER: "aString2"
PGPORT: 9999
PGPASSWORD: "aLongString"
PGURI: "aReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyLongString"
```
- Then, in your bash console, do:
```
npm run createProfilesTable
npm run populateProfilesTable
``` 
- This will create and fill the table on the database with our starting data.

## Operating the server
- Enter `npm start` into the command line to get the server going.

You can now use your frontend app. 


