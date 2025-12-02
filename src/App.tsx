import React, { useState, useRef } from 'react';
import './index.css'; // Pastikan import CSS global
import Navbar from './component/Navbar/navbar';
import Hero from './component/Hero/Hero';
import UploadInfo from './component/UploadInfo/Uploadinfo';
import Colection from './component/Colection/Colection';

export default function App() {
  const homeRef = useRef<HTMLDivElement>(null);
  const scannerRef = useRef<HTMLDivElement>(null);
  const collectionRef = useRef<HTMLDivElement>(null);

  // --- STATE ---
  const [user, setUser] = useState<any>(null);
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<any>(null);
  const [mushroomInfo, setMushroomInfo] = useState<any>(null);
  const [collection, setCollection] = useState<any[]>([]);

  // --- DUMMY LOGIC ---
  const handleAuth = () => setUser({ name: "Andy Saputra", email: "andy@binus.ac.id" });
  const handleLogout = () => setUser(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imgUrl = URL.createObjectURL(e.target.files[0]);
      setImage(imgUrl);
      // Reset hasil sebelumnya saat upload baru
      setPrediction(null);
      setMushroomInfo(null);
    }
  };

  const startAnalysis = async () => {
    if (!image) return;
    setLoading(true);

    // Simulasi delay AI (2 detik)
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Data Dummy Model CV & Gemini
    setPrediction({ name: "Amanita muscaria", confidence: 0.98 });
    setMushroomInfo({
      description: "Jamur payung merah ikonik dengan bintik putih. Sering ditemukan di hutan jenis konifera.",
      region: "Eropa & Amerika Utara",
      edibility: "Beracun (Psikoaktif)",
      fun_fact: "Sering muncul di game Mario Bros!"
    });

    setLoading(false);
  };

  const saveToCollection = () => {
    if (!user) {
      alert("Login dulu bro!");
      return;
    }
    const newItem = {
      id: Date.now(),
      image,
      name: prediction.name,
      dateAdded: new Date().toLocaleDateString(),
      info: mushroomInfo
    };
    setCollection([newItem, ...collection]);
    alert("Tersimpan ke koleksi!");
  };

  const deleteFromCollection = (id: number) => {
    setCollection(collection.filter(item => item.id !== id));
  };

  const handleReset = () => {
    setImage(null);
    setPrediction(null);
    setMushroomInfo(null);
  };

  return (
    <>
      <Navbar 
        user={user} 
        onOpenAuth={handleAuth} 
        onLogout={handleLogout}
        refs={{ homeRef, scannerRef, collectionRef }} 
      />
      
      <div ref={homeRef}>
        <Hero 
          onStartScan={() => scannerRef.current?.scrollIntoView({behavior: 'smooth'})}
          onViewCollection={() => collectionRef.current?.scrollIntoView({behavior: 'smooth'})}
        />
      </div>

      <div ref={scannerRef}>
        <UploadInfo 
          image={image}
          loading={loading}
          prediction={prediction}
          mushroomInfo={mushroomInfo}
          onImageUpload={handleImageUpload}
          onAnalyze={startAnalysis}
          onSave={saveToCollection}
          onReset={handleReset}
        />
      </div>

      <div ref={collectionRef}>
        <Colection 
          user={user}
          collection={collection}
          onDelete={deleteFromCollection}
          onLoginRequest={handleAuth}
        />
      </div>
    </>
  );
}