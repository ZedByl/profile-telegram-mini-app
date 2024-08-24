# Profile Tg Mini App

[Bot](https://t.me/Zedbyl_bot)

Mini Profile is a project that allows you to create a [mini app](https://core.telegram.org/bots/webapps) for [Telegram](https://telegram.org/), the messaging app with over 500 million active users, that connects to your [TON Connect](https://docs.ton.org/develop/dapps/ton-connect/react).

It uses [Next.js](https://nextjs.org/), a React framework for building fast and scalable web applications, and the Telegram [Bot API](https://core.telegram.org/bots/api).

You can use this project as a template to customize your mini app with your own branding, products, and features, or modify the API to connect any other online store that supports RESTful web services. This project is open source and free to use. You can find the source code, documentation, and installation instructions [here on GitHub](https://github.com/ZedByl/profile-telegram-mini-app).

## Requirements

- Telegram Bot
- Ton Api
- NodeJs (Latest LTS version recommended)


## Getting Started

1. Prepare Environment Variables
2. Deploy
3. Init Telegram Bot API Webhook

### Environment Variables

To use this project, you need to set the following environment variables:

- `NEXT_PUBLIC_BASE_PATH`
  This is the base URL of your deployment. For example, if you are deploying on Vercel, it can be something like `https://<your-username>.vercel.app`.
- `TELEGRAM_BOT_TOKEN`
  This is the access token that you get from [@BotFather](https://t.me/BotFather) when you create your Telegram bot.
-`TELEGRAM_BOT_SECRET`
  This is a password that you set to secure your APIs. It can be any string, such as `my-pass` or a randomly generated hash. Please make sure to keep it secret.
-`NEXT_PUBLIC_TON_ADDRESS`
  This is you a wallet address to receive Ton.
-`NEXT_PUBLIC_TELEGRAM_BOT_URL`
  Url of your Bot. For example `https://t.me/<your-bot-name>`

### Deploy

You need to deploy your app on a platform or a server of your choice.

#### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.
You need to fork this repository first.

Check out [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

#### Deploy on Server

If you prefer to deploy your app on your own server, you need to copy `example.env` to `.env `in the root of the project and fill the variables. Then, you need to run the following commands:

```bash
npm run build

npm run start
```
This will build and start your app on the port specified by the `PORT` variable in `.env`.

#### Run Locally for Development

Set environment variables then run:

```bash
npm run dev
```
Or
```bash
docker-compose -f docker-compose-dev.yml up
```

you can use https://ngrok.com/

### Init Telegram Bot API Webhook

This is the last step! You need to set up a webhook for your Telegram bot to receive updates from Telegram. To do this, you just need to make a POST request to the following URL:

```bash
curl -X POST https://<your-deployment-url>/api/telegram-hook/init?secret_hash=<the-secret-password-from-env-var>
```

Replace `<your-deployment-url>` with the base URL of your deployment and `<the-secret-password-from-env-var>` with the value of `TELEGRAM_BOT_SECRET` in your environment variables or `.env`.
