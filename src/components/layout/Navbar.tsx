"use client";
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div>
        <Link href="/" style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-text-dark)' }}>
          M & M
        </Link>
      </div>
      <div className="nav-links">
        <Link href="#engagement" className="nav-link">Engagement</Link>
        <Link href="#wedding" className="nav-link">Wedding</Link>
        <Link href="#gifts" className="nav-link">Gifts</Link>
        <Link href="#rsvp" className="nav-link" style={{ color: 'var(--color-royal-blue)', fontWeight: 'bold' }}>RSVP</Link>
      </div>
    </nav>
  );
}
