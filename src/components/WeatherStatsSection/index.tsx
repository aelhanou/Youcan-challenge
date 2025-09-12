
import React from 'react';

type WeatherStatsProps = {
    humidity?: number;
    precipitation?: number;
    windKmh?: number;
    aqi?: number;
    measureUnit?: 'metric' | 'imperial';
    className?: string;
};

const WeatherStatsSection = ({
    humidity = 0,
    precipitation = 0,
    windKmh = 0,
    aqi = 0,
    measureUnit = 'metric',
    className = '',
}: WeatherStatsProps) => {
    const windDisplay = measureUnit === 'metric'
        ? `${Math.round(windKmh)} km/h`
        : `${Math.round((windKmh / 1.609) * 10) / 10} mph`;

    const items: {
        key: string;
        label: string;
        value: string;
        Icon: React.FC<React.SVGProps<SVGSVGElement>>;
    }[] = [
        {
            key: 'humidity',
            label: 'Humidity',
            value: `${Math.round(humidity)}%`,
            Icon: (props) => (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" {...props}>
                    <path
                        d="M12 3.5C8.5 8 5.5 10.9 5.5 14.5a6.5 6.5 0 1 0 13 0c0-3.7-3-6.5-6.5-11z"
                        strokeWidth={1.8}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ),
        },
        {
            key: 'precipitation',
            label: 'Precipitation',
            value: `${Math.round(precipitation)}%`,
            Icon: (props) => (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" {...props}>
                    <path d="M7 16.5h9a3.5 3.5 0 0 0 0-7 5 5 0 0 0-9.6-1.6A4 4 0 0 0 7 16.5z" strokeWidth={1.8} />
                    <path d="M9 18.5l-1 2M13 18.5l-1 2M17 18.5l-1 2" strokeWidth={1.8} strokeLinecap="round" />
                </svg>
            ),
        },
        {
            key: 'wind',
            label: 'Wind',
            value: windDisplay,
            Icon: (props) => (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" {...props}>
                    <path d="M3 9h9a3 3 0 1 0-3-3" strokeWidth={1.8} strokeLinecap="round" />
                    <path d="M3 15h13a3 3 0 1 1-3 3" strokeWidth={1.8} strokeLinecap="round" />
                </svg>
            ),
        },
    ];

    return (
        <section className={`w-full ${className}`}>
            <dl className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6">
                {items.map(({ key, label, value, Icon }) => (
                    <div key={key} className="flex items-center gap-3 min-w-0">
                        <Icon className="h-5 w-5 text-blue-600  text-blue-400" />
                        <dt className="text-sm text-black truncate">{label}</dt>
                        <dd className="ml-auto text-sm font-semibold text-black">{value}</dd>
                    </div>
                ))}
            </dl>
            <div className="mt-6">
                <div className="flex justify-between items-center text-sm text-black">
                    <span>AQI</span>
                    <span className="font-semibold text-black">{Math.round(aqi)}</span>
                </div>
                <div className="relative h-2  bg-gray-700 rounded-full mt-2 overflow-hidden">
                    <div
                        className="absolute top-0 left-0 h-full bg-red-500"
                        style={{ width: `${Math.min(aqi, 300) / 300 * 100}%` }}
                    ></div>
                </div>
                <div className="flex justify-end text-xs text-black mt-1">300</div>
            </div>
        </section>
    );
};

export default WeatherStatsSection;