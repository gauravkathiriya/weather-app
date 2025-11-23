'use client';

import { Units } from '@/types/weather';
import './UnitToggle.css';

interface UnitToggleProps {
  units: Units;
  onToggle: () => void;
}

export default function UnitToggle({ units, onToggle }: UnitToggleProps) {
  return (
    <button className="unit-toggle" onClick={onToggle} title="Toggle Units">
      <span className={units.temperature === 'celsius' ? 'active' : ''}>°C</span>
      <span className="toggle-separator">/</span>
      <span className={units.temperature === 'fahrenheit' ? 'active' : ''}>°F</span>
    </button>
  );
}

