"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import CinematicText from '../ui/CinematicText';

export default function RSVPSection() {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    email: '',
    event: '', // Empty string forces the user to select an option
    code: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const eventOptions = [
    { label: 'Both Engagement & Wedding', value: 'Both' },
    { label: 'Engagement Only', value: 'Engagement' },
    { label: 'Wedding Only', value: 'Wedding' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.event) {
      setErrorMsg('Please select which event you are attending.');
      setStatus('error');
      return;
    }

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
    color: 'var(--color-royal-blue)',
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
            
            <CinematicText 
              text="Register Your Invite"
              className="shimmer-text"
              style={{ 
                fontFamily: 'var(--font-playfair)', 
                fontSize: '2.5rem', 
                marginBottom: '0.5rem',
                fontWeight: 400
              }}
            />
            
            {/* Ornament Divider */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '3rem' }}>
              <div style={{ width: '40px', height: '1px', backgroundColor: '#e5e5e5' }}></div>
              <div style={{ margin: '0 15px', color: '#b0b0b0', fontSize: '0.9rem', transform: 'rotate(45deg)', width: '8px', height: '8px', border: '1px solid #b0b0b0' }}></div>
              <div style={{ margin: '0 0px 0 -10px', color: '#b0b0b0', fontSize: '0.9rem', transform: 'rotate(45deg)', width: '8px', height: '8px', border: '1px solid #b0b0b0' }}></div>
              <div style={{ width: '40px', height: '1px', backgroundColor: '#e5e5e5', marginLeft: '15px' }}></div>
            </div>

            {status === 'success' ? (
              <div style={{ padding: '2rem', backgroundColor: '#f9fdfa', border: '1px solid #e2f0e6' }}>
                <h3 style={{ color: 'var(--color-royal-blue)', fontSize: '1.5rem', marginBottom: '1rem', fontFamily: 'var(--font-playfair)' }}>Registration Successful!</h3>
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

                {/* Custom Event Dropdown */}
                <div style={{ position: 'relative', marginBottom: '1.2rem' }}>
                  <div 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    style={{ 
                      ...inputStyle, 
                      cursor: 'pointer', 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginBottom: 0, 
                      color: formData.event ? 'var(--color-royal-blue)' : '#999' 
                    }}
                  >
                    <span>{formData.event ? eventOptions.find(o => o.value === formData.event)?.label : 'Event Attending *'}</span>
                    <span style={{ 
                      color: 'var(--color-brown)', 
                      transform: isDropdownOpen ? 'rotate(180deg)' : 'none', 
                      transition: 'transform 0.3s ease',
                      fontSize: '0.8rem'
                    }}>▼</span>
                  </div>
                  
                  {isDropdownOpen && (
                    <div
                      style={{ 
                        position: 'absolute', 
                        top: '100%', 
                        left: 0, 
                        right: 0, 
                        backgroundColor: 'white', 
                        border: '1px solid #f0f0f0', 
                        borderTop: 'none',
                        zIndex: 10, 
                        boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
                        maxHeight: '200px',
                        overflowY: 'auto'
                      }}
                    >
                      {eventOptions.map(opt => (
                        <div 
                          key={opt.value}
                          onClick={() => { setFormData({...formData, event: opt.value}); setIsDropdownOpen(false); setErrorMsg(''); }}
                          style={{ 
                            padding: '0.9rem 1rem', 
                            cursor: 'pointer', 
                            transition: 'background-color 0.2s ease, color 0.2s ease', 
                            color: formData.event === opt.value ? 'var(--color-royal-blue)' : '#555',
                            backgroundColor: formData.event === opt.value ? '#fbfbfb' : 'transparent',
                            fontSize: '0.95rem'
                          }}
                          onMouseOver={(e) => { 
                            e.currentTarget.style.backgroundColor = 'var(--color-beige)'; 
                            e.currentTarget.style.color = 'var(--color-brown)'; 
                          }}
                          onMouseOut={(e) => { 
                            e.currentTarget.style.backgroundColor = formData.event === opt.value ? '#fbfbfb' : 'transparent'; 
                            e.currentTarget.style.color = formData.event === opt.value ? 'var(--color-royal-blue)' : '#555'; 
                          }}
                        >
                          {opt.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

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
