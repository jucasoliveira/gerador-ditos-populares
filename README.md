<p align="center">
  <img src="https://user-images.githubusercontent.com/11979969/147932088-bcc0b57a-7275-4b35-91b0-452db99e35ba.png" />
</p>

## Introdution

This is an exercise , using a dummy idea to produce a POC of a feature.

Check it out the [Twitter bot](https://twitter.com/umditadopopular)

## What is this POC

A few days ago , I saw this tweet

<img src="https://user-images.githubusercontent.com/11979969/147813395-b7313064-9ad4-48b8-a829-febb95984f0b.jpeg" alt="drawing" width="300"/>

In this tweet , written in portuguese, is stated that a popular brazilian saying is easily created, following a set of rule:

1. The phrase must start with a animal name
2. Folowed by an adjective to the animal
3. Add the word no
4. Followed by a verb
5. And finished with an adverb of time, place or mood.


This set of rules got me thinking and I've created this application , with hardcoded data to generate completely random strings for each rule.

# **Getting Started with twitter bot**

Head over to Twitter engine directory

```bash
cd ./twitter-engine
```

You need to create a env file in order to generate the frases from `OpenAI`, and to create tweets:

```bash
touch .env
```


Add your key within the enviroment variable: `OPENAI_API_KEY`

Check how to create your own `OpenAI` key [here](https://beta.openai.com/docs/api-reference/introduction)

Add your `Twitter` keys as `TWITTER_CONSUMER_KEY` , `TWITTER_CONSUMER_SECRET`, `TWITTER_ACCESS_TOKEN_KEY` , `TWITTER_ACCESS_TOKEN_SECRET`

Check how to create your own keys [here](https://developer.twitter.com/en/docs/apps/app-management)

Your file should have the variables as follow:

```
OPENAI_API_KEY="your key"
TWITTER_CONSUMER_KEY="your key"
TWITTER_CONSUMER_SECRET="your key"
TWITTER_ACCESS_TOKEN_KEY="your key"
TWITTER_ACCESS_TOKEN_SECRET="your key"
```

## Instal packages

```bash 
yarn
```

or 

```bash
npm install
```

## Run the development server:

```bash
npm run dev
# or
yarn dev
```


There you have it, the application will generate the image at `./src/public/images` and try to send it to twitter according to `node-cron` schedule on `./src/app.ts`

# Getting Started with nextJs

Head over to Nextjs engine directory

```bash
cd ./frontend-engine
```

Install with `npm install` or `yarn`

You need to create a env file in order to generate the frases from `OpenAI`:

```bash 
touch .env.local
```

Add your key within the enviroment variable: `NEXT_PUBLIC_OPENAI_API_KEY`

Your file should have the variables as follow:

```
NEXT_PUBLIC_OPENAI_API_KEY="your key"
```

Check how to create your own `OpenAI` key [here](https://beta.openai.com/docs/api-reference/introduction)


## Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.


There you have it, the application will generate the image at `http://localhost:3000` 
## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
