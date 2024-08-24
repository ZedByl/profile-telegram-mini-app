import { NextRequest, NextResponse } from "next/server";
import bot from "@lib/bot";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const id = body.chatId;
    const text = '<b>My contact 😏</b>\n<b>Tg:</b> <a href="t.me/zedbyl">@ZedByl</a>\n<b>GitHub:</b> <a href="https://github.com/ZedByl/profile-telegram-mini-app">ZedByl</a>\n<b>Email:</b> <code>chetverikovnikita@gmail.com</code>';

    if (!id) {
      return NextResponse.json('Not ID', { status: 400 });
    }

    await bot.telegram.sendMessage(id, text, { parse_mode: 'HTML' });
    return NextResponse.json('ok', { status: 200 });
  } catch (error: unknown) {
    console.error("Error handling bot update");
    console.log(error);
    return NextResponse.json('error', { status: 500 });
  }
}
