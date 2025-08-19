### APP-REACT

## Description

A [React](https://react.dev/) microfrontend main application with authentication features,
and integrates with app-finance and app-users repo apps
. Developed in React + Typescript + Vite

## Prerequisites

Before starting, make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 18.x or higher)
- [pnpm](https://pnpm.io/) or [npm](https://www.npmjs.com/)
- [Vite](https://vitejs.dev/) (for frontend development, if applicable)

## Environment Variables

This project requires some environment variables to be configured.  
You can create a `.env` file in the root directory with the following content:

```env
VITE_API_URL=http://localhost:3000
VITE_USERS_URL=http://localhost:5001/assets/usersEntry.js
VITE_FINANCE_URL=http://localhost:5002/assets/financeEntry.js
```

## Project setup

```bash
$ pnpm install
```

## Compile and run

```bash
$ pnpm run serve
```

## Run tests

```bash
# unit tests
$ pnpm run test
```

