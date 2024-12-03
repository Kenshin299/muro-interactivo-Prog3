import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../FirebaseConfiguration';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
 

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            navigate("/");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            alert("Correo electronico o contraseña incorrecta");
        });
    }

    return (
        <div>
            <div className="SignUp-Container">
                <h1>Inicia Sesión</h1>                                                                                              
                <form>                                                                                            
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
                        onClick={onLogin}
                        value="Iniciar Sesión"                        
                    />                                
                </form>
                <p>
                    No tienes una cuenta?{' '}
                    <Link to="/signup" >
                        Registrate
                    </Link>
                </p>                   
            </div>
        </div>
        )
}

export default Login;