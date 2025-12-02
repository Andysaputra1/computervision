import React, { useState } from 'react';
import { Leaf, User, LogOut, ChevronDown } from 'lucide-react';
import './Navbar.css';

interface NavbarProps {
  user: any;
  onLogout: () => void;
  onOpenAuth: () => void;
  scrollToSection: (refName: string) => void;
}

export default function Navbar({ user, onLogout, onOpenAuth, scrollToSection }: NavbarProps) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo" onClick={() => scrollToSection('home')}>
          <Leaf color="var(--primary)" />
          <span>Mushroom<span style={{color: 'var(--primary)'}}>Vision</span></span>
        </div>

        <div className="nav-links">
          <button onClick={() => scrollToSection('home')} className="nav-item">Home</button>
          <button onClick={() => scrollToSection('scanner')} className="nav-item">Scanner</button>
          <button onClick={() => scrollToSection('collection')} className="nav-item">Koleksi</button>
        </div>

        <div style={{position: 'relative'}}>
          {user ? (
            <button onClick={() => setShowMenu(!showMenu)} className="nav-auth">
              <div style={{width: 24, height: 24, background: 'var(--primary)', borderRadius: '50%', color: 'white', fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                {user.email[0].toUpperCase()}
              </div>
              <ChevronDown size={14} />
            </button>
          ) : (
            <button onClick={onOpenAuth} className="nav-auth"><User size={18}/></button>
          )}

          {showMenu && user && (
            <div className="user-dropdown" style={{position: 'absolute', right: 0, top: 40, background: 'white', padding: 10, borderRadius: 10, boxShadow: 'var(--shadow)', border: '1px solid var(--border)', width: 150}}>
              <p style={{fontSize: 12, color: 'gray', padding: 5}}>{user.email}</p>
              <button onClick={() => {onLogout(); setShowMenu(false)}} style={{display: 'flex', alignItems: 'center', gap: 5, color: 'red', background: 'none', border: 'none', width: '100%', padding: 5}}>
                <LogOut size={14}/> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}