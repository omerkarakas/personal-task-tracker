# personal-task-tracker

## Live demo

https://personel-tasktracker.netlify.app

---

## About

This app is a personal task tracker developed using **react.js** and **material-ui**.

User tasks stored in the local storage, so that previously entered tasks are displayed when the page loads again.

This website consumes the api https://task-priorities.herokuapp.com/ whose code is **[here](https://github.com/omerkarakas/personel-task-tracker-api)**

---

## How to run locally

1. Run the following command to install dependencies

```bash
npm install
```

2. Run the following command to run the project

```bash
npm start
```

Then the react app will run on http://localhost:3000 address.

---

## How to Tweak ?

This website consumes the api https://task-priorities.herokuapp.com/ whose code is [here](https://github.com/omerkarakas/personel-task-tracker-api)

### Want to change the priorities?

This app may run a local json-server to serve job priorities on http://localhost:5000/priorities address.

For this run the following command:

```bash
npm run server
```

Alter the line in the AppContext.js,

from this:

```js
const url = 'https://task-priorities.herokuapp.com';
```

to this:

```js
const url = 'http://localhost:5000/priorities';
```

and edit the file data/db.json
