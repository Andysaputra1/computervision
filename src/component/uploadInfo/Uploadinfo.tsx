import React from 'react';
import { Upload, Search, CheckCircle, AlertTriangle, MapPin, Info, Save } from 'lucide-react';
import './UploadInfo.css';

interface UploadInfoProps {
  image: string | null;
  loading: boolean;
  prediction: any;
  mushroomInfo: any;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAnalyze: () => void;
  onSave: () => void;
  onReset: () => void;
}

export default function UploadInfo({
  image, loading, prediction, mushroomInfo, 
  onImageUpload, onAnalyze, onSave, onReset
}: UploadInfoProps) {
  
  return (
    <section className="scanner-section">
      <div className="scanner-container">
        
        {/* KIRI: AREA UPLOAD */}
        <div>
          <h2 style={{fontSize: '2rem', fontWeight: 800, marginBottom: '20px'}}>Identifikasi</h2>
          <div className="upload-area" onClick={() => !image && document.getElementById('fileInput')?.click()}>
            
            {image ? (
              <>
                <img src={image} alt="Preview" className="image-preview" />
                <button onClick={(e) => { e.stopPropagation(); onReset(); }} 
                  style={{position: 'absolute', top: 20, right: 20, background: 'white', padding: 10, borderRadius: '50%', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}>
                   X
                </button>
              </>
            ) : (
              <div className="upload-content">
                <div style={{background: '#e7e5e4', width: 60, height: 60, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto'}}>
                  <Upload className="text-stone-500" />
                </div>
                <h3 style={{margin: '16px 0 8px'}}>Upload Foto Jamur</h3>
                <p style={{color: '#78716c', fontSize: '0.9rem'}}>Klik atau Drag & Drop foto di sini</p>
                <input id="fileInput" type="file" hidden onChange={onImageUpload} accept="image/*" />
              </div>
            )}
          </div>

          {image && !prediction && !loading && (
            <button onClick={onAnalyze} className="analyze-btn">
              <Search size={20} /> Analisa Sekarang
            </button>
          )}
          
          {loading && (
            <div className="analyze-btn" style={{background: '#78716c', cursor: 'wait'}}>
              Processing AI Model...
            </div>
          )}
        </div>

        {/* KANAN: HASIL / PLACEHOLDER */}
        <div className="result-area">
          {prediction && mushroomInfo ? (
            <div className="result-card">
              <div className="result-header">
                <span className="confidence-badge">Match: {(prediction.confidence * 100).toFixed(0)}%</span>
                <h2 style={{fontSize: '2.5rem', marginTop: '10px'}}>{prediction.name}</h2>
              </div>
              
              <div className="result-body">
                <p style={{lineHeight: 1.6, color: '#44403c'}}>{mushroomInfo.description}</p>
                
                <div className="info-row">
                  <div className="info-box">
                    <span className="label"><MapPin size={12}/> Habitat</span>
                    <span className="value">{mushroomInfo.region}</span>
                  </div>
                  <div className="info-box" style={{background: mushroomInfo.edibility.includes('Beracun') ? '#fef2f2' : '#f0fdf4'}}>
                    <span className="label" style={{color: mushroomInfo.edibility.includes('Beracun') ? '#ef4444' : '#16a34a'}}>
                      <AlertTriangle size={12}/> Keamanan
                    </span>
                    <span className="value">{mushroomInfo.edibility}</span>
                  </div>
                </div>

                <div style={{marginTop: '20px', padding: '15px', background: '#eff6ff', borderRadius: '12px', border: '1px solid #dbeafe'}}>
                  <span className="label" style={{color: '#2563eb', marginBottom: 5}}><Info size={12}/> Fakta Unik</span>
                  <p style={{fontSize: '0.9rem', color: '#1e40af', fontStyle: 'italic'}}>"{mushroomInfo.fun_fact}"</p>
                </div>

                <button onClick={onSave} className="analyze-btn" style={{background: '#1c1917', marginTop: '24px'}}>
                  <Save size={18}/> Simpan ke Koleksi
                </button>
              </div>
            </div>
          ) : (
            // Placeholder Kosong
            <div className="result-card" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', background: '#fafaf9', borderStyle: 'dashed'}}>
              <div style={{padding: 40}}>
                <Search size={48} color="#d6d3d1" style={{marginBottom: 20}} />
                <h3 style={{color: '#a8a29e'}}>Menunggu Hasil Analisa</h3>
                <p style={{color: '#d6d3d1', fontSize: '0.9rem'}}>Data AI dan deskripsi jamur akan muncul di sini.</p>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}