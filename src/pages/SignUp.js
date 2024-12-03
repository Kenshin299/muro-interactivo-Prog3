import { useNavigate ,Link } from "react-router-dom";
import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../FirebaseConfiguration';


function SignUp() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
       
        await createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
              // Signed in
              const user = userCredential.user;
              updateProfile(user, {
                displayName: `${name} ${lastName}`
              }).then(() => {
                //
              }).catch((error) => {
                console.log(error);
              });

              navigate('/login')
          })
          .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log(errorCode, errorMessage);
              alert("No se pudo crear su nueva cuenta: " + errorMessage);
          });
    }

    return (
        <div className="SignUp-Container">
            <h1>Registrate</h1>                                                                                              
            <form>
                <label htmlFor="name">
                    Nombre
                </label>
                <input
                    className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}  
                    required                                    
                    placeholder="Nombre"                                
                />

                <label htmlFor="lastName">
                    Apellidos
                </label>
                <input
                    className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}  
                    required                                    
                    placeholder="Apellido"                                
                />

                <label htmlFor="email-address">
                    Dirección de Correo Electronico
                </label>
                <input
                    className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    type="email"
                    id="email-address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}  
                    required                                    
                    placeholder="Correo Electronico"                                
                />

                <label htmlFor="password">
                    Contraseña
                </label>
                <input
                    className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    required                                 
                    placeholder="Contraseña"              
                />                                            
                
                <input
                    className="mt-4 px-6 py-2 bg-gray-300 text-black font-semibold rounded-lg hover:bg-gray-400 transition transform hover:scale-105"
                    type="submit" 
                    onClick={onSubmit}
                    value="Registrarse"                        
                />                                
            </form>
            <p>
                Ya tienes una cuenta?{' '}
                <Link to="/login" >
                    Inicia Sesión
                </Link>
            </p>                   
        </div>
    )
}

export default SignUp;