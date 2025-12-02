/* src/App.tsx */
import React, { useState, useRef } from 'react';
import Navbar from './components/Navbar/navbar';
import Hero from './components/Hero/Hero';
import Scanner from './components/Scanner/Scanner';
import Collection from './components/Collection/Collection';

// Jika kamu punya AuthModal, import juga disini
// import AuthModal from './component/AuthModal/AuthModal';

export default function App() {
  const [user, setUser] = useState<any>(null); // State User (null = belum login)

  // Refs untuk Scroll
  const homeRef = useRef<HTMLDivElement>(null);
  const scannerRef = useRef<HTMLDivElement>(null);
  const collectionRef = useRef<HTMLDivElement>(null);

  // Fungsi Scroll
  const scrollToSection = (section: string) => {
    if (section === 'home') homeRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (section === 'scanner') scannerRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (section === 'collection') collectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Dummy Login
  const handleLogin = () => {
    const email = prompt("Masukkan Email (Simulasi):", "andy@binus.ac.id");
    if (email) setUser({ name: "Andy", email });
  };

  return (
    <>
      <Navbar 
        scrollToSection={scrollToSection} 
        onOpenAuth={handleLogin}
      />
      
      {/* Wrapper Ref */}
      <div ref={homeRef}>
        <Hero scrollToSection={scrollToSection} />
      </div>

      <div ref={scannerRef}>
        <Scanner user={user} onOpenAuth={handleLogin} />
      </div>

      <div ref={collectionRef}>
        <Collection user={user} onOpenAuth={handleLogin} collection={[1,2,3]} />
      </div>
      
      {/* Footer Simple */}
      <footer style={{textAlign: 'center', padding: '40px', background: 'white', color: '#9ca3af', fontSize: '0.85rem'}}>
        &copy; 2025 MushroomVision Project.
      </footer>
    </>
  );
}