import React, { forwardRef } from 'react';
import { Camera, Book } from 'lucide-react';
import './Hero.css';

interface HeroProps {
  scrollToSection: (refName: string) => void;
}

const Hero = forwardRef<HTMLDivElement, HeroProps>(({ scrollToSection }, ref) => {
  return (
    <section ref={ref} className="hero">
      <div className="hero-badge">✨ AI-Powered</div>
      <h1>Temukan Keajaiban <br/> <span className="gradient-text">Dunia Fungi</span></h1>
      <p>Identifikasi jamur instan dengan AI dan simpan koleksimu.</p>
      
      <div className="hero-btns">
        <button onClick={() => scrollToSection('scanner')} className="btn-primary">
          <Camera size={20}/> Mulai Scan
        </button>
        <button onClick={() => scrollToSection('collection')} className="btn-secondary">
          <Book size={20}/> Koleksi
        </button>
      </div>
    </section>
  );
});

export default Hero;