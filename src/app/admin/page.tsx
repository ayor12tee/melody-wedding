"use client";
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query } from 'firebase/firestore';

export default function AdminDashboard() {
  const [guests, setGuests] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState(false);

  // You can change this password to whatever you want!
  const ADMIN_PASSWORD = "MelodyAdmin26";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setLoading(true);
      fetchDashboardData();
    } else {
      setError(true);
      setPasswordInput('');
    }
  };

  const fetchDashboardData = async () => {
    try {
      const guestSnapshot = await getDocs(query(collection(db, 'guests')));
      setGuests(guestSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <form onSubmit={handleLogin} style={{ backgroundColor: 'white', padding: '2.5rem', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', textAlign: 'center', maxWidth: '400px', width: '100%' }}>
          <h2 style={{ fontFamily: 'var(--font-playfair)', marginBottom: '1.5rem', color: 'var(--color-royal-blue)' }}>Admin Access</h2>
          <input 
            type="password" 
            value={passwordInput}
            onChange={(e) => { setPasswordInput(e.target.value); setError(false); }}
            placeholder="Enter Admin Password"
            style={{ width: '100%', padding: '0.8rem', marginBottom: '1rem', border: '1px solid #ddd', borderRadius: '4px', outline: 'none' }}
          />
          {error && <p style={{ color: '#d9534f', fontSize: '0.85rem', marginTop: '-0.5rem', marginBottom: '1rem' }}>Incorrect password.</p>}
          <button 
            type="submit" 
            style={{ width: '100%', padding: '0.8rem', backgroundColor: 'var(--color-royal-blue)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px' }}
          >
            Access Dashboard
          </button>
        </form>
      </div>
    );
  }

  if (loading) return <div style={{ textAlign: 'center', marginTop: '4rem' }}>Loading dashboard...</div>;

  const engagementGuests = guests.filter(g => g.event === 'Engagement' || g.event === 'Both').length;
  const weddingGuests = guests.filter(g => g.event === 'Wedding' || g.event === 'Both').length;

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
              <th style={{ padding: '1rem 0', color: '#666' }}>Master Code Used</th>
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
    </div>
  );
}
