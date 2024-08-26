import React from 'react';
import TravelCard from './TravelCard';


const TravelList = ({ travels }) => {
    return (
        <div className="travel-list">
            {travels.map(travel => (
                <TravelCard key={travel.id} travel={travel} />
            ))}
        </div>
    );
};

export default TravelList;
