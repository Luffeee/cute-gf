import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface Message {
  message: string;
  displayTime: string;
  createdAt: string;
}

const messagesFilePath = path.join(process.cwd(), 'messages.json');

const readMessages = (): Message[] => {
  try {
    const data = fs.readFileSync(messagesFilePath, 'utf-8');
    return JSON.parse(data) as Message[];
  } catch (error) {
    console.error("Error reading messages:", error);
    return [];
  }
};

const writeMessages = (messages: Message[]) => {
  fs.writeFileSync(messagesFilePath, JSON.stringify(messages, null, 2));
};

export async function POST(request: Request) {
  const { message, displayTime, createdAt }: Message = await request.json();

  const messages = readMessages();
  const newMessage: Message = { message, displayTime, createdAt }; 
  messages.push(newMessage);
  writeMessages(messages);
  
  return NextResponse.json({ success: true });
}

export async function GET() {
  const messages = readMessages();
  const currentMessages = messages.filter((msg) => new Date(msg.displayTime) <= new Date());
  
  return NextResponse.json(currentMessages);
}
