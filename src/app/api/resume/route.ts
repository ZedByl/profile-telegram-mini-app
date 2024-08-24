import { NextRequest, NextResponse } from "next/server";
import bot from "@lib/bot";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const id = body.chatId;

    const filePath = process.cwd() + '/public/pdf/resume.pdf';

    if (!id) {
      return NextResponse.json('Not ID', { status: 400 });
    }

    await bot.telegram.sendDocument(id, { source: filePath }, { caption: 'My resume 🔥' });
    return NextResponse.json('ok', { status: 200 });
  } catch (error: unknown) {
    console.error("Error handling bot update");
    console.log(error);
    return NextResponse.json('error', { status: 500 });
  }
}
