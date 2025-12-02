import React from 'react';
import { Trash2, Lock } from 'lucide-react';
import './Colection.css';

interface ColectionProps {
  user: any;
  collection: any[];
  onDelete: (id: number) => void;
  onLoginRequest: () => void;
}

export default function Colection({ user, collection, onDelete, onLoginRequest }: ColectionProps) {
  if (!user) {
    return (
      <section className="collection-section" style={{textAlign: 'center', opacity: 0.7}}>
        <div style={{padding: '80px 20px', background: '#e7e5e4', borderRadius: '24px'}}>
          <Lock size={48} className="text-stone-400 mb-4" />
          <h2 style={{fontSize: '2rem', fontWeight: 800}}>Koleksi Terkunci</h2>
          <p className="mb-6">Silakan login untuk melihat dan menyimpan koleksi jamurmu.</p>
          <button onClick={onLoginRequest} style={{background: 'black', color: 'white', padding: '10px 24px', borderRadius: 50, border: 'none', fontWeight: 'bold'}}>Login Sekarang</button>
        </div>
      </section>
    );
  }

  return (
    <section className="collection-section">
      <div className="collection-header">
        <div>
          <h2 style={{fontSize: '2.5rem', fontWeight: 800, margin: 0}}>Library</h2>
          <p style={{color: '#78716c', margin: 0}}>Penemuan tersimpan</p>
        </div>
        <div style={{fontSize: '1.5rem', fontWeight: 700, color: '#d6d3d1'}}>
          {collection.length}
        </div>
      </div>

      {collection.length === 0 ? (
        <div className="empty-state">
          <h3>Belum ada koleksi</h3>
          <p>Lakukan scan pada jamur pertamamu!</p>
        </div>
      ) : (
        <div className="grid-layout">
          {collection.map((item) => (
            <div key={item.id} className="card">
              <img src={item.image} alt={item.name} className="card-img-top" />
              <div className="card-body">
                <span className="card-date">{item.dateAdded}</span>
                <h4 className="card-title">{item.name}</h4>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 15}}>
                  <span className="tag">{item.info.edibility}</span>
                  <button onClick={() => onDelete(item.id)} style={{color: '#ef4444', background: 'none', border: 'none'}}>
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}