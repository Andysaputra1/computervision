import React from 'react';
import { Leaf, User } from 'lucide-react';
import './Navbar.css';

interface NavbarProps {
  scrollToSection: (section: string) => void;
  onOpenAuth: () => void;
}

export default function Navbar({ scrollToSection, onOpenAuth }: NavbarProps) {
  return (
    <nav className="navbar">
      <div className="nav-container">

        <div className="nav-logo" onClick={() => scrollToSection('home')}>
          <div className="logo-icon"><Leaf size={20} fill="white" /></div>
          <span>MushroomVision</span>
        </div>

        <div className="nav-menu">
          <button onClick={() => scrollToSection('home')} className="nav-link">Home</button>
          <button onClick={() => scrollToSection('scanner')} className="nav-link">Scanner</button>
          <button onClick={() => scrollToSection('collection')} className="nav-link">Koleksi</button>
        </div>


        <button className="user-btn" onClick={onOpenAuth}>
          <User size={20} />
        </button>
      </div>
    </nav>
  );
}