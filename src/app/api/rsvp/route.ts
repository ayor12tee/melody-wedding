import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, updateDoc, addDoc, doc, serverTimestamp } from 'firebase/firestore';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, whatsapp, email, event, code } = body;

    if (!name || !whatsapp || !event || !code) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const codesRef = collection(db, 'codes');
    const q = query(codesRef, where('code', '==', code));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return NextResponse.json({ message: 'Invalid registration code.' }, { status: 400 });
    }

    const codeDoc = querySnapshot.docs[0];
    const codeData = codeDoc.data();

    if (codeData.used) {
      return NextResponse.json({ message: 'This registration code has already been used.' }, { status: 400 });
    }

    // Mark code as used
    await updateDoc(doc(db, 'codes', codeDoc.id), {
      used: true,
      usedAt: serverTimestamp(),
      usedBy: name
    });

    // Save guest registration
    await addDoc(collection(db, 'guests'), {
      name,
      whatsapp,
      email: email || null,
      event,
      code,
      registeredAt: serverTimestamp()
    });

    return NextResponse.json({ message: 'Success' }, { status: 200 });
    
  } catch (error) {
    console.error('Error processing RSVP:', error);
    return NextResponse.json({ message: 'Internal server error. Please try again later.' }, { status: 500 });
  }
}
