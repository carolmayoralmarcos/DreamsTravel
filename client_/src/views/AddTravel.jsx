import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddTravel = () => {
    const [destination, setDestination] = useState('');
    const [price, setPrice] = useState('');
    const [duration, setDuration] = useState('');
    const navigate = useNavigate();



    const handleAddTravel = async (e) => {
        e.preventDefault();


        const travelData = {
            destination,
            price,
            duration,

        };

        try {
            const res = await fetch('http://localhost:5000/travel/addonetravel', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(travelData),
            });

            const data = await res.json();
            if (res) {

                navigate(`/travels/${data.data.destination}`);
            } else {
                console.error('Error al añadir el viaje:');
            }
        } catch (error) {
            console.error('Error al añadir el viaje:');
        }
    };

    return (
        <div>
            <h1>Añadir Nuevo Viaje</h1>
            <form onSubmit={handleAddTravel}>
                <label>Destino:</label>
                <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    required
                />
                <br />
                <label>Precio:</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                <br />
                <label>Duración:</label>
                <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    required
                />

                <button type="submit">Añadir Viaje</button>
            </form>
        </div>
    );
};

export default AddTravel;
