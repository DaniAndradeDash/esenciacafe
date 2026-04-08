import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <svg width="32" height="32" viewBox="0 0 64 64" fill="none">
            <path d="M32 12c-6 10-18 14-18 24 0 10 8 18 18 18s18-8 18-18c0-10-12-14-18-24z" fill="#9CAF88" opacity="0.5"/>
            <ellipse cx="32" cy="42" rx="10" ry="4" fill="#C4956A" opacity="0.3"/>
          </svg>
          <span>Esencia Café</span>
        </div>
        <p className="footer-tagline">Donde cada sorbo cuenta una historia</p>
        <div className="footer-divider"></div>
        <p className="footer-info">Visítanos y vive la experiencia</p>
        <Link to="/admin" className="footer-admin-link">
          Panel de Administración
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
