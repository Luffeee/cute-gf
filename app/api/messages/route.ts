import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const messagesFilePath = path.join(process.cwd(), 'messages.json');

// Define the Message interface
interface Message {
  message: string;
  displayTime: string;
  createdAt: string;
}

const readMessages = (): Message[] => {
  try {
    const data = fs.readFileSync(messagesFilePath, 'utf-8');
    return JSON.parse(data) as Message[]; // Specify the type here
  } catch (error) {
    console.error("Error reading messages:", error);
    return [];
  }
};

const writeMessages = (messages: Message[]) => {
  fs.writeFileSync(messagesFilePath, JSON.stringify(messages, null, 2));
};

export async function POST(request: Request) {
  const { message, displayTime, createdAt }: Message = await request.json(); // Specify the expected type

  const messages = readMessages();
  const newMessage: Message = { message, displayTime, createdAt }; // Use the Message interface
  messages.push(newMessage);
  writeMessages(messages);
  
  return NextResponse.json({ success: true });
}

export async function GET() {
  const messages = readMessages();
  // Filter messages to only include those with displayTime in the past
  const currentMessages = messages.filter((msg: Message) => new Date(msg.displayTime) <= new Date());
  
  return NextResponse.json(currentMessages);
}
