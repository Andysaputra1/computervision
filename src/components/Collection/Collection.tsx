import React, { forwardRef } from 'react';
import { Trash2, Lock } from 'lucide-react';
import { mockSupabase } from '../../Utils/mockSupabase';
import './Collection.css';

interface CollectionProps {
  user: any;
  collection: any[];
  onRefresh: () => void;
  onOpenAuth: () => void;
}

const Collection = forwardRef<HTMLDivElement, CollectionProps>(({ user, collection, onRefresh, onOpenAuth }, ref) => {
  return (
    <section ref={ref} className="collection">
      <h2>Buku Koleksi {user && <span>({collection.length})</span>}</h2>
      
      {!user ? (
        <div style={{textAlign:'center', padding: 50, background: '#eee', borderRadius: 20}}>
          <Lock style={{margin:'0 auto', display:'block', marginBottom:10}}/>
          <p>Login untuk melihat koleksimu</p>
          <button onClick={onOpenAuth} style={{marginTop:10, padding:'10px 20px', background:'black', color:'white', borderRadius:50, border:'none'}}>Login</button>
        </div>
      ) : (
        <div className="collection-grid">
          {collection.map(item => (
            <div key={item.id} className="card">
              <img src={item.image} alt={item.name}/>
              <div className="card-body">
                <span className="card-title">{item.name}</span>
                <small>{item.dateAdded}</small>
                <button onClick={async()=>{await mockSupabase.from('mushrooms').delete().eq('id', item.id); onRefresh();}} style={{float:'right', color:'red', border:'none', background:'none'}}>
                  <Trash2 size={16}/>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
});

export default Collection;