import React, { useState } from 'react';
import { X } from 'lucide-react';
import { mockSupabase } from '../../Utils/mockSupabase';
import './AuthModal.css';

interface AuthModalProps {
  onClose: () => void;
  onSuccess: (user: any) => void;
}

export default function AuthModal({ onClose, onSuccess }: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await mockSupabase.signIn(email, pass);
    if (res.user) { onSuccess(res.user); onClose(); }
    else alert("Gagal login");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} style={{position:'absolute', top:15, right:15, border:'none', background:'none'}}><X/></button>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input className="modal-input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input className="modal-input" type="password" placeholder="Password" value={pass} onChange={e=>setPass(e.target.value)} />
          <button className="modal-btn">Masuk</button>
        </form>
      </div>
    </div>
  );
}