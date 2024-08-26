import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home-container">
            <h1>Bienvenidos a Dream Travels</h1>
            <p>¡Prepárate para tu siguiente aventura!</p>
            <Link to="/travels" className="btn">Explora los viajes disponibles</Link>
            <Link
                to="/mytravels"
                className="btn btn-lg btn-primary mytravels-btn"
            >
                Mis Viajes
            </Link>
        </div>
    );
};

export default Home;
