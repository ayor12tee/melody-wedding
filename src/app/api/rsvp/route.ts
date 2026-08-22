import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';

// The three master codes you can share with guests. You can change these anytime!
const MASTER_CODES = [
  'MELMIK26',    // Code for Both Events
  'GRACE4826',   // Code for Engagement Only
  'MMWEDDING26'  // Code for Wedding Only
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, whatsapp, email, event, code, childrenCount } = body;

    if (!name || !whatsapp || !event || !code || childrenCount === undefined) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Convert submitted code to uppercase and strip whitespace to ensure matching
    const submittedCode = code.toUpperCase().trim();

    // Validate against our master codes
    if (!MASTER_CODES.includes(submittedCode)) {
      return NextResponse.json({ message: 'Invalid registration code.' }, { status: 400 });
    }

    // Validate that the guest is not trying to register for an event their code doesn't permit
    if (submittedCode === 'MMWEDDING26' && event !== 'Wedding') {
      return NextResponse.json({ message: 'Your code is only valid for the Wedding. Please select "Wedding Only".' }, { status: 400 });
    }
    
    if (submittedCode === 'GRACE4826' && event !== 'Engagement') {
      return NextResponse.json({ message: 'Your code is only valid for the Engagement. Please select "Engagement Only".' }, { status: 400 });
    }

    // Sanitize WhatsApp number to just digits and plus sign for strict matching
    const sanitizedWhatsapp = whatsapp.replace(/[^\d+]/g, '');

    // Check for duplicate registration using sanitized WhatsApp number
    const guestsRef = collection(db, 'guests');
    const duplicateQuery = query(guestsRef, where('whatsapp', '==', sanitizedWhatsapp));
    const duplicateSnapshot = await getDocs(duplicateQuery);

    if (!duplicateSnapshot.empty) {
      return NextResponse.json({ message: 'This WhatsApp number is already registered for the event.' }, { status: 400 });
    }

    // Save guest registration directly
    await addDoc(collection(db, 'guests'), {
      name: name.trim(),
      whatsapp: sanitizedWhatsapp,
      email: email ? email.trim() : null,
      event,
      childrenCount: parseInt(childrenCount, 10) || 0,
      code: submittedCode,
      registeredAt: serverTimestamp()
    });

    return NextResponse.json({ message: 'Success' }, { status: 200 });
    
  } catch (error) {
    console.error('Error processing RSVP:', error);
    return NextResponse.json({ message: 'Internal server error. Please try again later.' }, { status: 500 });
  }
}
