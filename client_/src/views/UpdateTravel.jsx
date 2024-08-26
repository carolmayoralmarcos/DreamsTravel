import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const UpdateTravel = () => {
    const { name } = useParams();
    const [travel, setTravel] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTravel = async () => {
            try {
                const res = await fetch(`http://localhost:5000/travel/gettravel/${name}`);
                const data = await res.json();
                if (res) {
                    setTravel(data.data);
                } else {
                    console.error("No se pudo obtener el viaje");
                }
            } catch (error) {
                console.error("Error al obtener los datos del viaje:", error);
            }
        };

        fetchTravel();
    }, [name]);

    const handleUpdate = async () => {
        try {
            const res = await fetch(`http://localhost:5000/travel/updateTravel`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: travel._id,
                    destination: travel.destination,
                    price: travel.price,
                    duration: travel.duration,
                    image: travel.image,
                }),
            });

            const data = await res.json();
            if (res.ok) {
                navigate('/travels');
            } else {
                console.error("No se pudo actualizar el viaje", data.message);
            }
        } catch (error) {
            console.error("Error al actualizar el viaje:", error);
        }
    };

    if (!travel) return <p>Cargando datos del viaje...</p>;

    return (
        <div>
            <h1>Modificar {travel.destination}</h1>
            <label>Precio: </label>
            <input
                type="number"
                value={travel.price}
                onChange={(e) => setTravel({ ...travel, price: e.target.value })}
            />
            <br />
            <label>Duración: </label>
            <input
                type="number"
                value={travel.duration}
                onChange={(e) => setTravel({ ...travel, duration: e.target.value })}
            />
            <br />
            <label>Imagen: </label>
            <input
                type="text"
                value={travel.image}
                onChange={(e) => setTravel({ ...travel, image: e.target.value })}
            />
            <br />
            <button onClick={() => navigate('/travels')}>Cancelar</button>
            <button onClick={handleUpdate}>Actualizar</button>
        </div>
    );
};

export default UpdateTravel;
