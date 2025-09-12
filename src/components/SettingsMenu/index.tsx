import React, { useEffect } from 'react';

export interface SettingsMenuProps {
  tempUnit: 'c' | 'f';
  setTempUnit: (unit: 'c' | 'f') => void;
  measureUnit: 'metric' | 'imperial';
  setMeasureUnit: (unit: 'metric' | 'imperial') => void;
  onClose?: () => void;
}

export default function SettingsMenu({
  tempUnit,
  setTempUnit,
  measureUnit,
  setMeasureUnit,
  onClose,
}: SettingsMenuProps) {

  const menuRef = React.useRef<HTMLDivElement>(null);

  function handleClickOutside(event: MouseEvent) {
    if (menuRef.current && !menuRef.current.contains(event.target as Node) && onClose) {
      onClose();
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div ref={menuRef} className="absolute right-0 w-64 bg-white rounded-xl shadow-2xl p-4 z-40">
      <div className="">
        <p className="text-sm font-medium text-gray-700 text-gray-300 mb-1">Temperature</p>
        <div className="flex rounded gap-4 w-full border-gray-600 overflow-hidden text-sm">
          <button
            className={`w-[40vw] px-3 py-1.5 focus:outline-none transition ${tempUnit === 'c'
              ? 'bg-gray-200 bg-white/20 text-gray-900 text-white'
              : 'bg-transparent text-gray-600 text-gray-400'
              }`}
            onClick={() => setTempUnit('c')}
          >
            °C
          </button>
          <button
            className={`w-[40vw] px-3 py-1.5 focus:outline-none transition ${tempUnit === 'f'
              ? 'bg-gray-200 bg-white/20 text-gray-900 text-white'
              : 'bg-transparent text-gray-600 text-gray-400'
              }`}
            onClick={() => setTempUnit('f')}
          >
            °F
          </button>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm font-medium text-gray-700 text-gray-300 mb-1">Measurements</p>
        <div className="flex rounded gap-4 border-gray-600 overflow-hidden text-sm">
          <button
            className={`w-[40vw] px-3 py-1.5 focus:outline-none transition ${measureUnit === 'metric'
              ? 'bg-gray-200 bg-white/20 text-gray-900 text-white'
              : 'bg-transparent text-gray-600 text-gray-400'
              }`}
            onClick={() => setMeasureUnit('metric')}
          >
            Metric
          </button>
          <button
            className={`w-[40vw] px-3 py-1.5 focus:outline-none transition ${measureUnit === 'imperial'
              ? 'bg-gray-200 bg-white/20 text-gray-900 text-white'
              : 'bg-transparent text-gray-600 text-gray-400'
              }`}
            onClick={() => setMeasureUnit('imperial')}
          >
            Imperial
          </button>
        </div>
      </div>
    </div>
  );
}