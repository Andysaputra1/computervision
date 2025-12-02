import React, { useState, forwardRef } from 'react';
import { Upload, Search, Trash2, CheckCircle, Save } from 'lucide-react';
import { mockSupabase } from '../../Utils/mockSupabase'; 
import './Scanner.css';

interface ScannerProps {
  user: any;
  onRefreshCollection: () => void;
  onOpenAuth: () => void;
}

const Scanner = forwardRef<HTMLDivElement, ScannerProps>(({ user, onRefreshCollection, onOpenAuth }, ref) => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<any>(null);
  const [info, setInfo] = useState<any>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setImage(url);
      setPrediction(null);
    }
  };

  const handleAnalyze = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 2000)); // Dummy delay
    setPrediction({ name: "Amanita Muscaria", confidence: 0.98 });
    setInfo({ description: "Jamur merah berbintik putih.", edibility: "Beracun" });
    setLoading(false);
  };

  const handleSave = async () => {
    if (!user) { onOpenAuth(); return; }
    await mockSupabase.from('mushrooms').insert([{ 
      user_id: user.id, name: prediction.name, info, image, dateAdded: 'Today' 
    }]);
    onRefreshCollection();
    alert("Disimpan!");
  };

  return (
    <section ref={ref} className="scanner">
      <div className="scanner-container">
        <div>
          <div className="upload-box" onClick={() => !image && document.getElementById('file')?.click()}>
            {image ? (
              <>
                <img src={image} className="preview-img" alt="preview"/>
                <button onClick={(e)=>{e.stopPropagation(); setImage(null)}} style={{position:'absolute', top:10, right:10}}><Trash2/></button>
              </>
            ) : (
              <>
                <Upload size={40} color="gray"/>
                <p>Upload Foto Jamur</p>
                <input type="file" id="file" hidden onChange={handleUpload} />
              </>
            )}
          </div>
          {image && !prediction && (
            <button onClick={handleAnalyze} className="action-btn">
              {loading ? 'Menganalisa...' : <><Search/> Analisa</>}
            </button>
          )}
        </div>

        <div>
          {prediction ? (
            <div className="result-card">
              <div className="result-header">
                <h2>{prediction.name}</h2>
                <small>{(prediction.confidence * 100).toFixed(0)}% Match</small>
              </div>
              <div className="result-body">
                <p>{info.description}</p>
                <div className="info-row">
                  <div className="info-item">Status: <b>{info.edibility}</b></div>
                </div>
                <button onClick={handleSave} className="action-btn" style={{background: 'var(--dark)'}}>
                  <Save size={18}/> Simpan
                </button>
              </div>
            </div>
          ) : (
             <div className="result-card" style={{height: '100%', display:'flex', alignItems:'center', justifyContent:'center', color:'gray'}}>
               <p>Hasil analisa akan muncul di sini</p>
             </div>
          )}
        </div>
      </div>
    </section>
  );
});

export default Scanner;