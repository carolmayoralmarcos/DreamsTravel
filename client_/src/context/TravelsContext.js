import React, { createContext, useState, useEffect } from 'react';

export const TravelsContext = createContext();

export const TravelsProvider = ({ children }) => {
    const [travels, setTravels] = useState([]);



    useEffect(() => {
        const fetchTravels = async () => {
            try {
                const response = await fetch('http://localhost:5000/travel/getalltravels');
                const data = await response.json();
                if (response) {
                    setTravels(data.data);
                } else {
                    console.error('No se pudieron obtener los viajes');
                }
            } catch (error) {
                console.error('Error de servidor');
            }
        };

        fetchTravels();
    }, []);

    return (
        <TravelsContext.Provider value={{ travels }}>
            {children}
        </TravelsContext.Provider>
    );
};
