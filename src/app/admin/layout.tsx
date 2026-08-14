export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ backgroundColor: '#f4f4f5', minHeight: '100vh', width: '100vw' }}>
      <header style={{ backgroundColor: 'var(--color-royal-blue)', color: 'white', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-playfair)', margin: 0, fontSize: '1.5rem' }}>M&M Admin Dashboard</h1>
        <a href="/" style={{ color: 'white', textDecoration: 'underline', fontSize: '0.9rem' }}>View Live Site</a>
      </header>
      <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        {children}
      </main>
    </div>
  );
}
