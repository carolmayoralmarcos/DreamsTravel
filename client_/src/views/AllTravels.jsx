import React, { useContext } from 'react';
import { TravelsContext } from '../context/TravelsContext';
import TravelCard from '../components/TravelCard';

const AllTravels = () => {
    const { travels } = useContext(TravelsContext);

    return (
        <div>
            <h1>Todos los Viajes</h1>
            <div className="travel-grid">
                {travels.length > 0 ? (
                    travels.map((travel) => <TravelCard key={travel.id} travel={travel} />)
                ) : (
                    <p>No hay viajes disponibles.</p>
                )}
            </div>
        </div>
    );
};

export default AllTravels;
