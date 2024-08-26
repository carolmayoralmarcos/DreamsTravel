import React from 'react';
import { Link } from 'react-router-dom';

const TravelCard = ({ travel }) => {
    console.log(travel)
    return (
        <div className="card">
            <img src={travel.image} alt={travel.destination} className="travel-image" />
            <div className="card-body">
                <h5 className="card-title">{travel.destination}</h5>
                <p className="card-text">Precio: {travel.price} </p>
                <p className="card-text">Duración: {travel.duration} días</p>
                <Link to={`/travels/${travel.destination}`} className="btn btn-primary">Ver más</Link>
            </div>
        </div>
    );
};

export default TravelCard;

