import React, { useState, useRef } from 'react';
import Navbar from './components/Navbar/navbar';
import Hero from './components/Hero/Hero';
import Scanner from './components/Scanner/Scanner';
import Collection from './components/Collection/Collection';
import AuthModal from './components/AuthModal/AuthModal';
import { mockSupabase } from './Utils/mockSupabase';
import './App.css'; // File css kosong atau global jika perlu

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [collection, setCollection] = useState<any[]>([]);

  const refs = {
    home: useRef<HTMLDivElement>(null),
    scanner: useRef<HTMLDivElement>(null),
    collection: useRef<HTMLDivElement>(null),
  };

  const scrollTo = (key: string) => refs[key as keyof typeof refs]?.current?.scrollIntoView({ behavior: 'smooth' });

  const fetchCol = async () => {
    const { data } = await mockSupabase.from('mushrooms').select();
    if(data) setCollection(data);
  };

  return (
    <>
      <Navbar 
        user={user} 
        onLogout={() => setUser(null)} 
        onOpenAuth={() => setShowAuth(true)}
        scrollToSection={scrollTo}
      />
      
      <Hero ref={refs.home} scrollToSection={scrollTo} />
      
      <Scanner 
        ref={refs.scanner}
        user={user}
        onOpenAuth={() => setShowAuth(true)}
        onRefreshCollection={fetchCol}
      />
      
      <Collection 
        ref={refs.collection}
        user={user}
        collection={collection}
        onRefresh={fetchCol}
        onOpenAuth={() => setShowAuth(true)}
      />

      {showAuth && (
        <AuthModal 
          onClose={() => setShowAuth(false)} 
          onSuccess={(u) => { setUser(u); fetchCol(); }} 
        />
      )}
    </>
  );
}