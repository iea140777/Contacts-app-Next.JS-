# General description

This is a test task application created with Next.JS + Typescript, Redux Toolkit + Redux Toolkit Query, AntDesign was used for UI.
This project was bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Database is mocked with data in `mockedBbData.json` file and helper functions to get/set data.

Node.js version: `14.17.0`

Application consists of four pages - Home, Login, Contacts, About.

To authorize successfully enter login and password for one of the users from mockedBbData.json file (e.g. email: `user1@user.ru`, password: `1`)

Personal contacts data is available only for authorized user (can create, edit,  delete contacts, search contacts).

## To start this app in dev mode:

- clone this repo
- In the project directory run:
  - run `npm i` to install project dependencies
  - run `npm run dev` to start application in development mode

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

