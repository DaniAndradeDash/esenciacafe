import { Droplets } from 'lucide-react';
import './MilkNote.css';

function MilkNote() {
  return (
    <div className="milk-note">
      <Droplets size={18} className="milk-note-icon" />
      <p className="milk-note-text">
        <strong>Leche:</strong> Entera, Deslactosada y de Almendras
      </p>
    </div>
  );
}

export default MilkNote;
