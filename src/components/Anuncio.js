import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ref, get, remove } from 'firebase/database';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { db } from '../firebaseConfig/firebase';
import "./Anuncio.css";

const MySwal = withReactContent(Swal);

const Show = () => {
    const [anuncios, setAnuncios] = useState([]);

    // Referencia a la base de datos
    const anunciosRef = ref(db, 'Anuncios');

    // Función para obtener usuarios
    const getAnuncios = async () => {
        try {
            const snapshot = await get(anunciosRef);
            if (snapshot.exists()) {
                const data = snapshot.val();
                const anunciosList = Object.keys(data).map((key) => ({
                    ...data[key],
                    id: key
                }));
                setAnuncios(anunciosList);
            } else {
                console.log('No hay datos disponibles');
            }
        } catch (error) {
            console.error('Error obteniendo usuarios:', error);
        }
    };

    // Función para eliminar usuario
    const deleteAnuncio = async (id) => {
        try {
            const anunciosRef = ref(db, `Anuncios/${id}`);
            await remove(anunciosRef);
            getAnuncios(); // Refrescar la lista después de eliminar
        } catch (error) {
            console.error('Error eliminando Anuncio:', error);
        }
    };

    // Confirmación de eliminación con SweetAlert2
    const confirmDelete = (id) => {
        MySwal.fire({
            title: '¿Eliminar el Anuncio?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, ¡elimínalo!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteAnuncio(id);
                MySwal.fire(
                    'Eliminado!',
                    'El Anuncio ha sido eliminado.',
                    'success'
                );
            }
        });
    };

    // useEffect para cargar los usuarios al inicio
    useEffect(() => {
        getAnuncios();
    }, []);

    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <div className='d-grid gap-2'>
                    <Link to="/Anuncio/createAnuncio" className="btn btn-secondary mt-2 mb-2">Crear</Link>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-custom table-hover">
                        <thead>
                            <tr>
                                <th>categoria</th>
                                <th>condicion</th>
                                <th>descripcion</th>
                                <th>direccion</th>
                                <th>estado</th>
                                <th>marca</th>
                                <th>precio</th>
                                <th>tiempo</th>
                                <th>titulo</th>
                                <th>acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {anuncios.map((anuncio) => (
                                <tr key={anuncio.id}>
                                    <td>{anuncio.categoria}</td>
                                    <td>{anuncio.condicion}</td>
                                    <td>{anuncio.descripcion}</td>
                                    <td>{anuncio.direccion}</td>
                                    <td>{anuncio.estado}</td>
                                    <td>{anuncio.marca}</td>
                                    <td>{anuncio.precio}</td>
                                    <td>{anuncio.tiempo}</td>
                                    <td>{anuncio.titulo}</td>

                                    <td>
                                        <Link to={`/Anuncio/EditAnuncio/${anuncio.id}`} className="btn btn-primary btn-sm me-2">Editar</Link>
                                        <button onClick={() => confirmDelete(anuncio.id)} className="btn btn-danger btn-sm">Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Show;
