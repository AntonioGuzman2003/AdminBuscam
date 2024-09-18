import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, push } from 'firebase/database';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Create = () => {
    const [codigoTelefono, setCodigoTelefono] = useState(''); // Puede ser opcional
    const [email, setEmail] = useState('');
    const [fechaNac, setFechaNac] = useState('');
    const [nombres, setNombres] = useState('');
    const [telefono, setTelefono] = useState(''); // Puede ser opcional
    const [urlImagenPerfil, setUrlImagenPerfil] = useState(''); // Puede ser opcional
    const [online, setOnline] = useState(false); // Puede ser opcional

    const navigate = useNavigate();
    const db = getDatabase();
    const usersRef = ref(db, 'Usuarios');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Datos del nuevo usuario
        const newUser = {
            codigoTelefono: codigoTelefono || null, // Opcional, asignar null si está vacío
            email: email,
            fecha_nac: fechaNac || null, // Opcional, asignar null si está vacío
            nombres: nombres,
            online: online || false, // Opcional, asignar false si no está marcado
            proveedor: "Email", // Supongo que todos usan "Email"
            telefono: telefono || null, // Opcional, asignar null si está vacío
            tiempo: Date.now(), // Asignamos un timestamp en milisegundos
            uid: "", // Esto se puede generar automáticamente si es necesario
            urlImagenPerfil: urlImagenPerfil || null // Opcional, asignar null si está vacío
        };

        try {
            // Añadir nuevo usuario a Firebase
            await push(usersRef, newUser);

            // Mostrar alerta de éxito
            MySwal.fire({
                title: '¡Usuario creado!',
                text: 'El usuario se ha creado exitosamente.',
                icon: 'success',
                confirmButtonText: 'OK'
            });

            // Redirigir a la lista de usuarios
            navigate('/');
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <div className="container">
            <h1>Crear Usuario</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3" style={{ display: 'none' }}>
                    <label className="form-label">Código de Teléfono (Opcional)</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={codigoTelefono} 
                        onChange={(e) => setCodigoTelefono(e.target.value)} 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Fecha de Nacimiento (Opcional)</label>
                    <input 
                        type="date" 
                        className="form-control" 
                        value={fechaNac} 
                        onChange={(e) => setFechaNac(e.target.value)} 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Nombres</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={nombres} 
                        onChange={(e) => setNombres(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Teléfono (Opcional)</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={telefono} 
                        onChange={(e) => setTelefono(e.target.value)} 
                    />
                </div>
                <div className="mb-3" style={{ display: 'none' }}>
                    <label className="form-label" >URL Imagen de Perfil (Opcional)</label>
                    <input 
                        type="url" 
                        className="form-control" 
                        value={urlImagenPerfil} 
                        onChange={(e) => setUrlImagenPerfil(e.target.value)} 
                    />
                </div>
                <div className="mb-3" style={{ display: 'none' }}>
                    <label className="form-label" >¿Está en línea? (Opcional)</label>
                    <input 
                        type="checkbox" 
                        className="form-check-input" 
                        checked={online} 
                        onChange={(e) => setOnline(e.target.checked)} 
                    />
                </div>
                <button type="submit" className="btn btn-primary">Crear Usuario</button>
            </form>
        </div>
    );
};

export default Create;
