import React from 'react';
import { Leaf, User } from 'lucide-react';
import './Navbar.css';

interface NavbarProps {
  user: any;
  onOpenAuth: () => void;
  onLogout: () => void; // Ditambahkan props logout
  refs: {
    homeRef: React.RefObject<HTMLDivElement>;
    scannerRef: React.RefObject<HTMLDivElement>;
    collectionRef: React.RefObject<HTMLDivElement>;
  };
}

export default function Navbar({ user, onOpenAuth, onLogout, refs }: NavbarProps) {
  const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo" onClick={() => scrollTo(refs.homeRef)}>
          <Leaf className="text-emerald-600" size={28} />
          <span>Mushroom<span style={{ color: 'var(--primary)' }}>Vision</span></span>
        </div>

        <div className="nav-links">
          <button onClick={() => scrollTo(refs.homeRef)} className="nav-item">Home</button>
          <button onClick={() => scrollTo(refs.scannerRef)} className="nav-item">Scanner</button>
          <button onClick={() => scrollTo(refs.collectionRef)} className="nav-item">Koleksi</button>
        </div>

        {user ? (
          <button onClick={onLogout} className="user-btn">
            <div className="user-avatar">{user.name[0]}</div>
            <span>{user.name.split(' ')[0]}</span>
          </button>
        ) : (
          <button onClick={onOpenAuth} className="user-btn">
            <div className="user-avatar" style={{background: '#78716c'}}><User size={16}/></div>
            <span>Login</span>
          </button>
        )}
      </div>
    </nav>
  );
}