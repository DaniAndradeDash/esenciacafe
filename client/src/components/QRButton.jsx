import { useState } from 'react';
import { QrCode, X, Copy, Download, Loader } from 'lucide-react';
import api from '../context/api';
import './QRButton.css';

function QRButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [qrData, setQrData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const menuUrl = window.location.origin + '/menu';

  const handleOpen = async () => {
    setIsOpen(true);
    if (!qrData) {
      setLoading(true);
      try {
        const data = await api.qr.generate(menuUrl);
        setQrData(data.qr);
      } catch (error) {
        console.error('Error generando QR:', error);
      }
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setCopied(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(menuUrl);
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
      link.download = 'esencia-cafe-qr.png';
      link.click();
    }
  };

  return (
    <>
      <button className="qr-fab" onClick={handleOpen} title="Ver QR del menú">
        <QrCode size={24} />
      </button>

      {isOpen && (
        <div className="qr-modal-overlay" onClick={handleClose}>
          <div className="qr-modal" onClick={(e) => e.stopPropagation()}>
            <div className="qr-modal-header">
              <h3 className="qr-modal-title">Código QR</h3>
              <button className="qr-modal-close" onClick={handleClose}>
                <X size={20} />
              </button>
            </div>

            <div className="qr-image-container">
              {loading ? (
                <Loader size={48} className="qr-loading" style={{ color: 'var(--esencia-taupe)' }} />
              ) : qrData ? (
                <img src={qrData} alt="QR Code" className="qr-image" />
              ) : (
                <p>Error al cargar QR</p>
              )}
            </div>

            <div className="qr-url">{menuUrl}</div>

            <div className="qr-actions">
              <button className="btn btn-secondary qr-action-btn" onClick={handleCopy}>
                <Copy size={16} />
                {copied ? 'Copiado!' : 'Copiar'}
              </button>
              <button 
                className="btn btn-primary qr-action-btn" 
                onClick={handleDownload}
                disabled={!qrData}
              >
                <Download size={16} />
                Descargar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default QRButton;
