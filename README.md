## Prerequisites

Create an .env file inside root project and add the following const to the file :

```
MONGO_ROOT_USERNAME ## root username for your mongo container ##
MONGO_ROOT_PASSWORD ## password for your mongo container ##
MONGO_APP_USERNAME ## app username to connect to the database ##
MONGO_APP_PASSWORD ## app password to connect to the database ##
MONGO_DATABASE ## database name ##
DATABASE_URI_DEVELOPMENT ## should look like this without const names : mongodb://MONGO_APP_USERNAME:MONGO_APP_PASSWORD@todoapp-mongodb-container:27017/MONGO_DATABASE?authSource=MONGO_DATABASE ##
DATABASE_URI_STAGING ## mongodb+srv://<USER>:<PASSWORD>@<CLUSTERURL>/<DATABASE>?retryWrites=true&w=majority&appName=<CLUSTERNAME> ##
DATABASE_URI_PRODUCTION ## mongodb+srv://<USER>:<PASSWORD>@<CLUSTERURL>/<DATABASE>?retryWrites=true&w=majority&appName=<CLUSTERNAME> ##
```

To run the project :

```
docker compose up
```

Go inside todoapp-container to start nextjs :

To build the project locally with staging or production environment use :

```
npm run build:staging
npm run build:production
```

To deploy in the cloud you need to set up the ENV_TARGET environment variable. ("staging" or "production")

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
