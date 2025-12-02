import React, { useState, forwardRef } from 'react';
import { Upload, Search, X, Loader2, Save, MapPin, AlertTriangle } from 'lucide-react';
import './Scanner.css';

// Mock Logic (Bisa diganti nanti)
const mockAnalyze = async () => {
  await new Promise(r => setTimeout(r, 2000));
  return {
    name: "Amanita Muscaria",
    confidence: 0.98,
    desc: "Jamur merah ikonik dengan bintik putih. Sering ditemukan di hutan pinus. Cantik tapi beracun!",
    region: "Eropa & Amerika Utara",
    edibility: "Beracun"
  };
};

interface ScannerProps {
  onOpenAuth: () => void;
  user: any;
}

const Scanner = forwardRef<HTMLDivElement, ScannerProps>(({ user, onOpenAuth }, ref) => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setResult(null);
    }
  };

  const onAnalyze = async () => {
    setLoading(true);
    const data = await mockAnalyze();
    setResult(data);
    setLoading(false);
  };

  return (
    <section ref={ref} className="scanner-section">
      <div className="scanner-container">
        
        {/* Header */}
        <div className="scanner-header">
          <span className="sub-label">SCANNER</span>
          <h2 className="section-title">Identifikasi Spesimen</h2>
        </div>

        <div className="scanner-grid">
          
          {/* KIRI: Upload */}
          <div>
            <div className="upload-card" onClick={() => !image && document.getElementById('fileInput')?.click()}>
              {image ? (
                <>
                  <img src={image} alt="Preview" className="img-preview" />
                  <button onClick={(e) => {e.stopPropagation(); setImage(null); setResult(null);}} className="btn-reset">
                    <X size={20} />
                  </button>
                </>
              ) : (
                <>
                  <div className="icon-upload-bg"><Upload size={24} color="#16a34a"/></div>
                  <h3 className="upload-title">Upload Foto Jamur</h3>
                  <p className="upload-desc">Drag & drop atau klik untuk memilih</p>
                  <span className="btn-file">Pilih File</span>
                  <input id="fileInput" type="file" hidden onChange={handleUpload} accept="image/*" />
                </>
              )}
            </div>

            {image && !result && (
              <button onClick={onAnalyze} className="btn-analyze" disabled={loading}>
                {loading ? <Loader2 className="animate-spin" /> : <Search size={20} />}
                {loading ? 'Menganalisa...' : 'Analisa Sekarang'}
              </button>
            )}
          </div>

          {/* KANAN: Hasil / Placeholder */}
          <div className="result-card" style={{background: result ? 'white' : '#fafaf9', borderStyle: result ? 'solid' : 'dashed'}}>
            {result ? (
              <div className="result-content">
                <span className="confidence-tag">Akurasi {(result.confidence * 100).toFixed(0)}%</span>
                <h2 className="mushroom-name">{result.name}</h2>
                <p className="mushroom-desc">{result.desc}</p>
                
                <div className="info-grid">
                  <div className="info-box">
                    <span className="info-label"><MapPin size={12}/> Region</span>
                    <span className="info-val">{result.region}</span>
                  </div>
                  <div className="info-box" style={{background: '#fef2f2', borderColor: '#fee2e2'}}>
                    <span className="info-label" style={{color:'#ef4444'}}><AlertTriangle size={12}/> Safety</span>
                    <span className="info-val" style={{color:'#991b1b'}}>{result.edibility}</span>
                  </div>
                </div>

                <button className="btn-save" onClick={() => !user ? onOpenAuth() : alert('Disimpan!')}>
                  <Save size={18}/> Simpan ke Koleksi
                </button>
              </div>
            ) : (
              <div className="empty-state">
                <div className="icon-search-bg"><Search size={40} /></div>
                <h3 className="upload-title" style={{color: '#9ca3af'}}>Menunggu Data</h3>
                <p className="upload-desc" style={{maxWidth: '250px', margin: '0 auto'}}>
                  Upload foto di panel sebelah kiri untuk melihat hasil identifikasi detil disini.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
});

export default Scanner;