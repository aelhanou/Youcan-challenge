import React from 'react'


export interface CityNameProps {
    cityName: string;
    dateString: string;
    timeString: string;
    onSettingsClick?: () => void;
}

const CityNameSection: React.FC<CityNameProps> = ({ cityName, dateString, timeString, onSettingsClick }) => {
    return (
        <div className="flex justify-between items-center w-full py-2">
            <div>
                <h1 className="text-3xl font-semibold  text-black">{cityName}</h1>
                <p className="text-sm   text-black">{dateString}</p>
                <p className="text-sm text-black">{timeString}</p>
            </div>
            <div
                onClick={onSettingsClick}
                className="p-2 rounded-md transition  cursor-pointer "
            >
                <img
                    src="/icons/paramerteIcons.svg"
                    alt="settings icon"
                    className="w-15 h-15 object-contain "
                />
            </div>
        </div>
    );
};

export default CityNameSection;