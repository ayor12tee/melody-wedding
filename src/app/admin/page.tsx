"use client";
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, query, orderBy } from 'firebase/firestore';

export default function AdminDashboard() {
  const [guests, setGuests] = useState<any[]>([]);
  const [codes, setCodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const guestSnapshot = await getDocs(query(collection(db, 'guests')));
      const codeSnapshot = await getDocs(query(collection(db, 'codes')));
      
      setGuests(guestSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setCodes(codeSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const generateCodes = async (count: number) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 0; i < count; i++) {
      let result = '';
      for (let j = 0; j < 6; j++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      
      await addDoc(collection(db, 'codes'), {
        code: result,
        used: false,
        createdAt: new Date()
      });
    }
    fetchDashboardData();
  };

  if (loading) return <div>Loading dashboard...</div>;

  const engagementGuests = guests.filter(g => g.event === 'Engagement' || g.event === 'Both').length;
  const weddingGuests = guests.filter(g => g.event === 'Wedding' || g.event === 'Both').length;
  const bothGuests = guests.filter(g => g.event === 'Both').length;
  const unusedCodes = codes.filter(c => !c.used).length;

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
        <div style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#666', fontSize: '0.9rem', textTransform: 'uppercase' }}>Total Guests</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: 'var(--color-royal-blue)' }}>{guests.length}</p>
        </div>
        <div style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#666', fontSize: '0.9rem', textTransform: 'uppercase' }}>Engagement</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: 'var(--color-royal-blue)' }}>{engagementGuests}</p>
        </div>
        <div style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#666', fontSize: '0.9rem', textTransform: 'uppercase' }}>Wedding</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: 'var(--color-brown)' }}>{weddingGuests}</p>
        </div>
        <div style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#666', fontSize: '0.9rem', textTransform: 'uppercase' }}>Unused Codes</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#333' }}>{unusedCodes}</p>
        </div>
      </div>

      <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', marginBottom: '3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ margin: 0 }}>Registered Guests</h2>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #eee' }}>
              <th style={{ padding: '1rem 0', color: '#666' }}>Name</th>
              <th style={{ padding: '1rem 0', color: '#666' }}>WhatsApp</th>
              <th style={{ padding: '1rem 0', color: '#666' }}>Event</th>
              <th style={{ padding: '1rem 0', color: '#666' }}>Code Used</th>
            </tr>
          </thead>
          <tbody>
            {guests.length === 0 ? (
              <tr><td colSpan={4} style={{ padding: '1rem 0', color: '#999' }}>No guests registered yet.</td></tr>
            ) : (
              guests.map(guest => (
                <tr key={guest.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '1rem 0' }}>{guest.name}</td>
                  <td style={{ padding: '1rem 0' }}>{guest.whatsapp}</td>
                  <td style={{ padding: '1rem 0' }}><span style={{ backgroundColor: '#f0f0f0', padding: '0.3rem 0.6rem', borderRadius: '4px', fontSize: '0.85rem' }}>{guest.event}</span></td>
                  <td style={{ padding: '1rem 0', fontFamily: 'monospace' }}>{guest.code}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <h2 style={{ margin: '0 0 1rem 0' }}>Code Management</h2>
        <p style={{ color: '#666', marginBottom: '1.5rem' }}>Generate new unique 6-character registration codes for your guests.</p>
        <button onClick={() => generateCodes(5)} className="btn-primary" style={{ marginRight: '1rem' }}>Generate 5 Codes</button>
        <button onClick={() => generateCodes(10)} className="btn-secondary">Generate 10 Codes</button>

        <div style={{ marginTop: '2rem' }}>
          <h3 style={{ margin: '0 0 1rem 0' }}>Available Codes ({unusedCodes})</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {codes.filter(c => !c.used).map(c => (
              <span key={c.id} style={{ padding: '0.5rem 1rem', backgroundColor: 'var(--color-bg-light)', border: '1px solid #ddd', borderRadius: '4px', fontFamily: 'monospace' }}>
                {c.code}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
