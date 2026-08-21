import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';

// The three master codes you can share with guests. You can change these anytime!
const MASTER_CODES = [
  'MELODY2026', // Code for Both Events
  'ENGAGE26',   // Code for Engagement Only
  'WEDDING26'   // Code for Wedding Only
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, whatsapp, email, event, code } = body;

    if (!name || !whatsapp || !event || !code) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Convert submitted code to uppercase and strip whitespace to ensure matching
    const submittedCode = code.toUpperCase().trim();

    // Validate against our master codes
    if (!MASTER_CODES.includes(submittedCode)) {
      return NextResponse.json({ message: 'Invalid registration code.' }, { status: 400 });
    }

    // Check for duplicate registration using WhatsApp number
    const guestsRef = collection(db, 'guests');
    const duplicateQuery = query(guestsRef, where('whatsapp', '==', whatsapp));
    const duplicateSnapshot = await getDocs(duplicateQuery);

    if (!duplicateSnapshot.empty) {
      return NextResponse.json({ message: 'This WhatsApp number is already registered for the event.' }, { status: 400 });
    }

    // Save guest registration directly
    await addDoc(collection(db, 'guests'), {
      name,
      whatsapp,
      email: email || null,
      event,
      code: submittedCode,
      registeredAt: serverTimestamp()
    });

    return NextResponse.json({ message: 'Success' }, { status: 200 });
    
  } catch (error) {
    console.error('Error processing RSVP:', error);
    return NextResponse.json({ message: 'Internal server error. Please try again later.' }, { status: 500 });
  }
}
