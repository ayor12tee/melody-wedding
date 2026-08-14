"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function RSVPSection() {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    email: '',
    event: 'Both',
    code: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    
    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Failed to register invite');
      }
      
      setStatus('success');
    } catch (err: any) {
      setErrorMsg(err.message);
      setStatus('error');
    }
  };

  return (
    <section id="rsvp" className="section-container" style={{ backgroundColor: 'var(--color-bg-light)' }}>
      <div className="content-wrapper">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Register Your Invite</h2>
          <p style={{ marginBottom: '3rem', fontSize: '1.1rem', color: '#666' }}>
            Please enter your unique registration code to confirm your attendance.
          </p>

          {status === 'success' ? (
            <div style={{ padding: '3rem', backgroundColor: 'rgba(0, 128, 0, 0.05)', borderRadius: '12px', border: '1px solid rgba(0, 128, 0, 0.2)' }}>
              <h3 style={{ color: 'green', fontSize: '1.5rem', marginBottom: '1rem', fontFamily: 'var(--font-playfair)' }}>Registration Successful!</h3>
              <p style={{ fontSize: '1.1rem' }}>Thank you, {formData.name}. We look forward to celebrating with you.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'left' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Registration Code *</label>
                <input 
                  required
                  type="text" 
                  value={formData.code}
                  onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
                  placeholder="e.g. AB123XYZ"
                  style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc', fontSize: '1rem' }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Full Name *</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc', fontSize: '1rem' }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>WhatsApp Number *</label>
                <input 
                  required
                  type="tel" 
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                  style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc', fontSize: '1rem' }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email Address (Optional)</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc', fontSize: '1rem' }}
                />
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Event Attending *</label>
                <select 
                  required
                  value={formData.event}
                  onChange={(e) => setFormData({...formData, event: e.target.value})}
                  style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc', fontSize: '1rem', backgroundColor: 'white' }}
                >
                  <option value="Both">Both Engagement & Wedding</option>
                  <option value="Engagement">Engagement Only</option>
                  <option value="Wedding">Wedding Only</option>
                </select>
              </div>

              {status === 'error' && (
                <p style={{ color: 'red', marginBottom: '1.5rem', padding: '1rem', backgroundColor: 'rgba(255,0,0,0.05)', borderRadius: '4px' }}>
                  {errorMsg}
                </p>
              )}

              <button 
                type="submit" 
                className="btn-primary" 
                style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Verifying...' : 'Register My Invite'}
              </button>
              
              <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem', color: '#888' }}>
                Please note: Each invitation permits one person only.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
