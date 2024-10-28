import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const messagesFilePath = path.join(process.cwd(), 'messages.json');

const readMessages = () => {
  try {
    const data = fs.readFileSync(messagesFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading messages:", error);
    return [];
  }
};

const writeMessages = (messages: any[]) => {
  fs.writeFileSync(messagesFilePath, JSON.stringify(messages, null, 2));
};

export async function POST(request: Request) {
  const { message, displayTime, createdAt } = await request.json();
  const messages = readMessages();
  const newMessage = { message, displayTime, createdAt };
  messages.push(newMessage);
  writeMessages(messages);
  return NextResponse.json({ success: true });
}

export async function GET() {
  const messages = readMessages();
  const currentMessages = messages.filter((msg: any) => new Date(msg.displayTime) <= new Date());
  return NextResponse.json(currentMessages);
}