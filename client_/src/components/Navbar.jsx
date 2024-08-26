import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/travels">Todos los viajes</Link>
            <Link to="/add-travel">Agregar Viaje</Link>
        </nav>
    );
};

export default Navbar;