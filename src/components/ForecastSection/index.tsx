import React from 'react';

interface HourlyForecastItem {
  time: string;
  condition: string;
  tempC: number;
  tempF: number;
}

interface DailyForecastItem {
  day: string;
  condition: string;
  maxTempC: number;
  minTempC: number;
  maxTempF: number;
  minTempF: number;
}

export type ForecastMode = 'hourly' | 'daily';

interface ForecastSectionProps {
  mode: ForecastMode;
  setMode: (mode: ForecastMode) => void;
  hourly: HourlyForecastItem[];
  daily: DailyForecastItem[];
  tempUnit: 'c' | 'f';
}

const toIcon = (condition: string) => {
  const lower = condition.toLowerCase();
  if (lower.includes('rain')) return 'rain';
  if (lower.includes('sun') || lower.includes('clear')) return 'sun';
  if (lower.includes('cloud')) return 'cloud';
  return 'cloud';
};

const CloudIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" {...props}>
    <path
      d="M7 16.5h9a3.5 3.5 0 0 0 0-7 5 5 0 0 0-9.6-1.6A4 4 0 0 0 7 16.5z"
      strokeWidth={1.8}
    />
  </svg>
);

const SunIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" {...props}>
    <circle cx="12" cy="12" r="4" strokeWidth={1.8} />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" strokeWidth={1.8} strokeLinecap="round" />
  </svg>
);

const RainIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" {...props}>
    <path d="M7 16.5h9a3.5 3.5 0 0 0 0-7 5 5 0 0 0-9.6-1.6A4 4 0 0 0 7 16.5z" strokeWidth={1.8} />
    <path d="M9 18.5l-1 2M13 18.5l-1 2M17 18.5l-1 2" strokeWidth={1.8} strokeLinecap="round" />
  </svg>
);

export default function ForecastSection({ mode, setMode, hourly, daily, tempUnit }: ForecastSectionProps) {
  const getIconComponent = (type: string) => {
    switch (type) {
      case 'sun':
        return SunIcon;
      case 'rain':
        return RainIcon;
      default:
        return CloudIcon;
    }
  };

  return (
    <div className="mt-8">
      <div className="flex justify-center w-full">
        <div className="w-[100vw] flex rounded-xl bg-gray-100 p-1 text-sm gap-4">
          <button
            className={`flex-1 px-4 py-2 rounded-lg transition focus:outline-none ${mode === 'hourly'
                ? 'bg-gray-300    text-white shadow'
                : '  text-gray-500 '
              }`}
            onClick={() => setMode('hourly')}
          >
            Hourly Forecast
          </button>
          <button
            className={`flex-1 px-4 py-2 rounded-lg transition focus:outline-none ${mode === 'daily'
                ? 'bg-gray-300    text-white shadow'
                : ' text-gray-500 '
              }`}
            onClick={() => setMode('daily')}
          >
            7-Day Forecast
          </button>
        </div>
      </div>

      {mode === 'hourly' ? (
        <div className="mt-6 grid grid-cols-4 sm:grid-cols-8 gap-4 text-center">
          {hourly.map((item, idx) => {
            const iconType = toIcon(item.condition);
            const IconComponent = getIconComponent(iconType);
            const temp = tempUnit === 'c' ? item.tempC : item.tempF;
            return (
              <div key={idx} className="flex flex-col items-center gap-1">
                <span className="text-xs text-black">{item.time}</span>
                <IconComponent className="w-6 h-6 text-blue-600  text-blue-400" />
                <span className="text-sm font-medium text-black">{Math.round(temp)}°</span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-3 sm:grid-cols-7 gap-4 text-center">
          {daily.map((item, idx) => {
            const iconType = toIcon(item.condition);
            const IconComponent = getIconComponent(iconType);
            const high = tempUnit === 'c' ? item.maxTempC : item.maxTempF;
            const low = tempUnit === 'c' ? item.minTempC : item.minTempF;
            return (
              <div key={idx} className="flex flex-col items-center gap-1">
                <span className="text-xs text-black">{item.day}</span>
                <IconComponent className="w-6 h-6 text-blue-600  text-blue-400" />
                <span className="text-sm font-medium text-black">{Math.round(high)}°</span>
                <span className="text-xs text-black">{Math.round(low)}°</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}