import React from 'react'

export interface ExactWeatherStatusProps {
    temperatureC: number;
    temperatureF: number;
    feelsLikeC: number;
    feelsLikeF: number;
    description: string;
    tempUnit: 'c' | 'f';
    iconUrl?: string;
}

const ExactWeatherStatusSection: React.FC<ExactWeatherStatusProps> = ({
    temperatureC,
    temperatureF,
    feelsLikeC,
    feelsLikeF,
    description,
    tempUnit,
    iconUrl,
}) => {
    const temp = tempUnit === 'c' ? temperatureC : temperatureF;
    const feels = tempUnit === 'c' ? feelsLikeC : feelsLikeF;
    const imageSrc = iconUrl ? (iconUrl.startsWith('http') ? iconUrl : `https:${iconUrl}`) : '/icons/cloudIcon.svg';
    return (
        <div className="flex justify-between items-center w-full py-6">
            <div className="flex items-center gap-4">
                <img src={imageSrc} alt="weather icon" className="w-20 h-20" />
                <h1 className="text-6xl md:text-7xl font-semibold text-black">{Math.round(temp)}°</h1>
            </div>
            <div className="text-right">
                <h3 className="text-lg font-medium text-black">{description}</h3>
                <p className="text-sm text-black">Feels like {Math.round(feels)}°</p>
            </div>
        </div>
    );
};

export default ExactWeatherStatusSection;