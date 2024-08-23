import { Markup, Telegraf } from "telegraf";

export const SECRET_HASH = process.env.TELEGRAM_BOT_SECRET!!
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || `https://${process.env.NEXT_PUBLIC_BASE_PATH!!}`
const WEBHOOK_URL = `${BASE_PATH}api/telegram-hook?secret_hash=${SECRET_HASH}`
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!!
const bot = new Telegraf(BOT_TOKEN)

bot.start((ctx) => {
  const chatId = ctx?.message?.chat?.id || ''
  const text = 'Нажмите кнопку ниже, чтобы открыть Mini App:';

  ctx.reply(text,
    Markup.inlineKeyboard([Markup.button.webApp("Open", BASE_PATH + `?chatId=${chatId}`)]),
  )
});

export const initWebhook = () => {
  return bot.telegram.setWebhook(WEBHOOK_URL)
}

export default bot
