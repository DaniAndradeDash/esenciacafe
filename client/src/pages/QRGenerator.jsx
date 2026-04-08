import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Coffee, BookOpen, QrCode, ArrowLeft, Loader, Copy, Download } from 'lucide-react';
import api from '../context/api';
import './Admin.css';
import './QRGenerator.css';

function QRGenerator() {
  const [url, setUrl] = useState(window.location.origin + '/menu');
  const [qrData, setQrData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!url.trim()) return;
    setLoading(true);
    try {
      const data = await api.qr.generate(url);
      setQrData(data.qr);
    } catch (error) {
      console.error('Error generando QR:', error);
    }
    setLoading(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error copiando:', error);
    }
  };

  const handleDownload = () => {
    if (qrData) {
      const link = document.createElement('a');
      link.href = qrData;
      link.download = 'esencia-cafe-menu-qr.png';
      link.click();
    }
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <svg width="32" height="32" viewBox="0 0 64 64" fill="none">
            <path d="M32 12c-6 10-18 14-18 24 0 10 8 18 18 18s18-8 18-18c0-10-12-14-18-24z" fill="#9CAF88" opacity="0.5"/>
          </svg>
          <span>Esencia Café</span>
        </div>

        <nav className="admin-nav">
          <Link to="/admin" className="admin-nav-item">
            <Coffee size={20} />
            <span>Productos</span>
          </Link>
          <Link to="/admin/recetas" className="admin-nav-item">
            <BookOpen size={20} />
            <span>Recetas</span>
          </Link>
          <div className="admin-nav-item active">
            <QrCode size={20} />
            <span>QR</span>
          </div>
        </nav>

        <Link to="/" className="admin-back-link">
          <ArrowLeft size={16} />
          Ver Menú
        </Link>
      </aside>

      <main className="admin-content">
        <div className="qr-generator">
          <div className="qr-generator-card">
            <div className="qr-generator-header">
              <div className="qr-generator-icon">
                <QrCode size={32} />
              </div>
              <h1 className="qr-generator-title">Generador de QR</h1>
              <p className="qr-generator-subtitle">
                Crea un código QR para que tus clientes accedan al menú digital
              </p>
            </div>

            <div className="qr-generator-form">
              <div className="form-group">
                <label htmlFor="url">URL del menú</label>
                <div style={{ display: 'flex', gap: 12 }}>
                  <input
                    type="url"
                    id="url"
                    className="input"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://tudominio.com/menu"
                  />
                  <button className="btn btn-primary" onClick={handleGenerate} disabled={loading}>
                    {loading ? <Loader size={18} className="loading-spinner" /> : 'Generar'}
                  </button>
                </div>
              </div>
            </div>

            {qrData && (
              <div className="qr-preview animate-scale-in">
                <div className="qr-preview-image">
                  <img src={qrData} alt="Código QR" />
                </div>
                <div className="qr-preview-url">{url}</div>
                <div className="qr-preview-actions">
                  <button className="btn btn-secondary" onClick={handleCopy}>
                    <Copy size={16} />
                    {copied ? 'Copiado!' : 'Copiar URL'}
                  </button>
                  <button className="btn btn-primary" onClick={handleDownload}>
                    <Download size={16} />
                    Descargar QR
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default QRGenerator;
