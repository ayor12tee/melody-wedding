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

  const inputStyle = {
    width: '100%',
    padding: '0.9rem 1rem',
    marginBottom: '1.2rem',
    border: '1px solid #f0f0f0',
    backgroundColor: '#fbfbfb',
    fontSize: '0.95rem',
    color: '#555',
    outline: 'none',
    fontFamily: 'inherit',
    transition: 'border-color 0.3s ease'
  };

  return (
    <section id="rsvp" style={{ backgroundColor: 'var(--color-bg-light)', padding: '6rem 1rem' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -5, boxShadow: '0 25px 60px rgba(0,0,0,0.08)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            backgroundColor: '#ffffff',
            boxShadow: '0 15px 50px rgba(0,0,0,0.06)',
            padding: '1.5rem',
            position: 'relative',
            transition: 'box-shadow 0.4s ease'
          }}
        >
          {/* Inner border wrapper */}
          <div style={{
            border: '1px solid rgba(0,0,0,0.06)',
            padding: '4rem 2rem',
            textAlign: 'center'
          }}>
            <h2 style={{ 
              fontFamily: 'var(--font-playfair)', 
              fontSize: '2.5rem', 
              color: '#5a737d', /* A subtle blue/grey from the template */
              marginBottom: '0.5rem',
              fontWeight: 400
            }}>
              Register Your Invite
            </h2>
            
            {/* Ornament Divider */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '3rem' }}>
              <div style={{ width: '40px', height: '1px', backgroundColor: '#e5e5e5' }}></div>
              <div style={{ margin: '0 15px', color: '#b0b0b0', fontSize: '0.9rem', transform: 'rotate(45deg)', width: '8px', height: '8px', border: '1px solid #b0b0b0' }}></div>
              <div style={{ margin: '0 0px 0 -10px', color: '#b0b0b0', fontSize: '0.9rem', transform: 'rotate(45deg)', width: '8px', height: '8px', border: '1px solid #b0b0b0' }}></div>
              <div style={{ width: '40px', height: '1px', backgroundColor: '#e5e5e5', marginLeft: '15px' }}></div>
            </div>

            {status === 'success' ? (
              <div style={{ padding: '2rem', backgroundColor: '#f9fdfa', border: '1px solid #e2f0e6' }}>
                <h3 style={{ color: '#5a737d', fontSize: '1.5rem', marginBottom: '1rem', fontFamily: 'var(--font-playfair)' }}>Registration Successful!</h3>
                <p style={{ fontSize: '1.1rem', color: '#666' }}>Thank you, {formData.name}. We look forward to celebrating with you.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ maxWidth: '450px', margin: '0 auto', textAlign: 'left' }}>
                
                <input 
                  required
                  type="text" 
                  value={formData.code}
                  onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
                  placeholder="Registration Code *"
                  style={inputStyle}
                />

                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Full Name *"
                  style={inputStyle}
                />

                <input 
                  required
                  type="tel" 
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                  placeholder="WhatsApp Number *"
                  style={inputStyle}
                />

                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="E-mail (Optional)"
                  style={inputStyle}
                />

                <select 
                  required
                  value={formData.event}
                  onChange={(e) => setFormData({...formData, event: e.target.value})}
                  style={{...inputStyle, appearance: 'none', backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23999999%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right .7em top 50%', backgroundSize: '.65em auto'}}
                >
                  <option value="" disabled>Event Attending *</option>
                  <option value="Both">Both Engagement & Wedding</option>
                  <option value="Engagement">Engagement Only</option>
                  <option value="Wedding">Wedding Only</option>
                </select>

                {status === 'error' && (
                  <p style={{ color: '#d9534f', fontSize: '0.9rem', marginBottom: '1.2rem', textAlign: 'center' }}>
                    {errorMsg}
                  </p>
                )}

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                  <button 
                    type="submit" 
                    disabled={status === 'loading'}
                    style={{ 
                      padding: '12px 35px', 
                      backgroundColor: 'transparent',
                      border: '1px solid #5a737d',
                      color: '#5a737d',
                      fontSize: '0.85rem',
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                      cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                      transition: 'all 0.3s ease',
                      position: 'relative'
                    }}
                    onMouseOver={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#5a737d';
                      (e.currentTarget as HTMLButtonElement).style.color = '#fff';
                    }}
                    onMouseOut={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                      (e.currentTarget as HTMLButtonElement).style.color = '#5a737d';
                    }}
                  >
                    {/* Inner border effect simulating the Neela button */}
                    <div style={{
                      position: 'absolute',
                      top: '3px',
                      left: '3px',
                      right: '3px',
                      bottom: '3px',
                      border: '1px solid rgba(255,255,255,0.3)',
                      pointerEvents: 'none'
                    }}></div>
                    {status === 'loading' ? 'VERIFYING...' : 'REGISTER'}
                  </button>
                </div>
                
                <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.8rem', color: '#999' }}>
                  * Each invitation permits one person only.
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
