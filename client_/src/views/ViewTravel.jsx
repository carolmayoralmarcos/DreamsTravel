import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TravelCard from '../components/TravelCard';

const ViewTravel = () => {

    const { name } = useParams();
    const [travel, setTravel] = useState(null);
    const [response, setResponse] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTravel = async () => {
            try {
                const res = await fetch(`http://localhost:5000/travel/gettravel/${name}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await res.json();
                if (res) {
                    setTravel(data.data);
                } else {
                    setResponse('No se pudo obtener el viaje');
                }
            } catch (error) {
                setResponse('Error de servidor');
            }
        };

        fetchTravel();
    }, [name]);

    const handleDelete = async () => {

        try {
            const res = await fetch(`http://localhost:5000/travel/deletetravel/${travel._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: travel.destination }),
            });

            if (res) {
                navigate('/travels');
            } else {
                setResponse('No se pudo eliminar el viaje');
            }
        } catch (error) {
            setResponse('Error al eliminar el viaje');
        }
    };

    if (!travel) return <p>Cargando...</p>;

    return (
        <div className="travel-detail">
            <TravelCard travel={travel} />
            <div >
                <button onClick={() => navigate(`/travels/edit/${name}`)} className="btn btn-warning">
                    Modificar
                </button>
                <button onClick={handleDelete} className="btn btn-danger">
                    Eliminar
                </button>
            </div>
            {response && <p>{response}</p>}
        </div>
    );
};

export default ViewTravel;
