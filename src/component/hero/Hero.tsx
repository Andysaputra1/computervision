import React from 'react';
import { Camera, BookOpen, Sparkles } from 'lucide-react';
import './Hero.css';

interface HeroProps {
  onStartScan: () => void;
  onViewCollection: () => void;
}

export default function Hero({ onStartScan, onViewCollection }: HeroProps) {
  return (
    <section className="hero-section">
      <div className="hero-badge">
        <Sparkles size={14} /> AI-Powered Identification
      </div>
      
      <h1 className="hero-title">
        Eksplorasi Dunia <br />
        <span className="gradient-text">Fungi & Jamur</span>
      </h1>
      
      <p className="hero-desc">
        Unggah foto jamur temuanmu, biarkan Computer Vision mengidentifikasinya, 
        dan simpan penemuanmu ke dalam ensiklopedia digital pribadi.
      </p>

      <div className="hero-buttons">
        <button onClick={onStartScan} className="btn btn-primary">
          <Camera size={20} /> Mulai Scan
        </button>
        <button onClick={onViewCollection} className="btn btn-secondary">
          <BookOpen size={20} /> Lihat Koleksi
        </button>
      </div>
    </section>
  );
}