import { useContext } from 'react';
import { TravelsContext } from '../context/TravelsContext';

export const useTravels = () => {
    return useContext(TravelsContext);
};

export default useTravels;
