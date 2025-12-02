import React, { forwardRef } from 'react';
import { Lock, Trash2 } from 'lucide-react';
import './Collection.css';

interface CollectionProps {
  user: any;
  onOpenAuth: () => void;
  collection: any[]; // Bisa diganti tipe data real nanti
}

const Collection = forwardRef<HTMLDivElement, CollectionProps>(({ user, onOpenAuth, collection }, ref) => {
  return (
    <section ref={ref} className="collection-section">
      <div className="collection-container">
        
        <div className="col-header">
          <div className="col-title">
            <span className="sub-label" style={{color:'#6b7280'}}>LIBRARY</span>
            <h2>Koleksi Kamu</h2>
          </div>
          {user && <span className="badge-count">{collection.length} Spesimen</span>}
        </div>

        {!user ? (
          <div style={{textAlign: 'center', padding: '80px 0', background: 'white', borderRadius: '24px', border: '1px solid #f3f4f6'}}>
            <div style={{width: 60, height: 60, background: '#f3f4f6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px'}}>
              <Lock size={24} color="#9ca3af"/>
            </div>
            <h3 style={{fontSize: '1.5rem', fontWeight: 700, marginBottom: 10}}>Koleksi Terkunci</h3>
            <p style={{color: '#6b7280', marginBottom: 20}}>Login untuk menyimpan dan melihat hasil scan kamu.</p>
            <button onClick={onOpenAuth} style={{background: 'black', color: 'white', padding: '12px 30px', borderRadius: 50, border: 'none', fontWeight: 600}}>
              Login Sekarang
            </button>
          </div>
        ) : (
          <div className="card-grid">
            {/* Kartu Dummy */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="mushroom-card">
                <div className="card-img-wrap">
                  <img src={`https://source.unsplash.com/random/400x300?mushroom&sig=${i}`} alt="Jamur" className="card-img"/>
                </div>
                <div className="card-body">
                  <span className="card-date">12 Des 2025</span>
                  <h3 className="card-title">Amanita Muscaria</h3>
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <span className="tag tag-danger">Beracun</span>
                    <button style={{background:'none', border:'none', color:'#d1d5db', cursor:'pointer'}}><Trash2 size={16}/></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
});

export default Collection;