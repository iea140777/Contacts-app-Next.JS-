# General description

This is a test task application created with Next.JS + Typescript, Redux Toolkit + Redux Toolkit Query, AntDesign was used for UI.
This project was bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

[JSON server](https://github.com/typicode/json-server) is used with mocked data in `db.json` file.

Node.js version: `14.17.0`

Application consists of two pages - Home and Contacts.

On Home page user can login (enetering email and password), and if login is successfull, link to Contacts page is available.
Implementation of authorization is primitive, without using tokens, only checking user login/password and setting isAuthorized flag.
To authorize successfully enter login and password for one of the users from db.json file (e.g. email: `user1@user.ru`, password: `1`)

On Contacts page user can see his/her contacts list, can create, edit or delete contacts, search contacts.

# To start this app in dev mode:

- clone this repo
- In the project directory run:
  - run `npm i` to install project dependencies
  - run `npm run server` to start JSON server
  - run `npm run dev` to start application in development mode

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

