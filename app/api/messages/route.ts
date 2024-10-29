import { NextResponse } from 'next/server';
import { db } from '../../../firebaseConfig';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

interface Message {
  message: string;
  displayTime: string;
  createdAt: string;
}

export async function POST(request: Request) {
  const { message, displayTime, createdAt }: Message = await request.json();
  try {
    const newMessage = { message, displayTime, createdAt };
    await addDoc(collection(db, 'messages'), newMessage);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error adding document:", error);
    return NextResponse.json({ success: false });
  }
}

export async function GET() {
  try {
    const messagesRef = collection(db, 'messages');
    const q = query(messagesRef, where('displayTime', '<=', new Date().toISOString()));
    const querySnapshot = await getDocs(q);

    const messages = querySnapshot.docs.map((doc) => doc.data() as Message);
    return NextResponse.json(messages);
  } catch (error) {
    console.error("Error fetching documents:", error);
    return NextResponse.json([]);
  }
}
