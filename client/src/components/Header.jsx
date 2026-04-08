import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <svg className="logo-icon" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="30" stroke="#3D2B1F" strokeWidth="1.5" fill="#FAF7F2"/>
          <path d="M32 12c-6 10-18 14-18 24 0 10 8 18 18 18s18-8 18-18c0-10-12-14-18-24z" fill="#9CAF88" opacity="0.6"/>
          <path d="M28 16c0 8-6 12-6 18s6 14 10 14" stroke="#3D2B1F" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
          <ellipse cx="32" cy="42" rx="10" ry="4" fill="#C4956A" opacity="0.4"/>
          <path d="M32 8v6M24 10l4 4M40 10l-4 4" stroke="#8B7355" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
        </svg>
        <h1 className="logo-text">Esencia Café</h1>
      </div>
      <p className="tagline">Donde cada sorbo cuenta una historia</p>
      <div className="divider"></div>
    </header>
  );
}

export default Header;
